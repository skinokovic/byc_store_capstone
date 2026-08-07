import express from "express";
const router = express.Router();

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  addProductReview,
  getProductsByIds,
  getRelatedProducts,
} from "../controllers/productController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";
import uploadProductImages from "../config/productUpload.js";
// --- Public ---
router.get("/", getProducts);
router.get("/:id/related", getRelatedProducts);
router.get("/:id", getProductById);
router.get("/by-category/:categoryId", getProductsByCategory);

// routes/productRoutes.js
router.post("/:id/reviews", protect, addProductReview);
router.post("/by-ids", getProductsByIds);

// --- Private/Admin ---
// router.post("/create", protect, authorize("admin"), createProduct);
router.post(
  "/create",
  protect,
  authorize("admin"),
  uploadProductImages.array("images", 5),
  createProduct,
);
// router.put("/update/:id", protect, authorize("admin"), updateProduct);
router.put(
  "/update/:id",
  protect,
  authorize("admin"),
  uploadProductImages.array("images", 5),
  updateProduct,
);

router.delete("/delete/:id", protect, authorize("admin"), deleteProduct);

export default router;
