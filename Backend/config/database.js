import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const DBConnection = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Database connection successful ✅");
    }).catch(() => {
        console.log("Database connection failed ❌");
    })
}

export default DBConnection