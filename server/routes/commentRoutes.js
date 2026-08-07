import express from "express";
const router = express.Router();

import {
  getCommentsForBlog,
  createComment,
  deleteComment,
  getAllComments,
} from "../controllers/commentController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

// --- Public ---
router.get("/blog/:blogId", getCommentsForBlog);
router.post("/", createComment);

// --- Private/Admin ---
router.get("/", protect, authorize("admin"), getAllComments);
router.delete("/:id", protect, authorize("admin"), deleteComment);

export default router;

// mounted as:
// app.use("/api/comments", commentRoutes);
