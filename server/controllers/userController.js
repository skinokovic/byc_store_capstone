import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../config/cloudinary.js";

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 *
 * Note: role is intentionally NOT accepted from req.body here. Letting a
 * client set their own role at signup would allow anyone to self-promote
 * to admin. New accounts always get the schema default ('user'); role
 * changes must go through updateUserRole below, which is admin-only.
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      message: "User registered successfully",
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Registration failed", error: error.message });
  }
};

/**
 * @desc    Authenticate a user and return a token
 * @route   POST /api/users/login
 * @access  Public
 */
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     console.log("Frontend details", email, password);

//     // password has `select: false` in the schema, so it must be explicitly requested
//     const user = await User.findOne({ email }).select("+password");

//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     if (!user.isActive) {
//       return res
//         .status(403)
//         .json({ message: "This account has been deactivated" });
//     }

//     const passwordMatches = await user.matchPassword(password);
//     if (!passwordMatches) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     res.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       message: "Login successful",
//       token: generateToken(user._id, user.role),
//     });
//     console.log("Database response", res.ok);
//   } catch (error) {
//     res.status(500).json({ message: "Login failed", error: error.message });
//   }
// };
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log("========== LOGIN REQUEST ==========");
    // console.log("Frontend Email:", email);
    // console.log("Frontend Password:", password);

    const user = await User.findOne({ email }).select("+password");

    // console.log("========== DATABASE RESPONSE ==========");
    // console.log(user);

    if (!user) {
      const response = {
        success: false,
        status: 401,
        message: "Invalid email or password",
      };

      // console.log(response);

      return res.status(401).json(response);
    }

    if (!user.isActive) {
      const response = {
        success: false,
        status: 403,
        message: "This account has been deactivated",
      };

      console.log(response);

      return res.status(403).json(response);
    }

    const passwordMatches = await user.matchPassword(password);

    console.log("Password Match:", passwordMatches);

    if (!passwordMatches) {
      const response = {
        success: false,
        status: 401,
        message: "Invalid email or password",
      };

      console.log(response);

      return res.status(401).json(response);
    }

    // const token = generateToken(user._id, user.role);

    // const response = {
    //   success: true,
    //   status: 200,
    //   message: "Login successful",
    //   data: {
    //     _id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     role: user.role,
    //     token,
    //   },
    // };

    const token = generateToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token,
    });

    // return res.status(200).json(response);
  } catch (error) {
    console.log("========== SERVER ERROR ==========");
    console.error(error);

    return res.status(500).json({
      success: false,
      status: 500,
      message: "Login failed",
      error: error.message,
    });
  }
};

/**
 * @desc    Get the logged-in user's own profile
 * @route   GET /api/users/profile
 * @access  Private (any authenticated role)
 */
export const getUserProfile = async (req, res) => {
  // req.user is attached by the protect middleware
  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    avatar: req.user.avatar,
  });
};

/**
 * @desc    Update the logged-in user's own profile (name/email/password)
 * @route   PUT /api/users/profile
 * @access  Private (any authenticated role)
 *
 * Deliberately does not accept `role` here - see the note on registerUser.
 * A user can never elevate their own privileges through this endpoint.
 */
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name ?? user.name;
    user.email = req.body.email ?? user.email;
    if (req.body.password) {
      user.password = req.body.password; // pre('save') hook re-hashes this
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      avatar: updatedUser.avatar,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update profile", error: error.message });
  }
};

/**
 * @desc    Upload/replace the logged-in user's own avatar
 * @route   PUT /api/users/profile/avatar
 * @access  Private (any authenticated user)
 *
 * Separate from updateUserProfile because this one is multipart/form-data
 * (a file), not JSON - Express needs a different body parser (multer, not
 * express.json()) for this request shape, so it can't share the same
 * route/handler cleanly.
 */
export const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }
    console.log("Image file", req.file);

    // avatarPublicId has `select: false`, so it must be explicitly requested
    const user = await User.findById(req.user._id).select("+avatarPublicId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the old avatar from Cloudinary before saving the new one, so
    // uploads don't pile up unused files in the account forever. Ignore
    // errors here (e.g. file already missing) - this is best-effort
    // cleanup, not something that should block the response.
    console.log("Public ID:", user.avatarPublicId);
    // if (user.avatarPublicId) {
    //   await cloudinary.uploader.destroy(user.avatarPublicId).catch(() => {});
    // }

    try {
      const result = await cloudinary.uploader.destroy(user.avatarPublicId);

      console.log("Destroy result:", result);
    } catch (err) {
      console.error("Destroy error:", err);
    }

    // multer-storage-cloudinary attaches these to req.file after upload
    user.avatar = req.file.path; // Cloudinary's secure_url
    user.avatarPublicId = req.file.filename; // Cloudinary's public_id
    await user.save();
    console.log("User saved successfully");

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      message: "Updated successful",
      avatar: user.avatar,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to upload avatar", error: error.message });
  }
};

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

/**
 * @desc    Get a single user by id
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user", error: error.message });
  }
};

/**
 * @desc    Update a user's role or active status (admin-only action)
 * @route   PUT /api/users/:id
 * @access  Private/Admin
 *
 * This is the only place a user's role can change - deliberately separate
 * from updateUserProfile so privilege escalation can never happen through
 * a self-service endpoint.
 */
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.role) user.role = req.body.role;
    if (typeof req.body.isActive === "boolean")
      user.isActive = req.body.isActive;

    const updatedUser = await user.save();

    return res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to update user", error: error.message });
  }
};

/**
 * @desc    Delete a user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Guard rail: an admin should not be able to delete their own account
    // through this endpoint (avoids accidentally locking everyone out).
    if (user._id.equals(req.user._id)) {
      return res
        .status(400)
        .json({ message: "You cannot delete your own account here" });
    }

    await user.deleteOne();
    res.status(200).json({ message: "User removed" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};
