import authService from "../services/authService.js";
import { generateJWTandSetCookie } from "../utils/generateJWT.js";

// [POST]/api/v1/auth/signup
export async function signup(req, res) {
  try {
    const { email, username, password } = req.body;
    
    // Validate data
    const validationErrors = authService.validateSignupData({ email, username, password });
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: validationErrors[0],
      });
    }

    // Create user using service
    const newUser = await authService.signup({ email, username, password });

    // Generate JWT and set cookie
    generateJWTandSetCookie(newUser._id, res);

    // Send success response
    res.status(201).json({
      success: true,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        image: newUser.image,
        role: newUser.role,
        searchHistory: newUser.searchHistory,
        favoriteMovies: newUser.favoriteMovies,
        watchedMovies: newUser.watchedMovies,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        slug: newUser.slug,
      },
    });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

// [POST] /api/v1/auth/login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate data
    const validationErrors = authService.validateLoginData({ email, password });
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: validationErrors[0],
      });
    }

    // Login using service
    const user = await authService.login(email, password);

    // Generate JWT and set cookie
    generateJWTandSetCookie(user._id, res);

    // Send success response
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
        role: user.role,
        searchHistory: user.searchHistory,
        favoriteMovies: user.favoriteMovies,
        watchedMovies: user.watchedMovies,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        slug: user.slug,
      },
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Invalid email or password",
    });
  }
}

// [POST] /api/v1/auth/logout
export async function logout(req, res) {
  try {
    // Clear JWT cookie
    res.clearCookie("jwt-movie");

    // Send success response
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

// [GET] /api/v1/auth/:slug/profile
export async function getCurrentUser(req, res) {
  try {
    const { slug } = req.params;
    
    // Verify that the logged-in user matches the requested profile
    if (req.user.slug !== slug) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own profile"
      });
    }

    const user = await authService.getCurrentUser(req.user._id);

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
        role: user.role,
        searchHistory: user.searchHistory,
        favoriteMovies: user.favoriteMovies,
        watchedMovies: user.watchedMovies,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        slug: user.slug,
      },
    });
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    res.status(404).json({
      success: false,
      message: error.message || "User not found",
    });
  }
}

// [PUT] /api/v1/auth/:slug/profile/update
export async function updateProfile(req, res) {
  try {
    const { slug } = req.params;
    
    // Verify that the logged-in user matches the requested profile
    if (req.user.slug !== slug) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own profile"
      });
    }

    // Validate update data
    const validationErrors = authService.validateProfileData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: validationErrors[0],
      });
    }

    // Update profile using service
    const updatedUser = await authService.updateProfile(req.user._id, req.body);

    // Send success response
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        image: updatedUser.image,
        role: updatedUser.role,
        searchHistory: updatedUser.searchHistory,
        favoriteMovies: updatedUser.favoriteMovies,
        watchedMovies: updatedUser.watchedMovies,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
        slug: updatedUser.slug,
      },
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Error updating profile",
    });
  }
}

// [PATCH] /api/v1/auth/user/change-password
export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate password data
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both current password and new password are required"
      });
    }

    if (typeof newPassword !== 'string' || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long"
      });
    }

    // Change password using service
    await authService.changePassword(req.user._id, currentPassword, newPassword);

    res.status(200).json({
      success: true,
      message: "Password changed successfully"
    });
  } catch (error) {
    console.error("Error in changePassword:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Error changing password"
    });
  }
}
