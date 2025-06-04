//const express = require('express')
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoute.js";
import movieRoutes from "./routes/movieRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/database.js";
import { protectRoute } from "./middleware/protectRoute.js";

dotenv.config();
const app = express();
const port = ENV_VARS.PORT || 5000;

console.log("MONGODB:", process.env.MONGODB_URI);

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // will allow us to parse JSON data from the request body
app.use(morgan("combined"));
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/admin", adminRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
});
