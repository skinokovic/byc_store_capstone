import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Files go straight to Cloudinary instead of local disk - this is what
// makes avatars survive redeploys/restarts on ephemeral hosting (Vercel,
// etc.), unlike the earlier diskStorage version.
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Byc-ecommerce/avatars",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [
      { width: 400, height: 400, crop: "fill", gravity: "auto" },
    ],
  },
});

const uploadAvatar = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

export default uploadAvatar;
