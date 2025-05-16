import adminService from "../services/adminService.js";

// [PATCH] /api/v1/admin/users/:userId
export async function toggleUserLock(req, res) {
  try {
    const { userId } = req.params;

    // Don't allow admin to lock themselves
    if (req.user.userId === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot lock your own account"
      });
    }

    const result = await adminService.toggleUserLock(userId);

    res.status(200).json({
      success: true,
      message: `User account ${result.isLocked ? 'locked' : 'unlocked'} successfully`,
      data: result
    });
  } catch (error) {
    console.error("Error in toggleUserLock:", error);
    res.status(error.message === "User not found" ? 404 : 500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
}

// [GET] /api/v1/admin/users
export async function getUsers(req, res) {
  try {
    const users = await adminService.getAllUsers();

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error("Error in getUsers:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
}

// [POST] /api/v1/admin/users
export async function createAdmin(req, res) {
  try {
    const result = await adminService.createAdmin(req.body);

    res.status(201).json({
      success: true,
      message: "Admin user created successfully",
      data: result
    });
  } catch (error) {
    console.error("Error in createAdmin:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Error creating admin user"
    });
  }
} 