import express from "express";
import {
  subscribe,
  getSubscribers,
  deleteSubscriber,
} from "../controllers/newsletterController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/subscribe", subscribe);
router.get("/", protect, authorize("admin"), getSubscribers);
router.delete("/:id", protect, authorize("admin"), deleteSubscriber);

export default router;
