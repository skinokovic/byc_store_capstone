import express from "express";
const router = express.Router();
import collectionUpload from "../config/collectionUpload.js";
import {
  createCollection,
  getCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
} from "../controllers/collectionController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

router.post(
  "/create",
  protect,
  authorize("admin"),
  collectionUpload.single("image"),
  createCollection,
);
router.get("/collections", getCollections);
router.get("/collections/:id", protect, authorize("admin"), getCollectionById);
router.put(
  "/update/:id",
  protect,
  authorize("admin"),
  collectionUpload.single("image"),
  updateCollection,
);
router.delete("/delete/:id", protect, authorize("admin"), deleteCollection);

export default router;

// in server.js / app.js, mounted the same way as arrivals:
// import collectionRoutes from "./routes/collectionRoutes.js";
// app.use("/api/collection", collectionRoutes);
