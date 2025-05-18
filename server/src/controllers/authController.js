import bcryptjs from "bcryptjs";
import { User } from "../models/UsersModel.js";
import { generateJWTandSetCookie } from "../utils/generateJWT.js";



// [POST]/api/v1/auth/signup
export async function signup(req, res) {
  try {
    const { email, username, password } = req.body;
    // Validate required fields
    if (!email || !username || !password) {
      console.log("Missing required fields");
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Check existing user by email
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Check existing user by username
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Select random profile picture
    const PROFILE_PICS = [
      "/uploads/users/avatar1.jpg",
      "/uploads/users/avatar2.jpg",
      "/uploads/users/avatar3.jpg",
    ];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    // Create new user
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      image,
    });

    // Save user to database
    await newUser.save();

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
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

// [POST] /api/v1/auth/login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email })
      .select("+password") // Explicitly include password
      .populate("favoriteMovies", "title posterUrl")
      .populate("watchedMovies.movieId", "title posterUrl");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Verify password
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

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
    console.log("=== End Login Process ===");
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
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
    console.log("=== End Logout Process ===");
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

// [GET] /api/v1/auth/profile
export async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user._id)
      .populate("favoriteMovies", "title posterUrl")
      .populate("watchedMovies.movieId", "title posterUrl");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

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
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
