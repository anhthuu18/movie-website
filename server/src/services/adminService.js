import { User } from "../models/UsersModel.js";
import bcryptjs from "bcryptjs";
import authService from "./authService.js";

class AdminService {
  async toggleUserLock(userId) {
    try {
      const user = await User.findOne({ userId });
      if (!user) {
        throw new Error("User not found");
      }

      // Toggle the lock status
      user.isLocked = !user.isLocked;
      await user.save();

      return {
        userId: user.userId,
        username: user.username,
        isLocked: user.isLocked
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

      return users;
    } catch (error) {
      throw error;
    }
  }

  async createAdmin(adminData) {
    try {
      const { email, username, password } = adminData;

      // Check existing user by email
      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
        throw new Error("Email already exists");
      }

      // Check existing user by username
      const existingUserByUsername = await User.findOne({ username });
      if (existingUserByUsername) {
        throw new Error("Username already exists");
      }

      // Hash password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      // Generate userId
      const userId = await authService.generateNextUserId();

      // Create new admin user
      const newAdmin = new User({
        userId,
        email,
        username,
        password: hashedPassword,
        role: "admin"
      });

      await newAdmin.save();

      // Return admin without password
      const adminUser = newAdmin.toObject();
      delete adminUser.password;

      return adminUser;
    } catch (error) {
      throw error;
    }
  }
}

export default new AdminService(); 