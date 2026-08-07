import jwt from "jsonwebtoken";

/**
 * Signs a JWT containing the user's id and role.
 * Including `role` here lets middleware do a quick role check without
 * hitting the database on every request, if you choose to optimize for that
 * later (authMiddleware.protect currently re-fetches the user anyway, which
 * is the safer default - see comment there for the tradeoff).
 */
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
