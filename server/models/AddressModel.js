import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    label: {
      // e.g. "Home", "Office"
      type: String,
      trim: true,
      default: "Home",
    },

    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    street: {
      type: String,
      required: [true, "Street address is required"],
      trim: true,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    state: {
      // must match a DeliveryZone.state value for fee lookup to succeed
      type: String,
      required: [true, "State is required"],
      trim: true,
    },

    country: {
      type: String,
      default: "Nigeria",
      trim: true,
    },

    postalCode: {
      type: String,
      trim: true,
      default: "",
    },

    // snapshotted at create/update time from DeliveryZone, rather than
    // looked up live on every order - keeps checkout fast and keeps a
    // historical record even if the zone's fee changes later
    deliveryFee: {
      type: Number,
      required: true,
      default: 0,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Address", addressSchema);
