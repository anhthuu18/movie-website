import bcryptjs from "bcryptjs";
import { User } from "../models/UsersModel.js";
import { generateJWTandSetCookie } from "../utils/generateJWT.js";

export async function signup(req, res) {
  try {
    const { email, username, password } = req.body;
    console.log("Request body:", req.body);

    if (!email || !username || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    console.log("Raw password:", password);
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    console.log("Hashed password:", hashedPassword);

    const PROFILE_PICS = ["/uploads/users/avatar1.jpg", "/uploads/users/avatar2.jpg", "/uploads/users/avatar3.jpg"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    console.log("Selected image:", image);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      image,
    });

    await newUser.save();
    console.log("Saved user:", newUser._doc);

    generateJWTandSetCookie(newUser._id, res);

    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.error("Error in signup:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    console.log("Login request body:", req.body); // Thêm log để debug

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    generateJWTandSetCookie(user._id, res); // Di chuyển lên trước res.json

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in login:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-movie");
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error in logout:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}