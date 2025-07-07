import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Database connection successful");
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
        process.exit(1);
    }
};

export default DBConnection;
