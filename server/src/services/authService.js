import bcryptjs from "bcryptjs";
import { User } from "../models/UsersModel.js";

class AuthService {
  async generateNextUserId() {
    try {
      // Get the latest user
      const latestUser = await User.findOne()
        .sort({ createdAt: -1 })  // Sort by creation date to get the most recent user
        .select("userId");

      let nextNumber = 1;
      if (latestUser && latestUser.userId) {
        // Extract the number from userId and increment
        const matches = latestUser.userId.match(/\d+/);
        if (matches) {
          nextNumber = parseInt(matches[0]) + 1;
        }
      }

      // Format: user0001, user0002, etc.
      return `user${String(nextNumber).padStart(4, '0')}`;
    } catch (error) {
      throw error;
    }
  }

  async signup(userData) {
    try {
      const { email, username, password } = userData;

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
      const userId = await this.generateNextUserId();

      // Select random profile picture
      const PROFILE_PICS = [
        "/uploads/users/avatar1.jpg",
        "/uploads/users/avatar2.jpg",
        "/uploads/users/avatar3.jpg",
      ];
      const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

      // Create new user
      const newUser = new User({
        userId,
        email,
        username,
        password: hashedPassword,
        image,
      });

      // Save user to database
      await newUser.save();

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      // Find user by email
      const user = await User.findOne({ email })
        .select("+password")
        .populate("favoriteMovies", "title posterUrl")
        .populate("watchedMovies.movieId", "title posterUrl");

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Verify password
      const isPasswordCorrect = await bcryptjs.compare(password, user.password);
      if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(userId) {
    try {
      const user = await User.findById(userId)
        .populate("favoriteMovies", "title posterUrl")
        .populate("watchedMovies.movieId", "title posterUrl");

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  validateSignupData(data) {
    const errors = [];

    // Validate required fields
    if (!data.email?.trim() || !data.username?.trim() || !data.password?.trim()) {
      errors.push("All fields are required");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
      errors.push("Invalid email format");
    }

    // Validate password length
    if (data.password && data.password.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }

    return errors;
  }

  validateLoginData(data) {
    const errors = [];

    if (!data.email?.trim() || !data.password?.trim()) {
      errors.push("Email and password are required");
    }

    return errors;
  }

  validateProfileData(profileData) {
    const errors = [];
    const { username, email, currentPassword, newPassword } = profileData;

    // Validate username if provided
    if (username !== undefined) {
      if (typeof username !== 'string' || username.length < 3) {
        errors.push("Username must be at least 3 characters long");
      }
    }

    // Validate email if provided  
    if (email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push("Invalid email format");
      }
    }

    // Validate password if changing
    if (newPassword !== undefined) {
      if (!currentPassword) {
        errors.push("Current password is required to change password");
      }
      if (typeof newPassword !== 'string' || newPassword.length < 6) {
        errors.push("New password must be at least 6 characters long");
      }
    }

    return errors;
  }

  async updateProfile(userId, updateData) {
    try {
      const user = await User.findById(userId).select("+password");
      if (!user) {
        throw new Error("User not found");
      }

      // Handle password change
      if (updateData.newPassword) {
        // Verify current password
        const isPasswordCorrect = await bcryptjs.compare(
          updateData.currentPassword,
          user.password
        );
        if (!isPasswordCorrect) {
          throw new Error("Current password is incorrect");
        }

        // Hash new password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(updateData.newPassword, salt);
        
        // Remove password fields from updateData
        delete updateData.currentPassword;
        delete updateData.newPassword;
      }

      // Check unique constraints
      if (updateData.email && updateData.email !== user.email) {
        const existingUser = await User.findOne({ email: updateData.email });
        if (existingUser) {
          throw new Error("Email already exists");
        }
      }

      if (updateData.username && updateData.username !== user.username) {
        const existingUser = await User.findOne({ username: updateData.username });
        if (existingUser) {
          throw new Error("Username already exists");
        }
      }

      // Update user data
      Object.assign(user, updateData);
      await user.save();

      // Return user without password
      const updatedUser = user.toObject();
      delete updatedUser.password;
      
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(userId, currentPassword, newPassword) {
    try {
      // Find user by ID
      const user = await User.findById(userId).select("+password");
      if (!user) {
        throw new Error("User not found");
      }

      // Verify current password
      const isPasswordCorrect = await bcryptjs.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordCorrect) {
        throw new Error("Current password is incorrect");
      }

      // Hash new password
      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(newPassword, salt);

      // Save user with new password
      await user.save();

      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService(); 