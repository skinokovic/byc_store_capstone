// import mongoose from "mongoose";

// const cartItemSchema = new mongoose.Schema(
//   {
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product",
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       min: 1,
//       default: 1,
//     },
//   },
//   { _id: false },
// );

// const cartSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true, // one cart per user
//     },
//     items: [cartItemSchema],
//   },
//   { timestamps: true },
// );

// export default mongoose.model("Cart", cartSchema);

import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  size: { type: String, default: null },
  color: { type: String, default: null },
});
// NOTE: removed { _id: false } — each item now gets its own _id,
// used to target a specific size/color variant for update/remove

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true },
);

export default mongoose.model("Cart", cartSchema);
