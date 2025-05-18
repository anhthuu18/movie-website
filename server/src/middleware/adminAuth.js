export const adminAuth = async (req, res, next) => {
  try {
    // Check if user exists in request 
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Please login first"
      });
    }

    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden - Admin access required"
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}; 