import express from "express";
const router = express.Router();

import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

router.use(protect);

router.get("/", getCart);
router.post("/add", addToCart);
// router.put("/update/:productId", updateCartItem);
// router.delete("/remove/:productId", removeCartItem);
router.put("/update/:itemId", updateCartItem);
router.delete("/remove/:itemId", removeCartItem);
router.delete("/clear", clearCart);

export default router;

// mounted as:
// app.use("/api/cart", cartRoutes);
