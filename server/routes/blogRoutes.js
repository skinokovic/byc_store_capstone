import express from "express";
const router = express.Router();

import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  incrementBlogView,
  likeBlog,
} from "../controllers/blogController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";
import blogUpload from "../config/blogUpload.js";

// --- Public ---
router.get("/", getBlogs);
router.patch("/:id/view", incrementBlogView);
router.patch("/:id/like", likeBlog);
router.get("/:idOrSlug", getBlogById);

// --- Private/Admin ---
router.post(
  "/create",
  protect,
  authorize("admin"),
  blogUpload.single("coverImage"),
  createBlog,
);
router.put(
  "/update/:id",
  protect,
  authorize("admin"),
  blogUpload.single("coverImage"),
  updateBlog,
);
router.delete("/delete/:id", protect, authorize("admin"), deleteBlog);

export default router;

// mounted as:
// app.use("/api/blogs", blogRoutes);
