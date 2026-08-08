import Cart from "../models/cartModel.js";
import Product from "../models/Product.js";

async function getPopulatedCart(userId) {
  return Cart.findOne({ user: userId }).populate({
    path: "items.product",
    select: "name sku description price images stock",
  });
}

// @desc    Get the logged-in user's cart (creates an empty one if it
//          doesn't exist yet, so the frontend never has to special-case
//          a missing cart)
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    let cart = await getPopulatedCart(req.user._id);

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch cart", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, size = null, color = null } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    // Same product AND same size AND same color = same line item.
    // Different size/color = a distinct line item, even for the same product.
    const existingItem = cart.items.find(
      (item) =>
        String(item.product) === String(productId) &&
        item.size === size &&
        item.color === color,
    );

    // Prevent duplicate products
    if (existingItem) {
      return res.status(400).json({
        message: "Product already added to cart",
      });
    }

    // Stock check
    if (Number(quantity) > product.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} item(s) available in stock`,
      });
    }

    cart.items.push({
      product: productId,
      quantity: Number(quantity),
      size,
      color,
    });

    await cart.save();
    res.status(200).json(await getPopulatedCart(req.user._id));
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to add to cart", error: error.message });
  }
};

// @route PUT /api/cart/update/:itemId   (was :productId)
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    if (quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be at least 1 - use remove instead" });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(itemId); // Mongoose subdocument lookup by _id
    if (!item) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    const product = await Product.findById(item.product);
    if (quantity > product.stock) {
      return res
        .status(400)
        .json({ message: `Only ${product.stock} in stock` });
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json(await getPopulatedCart(req.user._id));
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update cart item", error: error.message });
  }
};

// @route DELETE /api/cart/remove/:itemId   (was :productId)
export const removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => String(item._id) !== String(req.params.itemId),
    );

    await cart.save();
    res.status(200).json(await getPopulatedCart(req.user._id));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to remove cart item", error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(200).json({ message: "Cart already empty" });

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to clear cart", error: error.message });
  }
};
