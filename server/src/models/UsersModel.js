import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    }, 
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    // searchHistory: {
    //     type: [String],
    //     default: [],
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
        default: Date.now,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

export const User = mongoose.model("User", userSchema);