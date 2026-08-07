// import express from "express";
// const router = express.Router();

// import {
//   getCategories,
//   getCategoryById,
//   createCategory,
//   updateCategory,
//   deleteCategory,
//   getParentCategories,
//   getSubCategories,
// } from "../controllers/categoryController.js";

// import { protect, authorize } from "../middleware/authMiddleware.js";

// // --- Public ---
// router.get("/all-categories", getCategories);
// router.get("/categories/:idOrSlug", getCategoryById);
// router.get("/parents", getParentCategories);

// router.get("/:parentId/subcategories", getSubCategories);

// // --- Private/Admin ---
// router.post("/create", protect, authorize("admin"), createCategory);
// router.put("/update/:id", protect, authorize("admin"), updateCategory);
// router.delete("/delete/:id", protect, authorize("admin"), deleteCategory);

// export default router;
// //

import express from "express";
const router = express.Router();

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getParentCategories,
  getSubCategories,
  getAllCategories,
} from "../controllers/categoryController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

// --- Public ---
// specific/static paths first, generic single-param wildcard last -
// otherwise "/:idOrSlug" would swallow requests meant for the routes below it
router.get("/all-categories", getCategories);
router.get("/all", getAllCategories);
router.get("/parents", getParentCategories);
router.get("/:parentId/subcategories", getSubCategories);
router.get("/:idOrSlug", getCategoryById);

// --- Private/Admin ---
router.post("/create", protect, authorize("admin"), createCategory);
router.put("/update/:id", protect, authorize("admin"), updateCategory);
router.delete("/delete/:id", protect, authorize("admin"), deleteCategory);

export default router;
