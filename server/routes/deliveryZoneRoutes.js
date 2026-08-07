import express from "express";
const router = express.Router();

import {
  getDeliveryZones,
  createDeliveryZone,
  updateDeliveryZone,
  deleteDeliveryZone,
} from "../controllers/deliveryZoneController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

router.get("/", getDeliveryZones);
router.post("/create", protect, authorize("admin"), createDeliveryZone);
router.put("/update/:id", protect, authorize("admin"), updateDeliveryZone);
router.delete("/delete/:id", protect, authorize("admin"), deleteDeliveryZone);

export default router;

// mounted as:
// app.use("/api/delivery-zones", deliveryZoneRoutes);
