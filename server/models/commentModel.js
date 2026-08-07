import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },

    // self-reference for threaded replies - null means it's a top-level
    // comment; set means it's a reply to another comment
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    // guest commenting - no login required, so these are plain fields
    // rather than a User ref
    guestName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    guestEmail: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
      maxlength: [2000, "Comment is too long"],
    },

    // lets an admin hide a comment (e.g. spam) without a hard delete,
    // which would otherwise orphan any replies underneath it
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

commentSchema.index({ blog: 1, createdAt: 1 });

export default mongoose.model("Comment", commentSchema);
