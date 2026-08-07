import axios from "axios";
import Order from "../models/orderModel.js";

const paystackClient = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

// @desc    Start a Paystack payment for an existing order
// @route   POST /api/payments/initialize
// @access  Private
export const initializePayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findOne({ _id: orderId, user: req.user._id });
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.paymentStatus === "paid") {
      return res.status(400).json({ message: "This order is already paid" });
    }

    const txRef = `order-${order._id}-${Date.now()}`;

    // Paystack expects amount in kobo (smallest currency unit)
    const response = await paystackClient.post("/transaction/initialize", {
      email: req.user.email,
      amount: Math.round(order.total * 100),
      reference: txRef,
      callback_url: `${process.env.CLIENT_URL}/payment/callback`,
      metadata: {
        orderId: order._id.toString(),
        custom_fields: [
          {
            display_name: "Order ID",
            variable_name: "order_id",
            value: order._id.toString().slice(-8).toUpperCase(),
          },
        ],
      },
    });

    order.txRef = txRef;
    order.paymentMethod = "card";
    await order.save();

    res.status(200).json({ checkoutUrl: response.data.data.authorization_url });
  } catch (error) {
    console.error(
      "Paystack init error:",
      error.response?.status,
      error.response?.data,
    );
    res.status(400).json({
      message: "Failed to initialize payment",
      error: error.response?.data?.message || error.message,
    });
  }
};

// @desc    Verify a completed payment via Paystack's server-side check
// @route   GET /api/payments/verify?reference=...
// @access  Private
export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.query;
    if (!reference) {
      return res.status(400).json({ message: "reference is required" });
    }

    const response = await paystackClient.get(
      `/transaction/verify/${reference}`,
    );
    const data = response.data.data;

    const order = await Order.findOne({ txRef: data.reference });
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (
      data.status === "success" &&
      data.currency === "NGN" &&
      data.amount >= Math.round(order.total * 100) &&
      order.paymentStatus !== "paid"
    ) {
      order.paymentStatus = "paid";
      order.status = "processing";
      order.paidAt = new Date();
      await order.save();
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({
      message: "Failed to verify payment",
      error: error.response?.data?.message || error.message,
    });
  }
};

// @desc    Paystack webhook — safety net if the browser redirect never happens
// @route   POST /api/payments/webhook
// @access  Public (verified via signature header)
export const handleWebhook = async (req, res) => {
  try {
    // Paystack signs the raw request body with HMAC SHA512 using your
    // secret key — you MUST verify this against the raw body, not the
    // parsed JSON, so this route needs express.raw() applied (see below)
    const crypto = await import("crypto");
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(req.body)
      .digest("hex");

    if (hash !== req.headers["x-paystack-signature"]) {
      return res.status(401).end();
    }

    const event = JSON.parse(req.body.toString());

    if (event.event === "charge.success") {
      const data = event.data;
      const order = await Order.findOne({ txRef: data.reference });

      if (
        order &&
        order.paymentStatus !== "paid" &&
        data.amount >= Math.round(order.total * 100) &&
        data.currency === "NGN"
      ) {
        order.paymentStatus = "paid";
        order.status = "processing";
        order.paidAt = new Date();
        await order.save();
      }
    }

    res.status(200).end();
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(200).end();
  }
};
