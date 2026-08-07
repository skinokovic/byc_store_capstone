import express from "express";
const router = express.Router();

import {
  getMyAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";
import { protect } from "../middleware/authMiddleware.js";

router.use(protect); // every address route requires a logged-in user

router.get("/", getMyAddresses);
router.get("/:id", getAddressById);
router.post("/create", createAddress);
router.put("/update/:id", updateAddress);
router.delete("/delete/:id", deleteAddress);

export default router;

// mounted as:
// app.use("/api/addresses", addressRoutes);
