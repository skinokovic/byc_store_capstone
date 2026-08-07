// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Product name is required"],
//       trim: true,
//     },
//     sku: {
//       type: String,
//       required: [true, "SKU is required"],
//       unique: true,
//       trim: true,
//       // e.g. "BYC-1161" - used on cards, cart items, and order line items
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//       // Single primary category. If you need a product to appear under
//       // multiple categories, change this to: [{ type: ObjectId, ref: 'Category' }]
//     },
//     stock: {
//       type: Number,
//       required: true,
//       default: 0,
//       min: 0,
//     },

//     images: [
//       {
//         url: {
//           type: String,
//           required: true,
//         },
//         public_id: {
//           type: String,
//           required: true,
//         },
//       },
//     ],
//     rating: {
//       type: Number,
//       default: 0,
//     },
//     numReviews: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true, // adds createdAt / updatedAt automatically
//   },
// );
// export default mongoose.model("Product", productSchema);

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true }, // denormalized so we don't need to populate for display
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true },
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      trim: true,
    },
    short_description: { type: String, required: true },
    long_description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stock: { type: Number, required: true, default: 0, min: 0 },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],

    // NEW: available options
    sizes: [{ type: String }], // e.g. ["S", "M", "L", "XL"]
    colors: [
      {
        name: { type: String, required: true },
        hex: { type: String, required: true },
      },
    ],

    // NEW: embedded reviews
    reviews: [reviewSchema],

    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
