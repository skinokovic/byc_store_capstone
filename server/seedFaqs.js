// One-time seed script. Run with: node seed/seedFaqs.js
// Adjust the DB connection import to match how your project already
// connects (e.g. your existing config/db.js), then delete or don't
// re-run this once your FAQs are live and admin-managed.

import mongoose from "mongoose";
import dotenv from "dotenv";
import Faq from "./models/faqModel.js";

dotenv.config();

const faqs = [
  // Orders & Payment
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept direct bank transfer and card payments (Mastercard, Visa, Verve) via our secure payment partner. For bank transfers, your order ships once funds have cleared in our account.",
    category: "Orders & Payment",
    order: 1,
  },
  {
    question: "Is it safe to pay with my card on this site?",
    answer:
      "Yes. Card payments are processed through a PCI-DSS compliant payment gateway — we never see or store your card details on our servers.",
    category: "Orders & Payment",
    order: 2,
  },
  {
    question: "Can I change or cancel my order after placing it?",
    answer:
      "You can cancel an order from your dashboard as long as it's still pending. Once it moves to processing, please contact support directly for help.",
    category: "Orders & Payment",
    order: 3,
  },

  // Delivery & Shipping
  {
    question: "How long does delivery take?",
    answer:
      "Orders within Lagos typically arrive within 1–3 business days. Other states in Nigeria usually take 3–7 business days, depending on your delivery zone.",
    category: "Delivery & Shipping",
    order: 1,
  },
  {
    question: "How much is delivery?",
    answer:
      "Delivery fees are calculated automatically based on your saved address and shown at checkout before you place your order.",
    category: "Delivery & Shipping",
    order: 2,
  },
  {
    question: "Do you deliver outside Nigeria?",
    answer:
      "At the moment we only deliver within Nigeria. We're working on expanding delivery coverage — check back soon.",
    category: "Delivery & Shipping",
    order: 3,
  },

  // Sizing & Fit
  {
    question: "How do I know what size to order?",
    answer:
      "Each product page includes a size guide with measurements in inches/cm. BYC sizing runs true to standard Nigerian retail sizing — if you're between sizes, we recommend sizing up for singlets and boxers.",
    category: "Sizing & Fit",
    order: 1,
  },
  {
    question: "What if the item I ordered doesn't fit?",
    answer:
      "You can request an exchange for a different size within 7 days of delivery, as long as the item is unworn and in its original packaging. See our returns policy below.",
    category: "Sizing & Fit",
    order: 2,
  },

  // Returns & Exchange
  {
    question: "What is your return policy?",
    answer:
      "Unworn items in original packaging can be returned or exchanged within 7 days of delivery. For hygiene reasons, opened underwear packs can only be exchanged for a manufacturing defect, not a change of mind.",
    category: "Returns & Exchange",
    order: 1,
  },
  {
    question: "How do I start a return or exchange?",
    answer:
      "Go to your Orders page, select the order, and choose 'Request Return'. Our support team will guide you through the next steps.",
    category: "Returns & Exchange",
    order: 2,
  },

  // Product & Authenticity
  {
    question: "Are your BYC products 100% original?",
    answer:
      "Yes. We source directly from authorized BYC distributors, and every item sold on this store is 100% genuine — never counterfeit or reworked.",
    category: "Product & Authenticity",
    order: 1,
  },
  {
    question: "How should I care for my BYC garments?",
    answer:
      "Machine wash cold with like colors, avoid bleach, and tumble dry low or air dry to preserve elasticity and fabric quality. Full care instructions are printed on each product's label.",
    category: "Product & Authenticity",
    order: 2,
  },

  // Account
  {
    question: "Do I need an account to place an order?",
    answer:
      "Yes, creating a free account lets you track orders, save addresses, and manage returns easily. Sign up only takes a minute at checkout.",
    category: "Account",
    order: 1,
  },
  {
    question: "I forgot my password — how do I reset it?",
    answer:
      "Click 'Forgot password' on the login page and follow the link sent to your registered email to set a new one.",
    category: "Account",
    order: 2,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI); // 🔧 match your actual env var name
    await Faq.deleteMany();
    await Faq.insertMany(faqs);
    console.log(`✅ Seeded ${faqs.length} FAQs`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
}

seed();
