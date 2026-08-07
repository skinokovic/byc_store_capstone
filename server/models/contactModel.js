import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    notes: {
      type: String,
      required: [true, "A message is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "read", "resolved"],
      default: "new", // lets an admin later filter unread vs handled messages
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Contact", contactSchema);
