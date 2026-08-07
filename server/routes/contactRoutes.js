import express from "express";
const router = express.Router();

import {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from "../controllers/contactController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

// --- Public ---
router.post("/send-message", submitContact);

// --- Private/Admin ---
router.get("/", protect, authorize("admin"), getContacts);
router
  .route("/:id")
  .get(protect, authorize("admin"), getContactById)
  .put(protect, authorize("admin"), updateContactStatus)
  .delete(protect, authorize("admin"), deleteContact);

export default router;
