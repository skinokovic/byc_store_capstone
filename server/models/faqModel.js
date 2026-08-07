import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "Orders & Payment",
        "Delivery & Shipping",
        "Sizing & Fit",
        "Returns & Exchange",
        "Product & Authenticity",
        "Account",
      ],
      required: true,
    },
    // controls display order within a category — lower shows first
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Faq", faqSchema);
