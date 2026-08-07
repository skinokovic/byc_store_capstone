import express from "express";
import {
  getFaqs,
  getAllFaqsAdmin,
  createFaq,
  updateFaq,
  deleteFaq,
} from "../controllers/faqController.js";
import { protect, authorize } from "../middleware/authMiddleware.js"; // 🔧 adjust to match your actual admin-check middleware name

const router = express.Router();

router.get("/", getFaqs);
router.get("/admin", protect, authorize("admin"), getAllFaqsAdmin);
router.post("/", protect, authorize("admin"), createFaq);
router.put("/:id", protect, authorize("admin"), updateFaq);
router.delete("/:id", protect, authorize("admin"), deleteFaq);

export default router;
