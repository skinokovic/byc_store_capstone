// import express from "express";

// const router = express.Router();

// import {
//   createSlider,
//   getSliders,
//   getSliderById,
//   updateSlider,
//   deleteSlider,
// } from "../controllers/sliderController.js";

// import uploadSlider from "../config/sliderUpload.js";

// import { protect, authorize } from "../middleware/authMiddleware.js";

// // Public
// router.get("/sliders", getSliders);

// router.get("/slider/:id", getSliderById);

// // Admin
// router.post(
//   "/create",
//   protect,
//   authorize,
//   uploadSlider.single("image"),
//   createSlider,
// );

// router.put(
//   "/update/:id",
//   protect,
//   authorize,
//   uploadSlider.single("image"),
//   updateSlider,
// );

// router.delete("/delete/:id", protect, authorize, deleteSlider);

// export default router;

import express from "express";

const router = express.Router();

import {
  createSlider,
  getSliders,
  getSliderById,
  updateSlider,
  deleteSlider,
} from "../controllers/sliderController.js";

import uploadSlider from "../config/sliderUpload.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

router.get("/sliders", getSliders);

router.get("/slider/:id", getSliderById);

router.post(
  "/create",

  protect,
  authorize("admin"),
  uploadSlider.fields([
    {
      name: "left",
      maxCount: 1,
    },
    {
      name: "center",
      maxCount: 1,
    },
    {
      name: "right",
      maxCount: 1,
    },
  ]),

  createSlider,
);

router.put(
  "/update/:id",
  protect,
  authorize("admin"),
  uploadSlider.fields([
    {
      name: "left",
      maxCount: 1,
    },
    {
      name: "center",
      maxCount: 1,
    },
    {
      name: "right",
      maxCount: 1,
    },
  ]),
  (req, res, next) => {
    req.files = Object.values(req.files).flat();
    next();
  },
  updateSlider,
);

router.delete("/delete/:id", protect, authorize, deleteSlider);

export default router;
