import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    excerpt: {
      // short teaser shown on the card
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
    },

    content: {
      // full body, for the blog detail page
      type: String,
      required: [true, "Content is required"],
    },

    coverImage: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },

    // the logged-in admin who created the post - set server-side from
    // req.user in the controller, never accepted from the request body
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    likes: {
      type: Number,
      default: 0,
      min: 0,
    },

    commentCount: {
      // denormalized counter, kept in sync by the comment controller so the
      // blog list/detail views don't need a separate count query per post
      type: Number,
      default: 0,
      min: 0,
    },

    order: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Blog", blogSchema);
