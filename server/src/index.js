//const express = require('express')
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
//import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoute.js';
import movieRoutes from './routes/movieRoute.js';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/database.js';


dotenv.config();
const app = express()
const port = ENV_VARS.PORT || 5000;

console.log("MONGODB:", process.env.MONGODB_URI);

app.use(express.json()); // will allow us to parse JSON data from the request body
app.use(morgan('combined'));
//app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
})


