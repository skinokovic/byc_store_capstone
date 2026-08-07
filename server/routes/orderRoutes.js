import express from "express";
const router = express.Router();

import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

router.use(protect); // every order route requires a logged-in user

router.post("/create", createOrder);
router.get("/my-orders", getMyOrders);
router.put("/cancel/:id", cancelOrder);
router.get("/:id", getOrderById);

// --- Admin ---
router.get("/", authorize("admin"), getAllOrders);
router.put("/update-status/:id", authorize("admin"), updateOrderStatus);

export default router;

// mounted as:
// app.use("/api/orders", orderRoutes);
