import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateAvatar,
} from "../controllers/userController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";
import uploadAvatar from "../middleware/uploadAvatar.js";

// --- Public ---
router.post("/register", registerUser);
router.post("/login", loginUser);

// --- Private: any authenticated user, acting on their own account ---
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// multipart/form-data route - separate from /profile above since it needs
// multer, not express.json(), to parse the request body.
router.put(
  "/profile/avatar",
  protect,
  uploadAvatar.single("avatar"),
  updateAvatar,
);

// --- Private/Admin: managing other users ---
// authorize('admin') runs after protect, so req.user is guaranteed to exist by then
router.get("/", protect, authorize("admin"), getUsers);
router
  .route("/:id")
  .get(protect, authorize("admin"), getUserById)
  .put(protect, authorize("admin"), updateUser)
  .delete(protect, authorize("admin"), deleteUser);

export default router;
