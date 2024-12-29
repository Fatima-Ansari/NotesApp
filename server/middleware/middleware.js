import jwt from "jsonwebtoken";
import User from "../models/User.js";

const middleWare = async (req, res, next) => {
  try {
    // Check for the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    // Extract the token from the header (Bearer <token>)
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: Token missing" });
    }

    // Verify the token using the secret key
    let decoded;
    try {
      decoded = jwt.verify(token, "secretkey1356#yui$fhjjk");
      console.log(decoded);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
    }

    // Find the user associated with the token (use decoded.id)
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Attach user info to the request object for use in subsequent middleware or routes
    req.user = { id: user._id, name: user.name };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default middleWare;

