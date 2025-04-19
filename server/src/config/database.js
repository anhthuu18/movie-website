import mongoose from 'mongoose';
import { ENV_VARS } from './envVars.js';

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(ENV_VARS.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(error){
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // 1 means failure, 0 means success
    }
}
