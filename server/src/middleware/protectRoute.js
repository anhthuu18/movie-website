import jwt from "jsonwebtoken";
import { User } from "../models/UsersModel.js";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-movie"];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No Token Provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    console.log("User found:", {
      id: user._id,
      username: user.username,
      role: user.role,
      currentTime: "2025-05-06 07:59:54",
    });

    req.user = user;
    next();
  } catch (error) {
    // Trả về lỗi cụ thể hơn
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
