import express from "express";
import {
  initializePayment,
  verifyPayment,
  handleWebhook,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/initialize", protect, initializePayment);
router.get("/verify", protect, verifyPayment);

// raw body parser ONLY for this route, so signature verification works
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook,
);

export default router;
