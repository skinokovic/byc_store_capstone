import mongoose from "mongoose";

const deliveryZoneSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: [true, "State is required"],
      unique: true,
      trim: true,
    },
    fee: {
      type: Number,
      required: [true, "Fee is required"],
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("DeliveryZone", deliveryZoneSchema);
