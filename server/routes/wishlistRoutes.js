import express from "express";
const router = express.Router();

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

router.use(protect);

router.get("/", getWishlist);
router.post("/add", addToWishlist);
router.delete("/remove/:productId", removeFromWishlist);

export default router;

// mounted as:
// app.use("/api/wishlist", wishlistRoutes);
