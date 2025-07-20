import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedAdmin } from './seed.js';

let isConnected = false;

// 🌱 Load .env or .env.test depending on NODE_ENV
if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.test' });
} else {
    dotenv.config();
}

const DBConnection = async () => {
    if (process.env.NODE_ENV === 'test') {
        console.log("🧪 Skipping MongoDB connection in test mode");
        return;
    }

    if (isConnected) {
        console.log("✅ Already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        /* isConnected = true; */
        console.log("✅ Database connection successful");
        /* return seedAdmin() */
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
        process.exit(1);
    }
};

export default DBConnection;
