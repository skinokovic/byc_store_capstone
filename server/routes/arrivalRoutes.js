import express from "express";
const router = express.Router();
import arrivalUpload from "../config/arrivalUpload.js";
import {
  createArrival,
  getArrivals,
  getArrivalById,
  updateArrival,
  deleteArrival,
} from "../controllers/arrivalController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
// add your own auth/admin middleware here, e.g. protect, isAdmin
router.post(
  "/create",
  protect,
  authorize("admin"),
  arrivalUpload.single("image"),
  createArrival,
);
router.get("/arrivals", getArrivals);
router.get("/arrivals/:id", protect, authorize("admin"), getArrivalById);
router.put(
  "/update/:id",
  protect,
  authorize("admin"),
  arrivalUpload.single("image"),
  updateArrival,
);
router.delete("/delete/:id", protect, authorize("admin"), deleteArrival);

export default router;

// in server.js / app.js:
// const arrivalRoutes = require("./routes/arrivalRoutes");
// app.use("/api/arrivals", arrivalRoutes);
