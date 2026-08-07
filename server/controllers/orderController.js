import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Address from "../models/AddressModel.js";
import Product from "../models/Product.js";

// @desc    Create an order from the logged-in user's current cart.
//          Validates stock, snapshots item prices/names and the chosen
//          address, decrements product stock, then empties the cart.
// @route   POST /api/orders/create
// @access  Private
export const createOrder = async (req, res) => {
  try {
    // const { addressId } = req.body;
    const { addressId, paymentMethod = "bank_transfer" } = req.body;
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
    );
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const address = await Address.findOne({
      _id: addressId,
      user: req.user._id,
    });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // validate stock for every item before touching anything, so a
    // failure partway through never leaves stock partially decremented
    for (const item of cart.items) {
      if (!item.product) {
        return res
          .status(400)
          .json({ message: "One of your cart items no longer exists" });
      }
      if (item.quantity > item.product.stock) {
        return res.status(400).json({
          message: `Only ${item.product.stock} of "${item.product.name}" in stock`,
        });
      }
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.images?.[0]?.url || "",
      price: item.product.price,
      quantity: item.quantity,
      size: item.size || "", // ← new
      color: item.color || "", // ← new
    }));

    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const deliveryFee = address.deliveryFee;
    const total = subtotal + deliveryFee;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress: {
        fullName: address.fullName,
        phone: address.phone,
        street: address.street,
        city: address.city,
        state: address.state,
        country: address.country,
        postalCode: address.postalCode,
      },
      subtotal,
      deliveryFee,
      total,
      paymentMethod, // ← new
    });

    // decrement stock now that the order is confirmed
    await Promise.all(
      cart.items.map((item) =>
        Product.findByIdAndUpdate(item.product._id, {
          $inc: { stock: -item.quantity },
        }),
      ),
    );

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create order", error: error.message });
  }
};

// @desc    Get the logged-in user's own order history
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};

// @desc    Get a single order (owner or admin only)
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    const isOwner = String(order.user._id) === String(req.user._id);
    if (!isOwner && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to view this order" });
    }

    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch order", error: error.message });
  }
};

// @desc    Get every order in the system
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const orders = await Order.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};

// @desc    Update an order's status
// @route   PUT /api/orders/update-status/:id
// @access  Private/Admin

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const { status, paymentStatus } = req.body;

    // once cancelled, an order is a closed record — no further status or
    // payment-status changes, from either the customer or the admin
    if (
      order.status === "cancelled" &&
      (status !== undefined || paymentStatus !== undefined)
    ) {
      return res.status(400).json({
        message: "This order has been cancelled and can no longer be updated",
      });
    }

    if (status !== undefined) {
      const isProgressingFulfillment = !["pending", "cancelled"].includes(
        status,
      );

      if (isProgressingFulfillment && order.paymentStatus !== "paid") {
        return res.status(400).json({
          message:
            "This order must be marked as paid before its status can be changed",
        });
      }

      order.status = status;
    }

    if (paymentStatus !== undefined) {
      if (order.paymentMethod === "card") {
        return res.status(400).json({
          message:
            "Card payment status is verified automatically and cannot be edited manually",
        });
      }

      order.paymentStatus = paymentStatus;

      if (paymentStatus === "paid" && !order.paidAt) {
        order.paidAt = new Date();
      }
      if (paymentStatus !== "paid") {
        order.paidAt = null;
      }
    }

    const updated = await order.save();
    res.status(200).json(updated);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update order", error: error.message });
  }
};
// @desc    Cancel an order - only the owner can cancel, and only while it's
//          still "pending" (hasn't started processing/shipping yet).
//          Restores stock for every item.
// @route   PUT /api/orders/cancel/:id
// @access  Private
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "pending") {
      return res.status(400).json({
        message: `Cannot cancel an order that is already "${order.status}"`,
      });
    }

    order.status = "cancelled";
    await order.save();

    await Promise.all(
      order.items.map((item) =>
        Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity },
        }),
      ),
    );

    res.status(200).json(order);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to cancel order", error: error.message });
  }
};
