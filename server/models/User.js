import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * User schema.
 *
 * `role` drives access control throughout the app (see middleware/authMiddleware.js).
 * Using an enum string instead of a boolean `isAdmin` flag is the more
 * extensible pattern - new roles (e.g. 'moderator', 'vendor') can be added
 * later without a schema migration that touches every existing document.
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // excluded from queries by default; must opt in with .select('+password')
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} is not a supported role",
      },
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true, // supports soft-disabling an account without deleting it
    },
    avatar: {
      type: String,
      default: null, // full Cloudinary secure_url, e.g. "https://res.cloudinary.com/.../avatars/abc.jpg"
    },
    avatarPublicId: {
      type: String,
      default: null, // Cloudinary's own id for this file - needed to delete it later, the URL alone isn't enough
      select: false, // internal bookkeeping field, never needs to reach the frontend
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Hash the password before saving, but only when it's new or has changed.
 * Prevents re-hashing an already-hashed password on unrelated profile updates.
 *
 * No `next` parameter here - Mongoose 7+ dropped callback-style middleware.
 * An async function that simply returns (or throws) is the correct pattern now;
 * declaring `next` and calling it will throw "next is not a function".
 */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Instance method: compares a plaintext password against this user's hash.
 * Used by userController.loginUser.
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

/**
 * Instance method: convenience check used by middleware/route guards.
 * e.g. if (req.user.hasRole('admin')) { ... }
 */
userSchema.methods.hasRole = function (...roles) {
  return roles.includes(this.role);
};

export default mongoose.model("User", userSchema);
