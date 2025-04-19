import { User } from "../models/UsersModel.js";
import bcryptjs from "bcryptjs";

export async function signup(req, res) {
    // Handle signup logic here
    //res.send("Signup route");
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        }

        const exitingUserByEmail = await User.findOne({ email: email });
        if (exitingUserByEmail) {
            return res.status(400).json({ success: false, message: "User already exists with this email" });
        }

        const exitingUserByUsername = await User.findOne({ username: username });
        if (exitingUserByUsername) {
            return res.status(400).json({ success: false, message: "User already exists with this username" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        //123456 => $_#12312_smakl12_

        const PROFILE_PIC = ["/uploads/users/avatar1.jpg", "/uploads/users/avatar2.jpg", "/uploads/users/avatar3.jpg"];
        const image = PROFILE_PIC[Math.floor(Math.random() * PROFILE_PIC.length)];

        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            image,
            fullName: fullName || username,
        }); 
        //postman 
        await newUser.save();
        res.status(201).json({
            success: true, user: {
                ...newUser._doc,
                password: "",
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.error(" Error in signup:", error);
    }
}

export async function login(req, res) {
    // Handle login logic here
    res.send("Login route");
}

export async function logout(req, res) {
    // Handle logout logic here
    res.send("Logout route");
}