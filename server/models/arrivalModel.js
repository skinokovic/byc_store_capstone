import mongoose from "mongoose";

const arrivalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    subtitle: {
      // e.g. "Fashionist Versatile Elani" under the title in your screenshot
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    image: {
      url: {
        type: String,
        required: [true, "Image url is required"],
      },
      public_id: {
        type: String,
        required: [true, "Image public_id is required"],
      },
    },
    isActive: {
      // controls whether it shows on the homepage
      type: Boolean,
      default: true,
    },
    displayOrder: {
      // controls left -> right ordering in the grid
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Arrival", arrivalSchema);
