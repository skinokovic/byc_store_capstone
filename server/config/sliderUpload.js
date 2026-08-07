import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "Byc-ecommerce/sliders",

    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  }),
});

const uploadSlider = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default uploadSlider;
