import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * protect
 * -------
 * Authentication middleware. Verifies the JWT sent in the Authorization
 * header ("Bearer <token>"), then loads the corresponding user and attaches
 * it to req.user so downstream handlers/middleware can use it.
 *
 * Deliberately re-fetches the user from the database on every request
 * (rather than trusting the decoded token payload alone). This is slightly
 * more expensive but means a deactivated account or role change takes
 * effect immediately, instead of only once the old token expires.
 */
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user no longer exists" });
      }

      if (!req.user.isActive) {
        return res
          .status(403)
          .json({ message: "This account has been deactivated" });
      }

      return next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Not authorized, token invalid or expired" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Login to continue" });
  }
};

/**
 * authorize(...allowedRoles)
 * --------------------------
 * Generic role-based access control (RBAC) middleware. Must run *after*
 * `protect`, since it reads req.user.role.
 *
 * Usage:
 *   router.delete('/:id', protect, authorize('admin'), deleteUser);
 *   router.put('/:id', protect, authorize('admin', 'moderator'), updateSomething);
 *
 * This generic form is preferred over a single hardcoded `admin` middleware
 * because it scales cleanly if more roles are introduced later, without
 * needing a new middleware function per role or per combination of roles.
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      // Defensive check - indicates authorize() was used without protect()
      return res
        .status(401)
        .json({ message: "Not authorized, no user on request" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied - requires one of the following roles: ${allowedRoles.join(", ")}`,
      });
    }

    next();
  };
};
