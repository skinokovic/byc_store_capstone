// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import connectDB from "./config/db.js";

// import productRoutes from "./routes/productRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// // import authRoutes from "./routes/authRoutes.js";

// import userRoutes from "./routes/userRoutes.js";
// import contactRoutes from "./routes/contactRoutes.js";
// import sliderRoutes from "./routes/sliderRoutes.js";
// import arrivalRoutes from "./routes/arrivalRoutes.js";
// import collectionRoutes from "./routes/collectionRoutes.js";
// import blogRoutes from "./routes/blogRoutes.js";
// import commentRoutes from "./routes/commentRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import addressRoutes from "./routes/addressRoutes.js";
// import wishlistRoutes from "./routes/wishlistRoutes.js";
// import deliveryZoneRoutes from "./routes/deliveryZoneRoutes.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import faqRoutes from "./routes/faqRoutes.js";
// import dashboardRoutes from "./routes/dashboardRoutes.js";
// import newsletterRoutes from "./routes/newsletterRoutes.js";
// // dotenv.config();
// const result = dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json()); // parse JSON request bodies

// // Mount routes — this is the step that connects everything above to a live URL
// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);
// // app.use("/api/auth", authRoutes);

// app.use("/api/users", userRoutes);
// app.use("/api/message", contactRoutes);
// app.use("/api/slider", sliderRoutes);
// app.use("/api/arrival", arrivalRoutes);
// app.use("/api/collection", collectionRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/addresses", addressRoutes);
// app.use("/api/wishlist", wishlistRoutes);
// app.use("/api/delivery-zones", deliveryZoneRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/faqs", faqRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/newsletter", newsletterRoutes);

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import sliderRoutes from "./routes/sliderRoutes.js";
import arrivalRoutes from "./routes/arrivalRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import deliveryZoneRoutes from "./routes/deliveryZoneRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";

import { handleWebhook } from "./controllers/paymentController.js";

dotenv.config();

connectDB();

const app = express();

// ==================================================
// CORS
// ==================================================

app.use(cors());

// ==================================================
// PAYSTACK WEBHOOK
// IMPORTANT:
// This MUST come BEFORE express.json()
// ==================================================

app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook,
);

// ==================================================
// JSON BODY PARSER
// ==================================================

app.use(express.json());

// ==================================================
// API ROUTES
// ==================================================

app.use("/api/products", productRoutes);

app.use("/api/categories", categoryRoutes);

// app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/message", contactRoutes);

app.use("/api/slider", sliderRoutes);

app.use("/api/arrival", arrivalRoutes);

app.use("/api/collection", collectionRoutes);

app.use("/api/blogs", blogRoutes);

app.use("/api/comments", commentRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/addresses", addressRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.use("/api/delivery-zones", deliveryZoneRoutes);

app.use("/api/cart", cartRoutes);

// ==================================================
// PAYMENT ROUTES
// ==================================================

app.use("/api/payments", paymentRoutes);

app.use("/api/faqs", faqRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/newsletter", newsletterRoutes);

// ==================================================
// ROOT
// ==================================================

app.get("/", (req, res) => {
  res.send("API is running...");
});

// ==================================================
// SERVER
// ==================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
