import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from "helmet";
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import DBConnection from './config/database.js';
import userRouter from './routes/userRoute.js';
import bookingRoute from './routes/bookingRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import adminRouter from './routes/adminRoute.js';

export const app = express()
DBConnection()
dotenv.config({ path: ".env" })

const __filename = fileURLToPath(import.meta.url);  // You have to import this first
const __dirname = path.dirname(__filename);

// 1. General API rate limit
export const userLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // Each IP can make 100 requests per window
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes."
  },
  standardHeaders: true,    // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,     // Disable `X-RateLimit-*` headers (deprecated)
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50, // stricter for admin
  message: { success: false, message: "Too many requests for admin routes" }
});



app.use(express.json())
app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public'))) // This is dosen't directly work in ES module


const allowedOrigins = ["https://box-cricket-app.vercel.app/", "https://admin-box-cricket-app.vercel.app/"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

/* app.use("/api/v1/", apiLimiter) */
app.use("/api/v1/user", userRouter)
app.use("/api/v1/user", userLimiter, bookingRoute);
app.use("/api/v1/user", userLimiter, paymentRoute);

app.use("/api/v1/admin", adminLimiter, adminRouter);


if (process.env.NODE_ENV === 'development') {
    dotenv.config();
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT} ⚙`)
    })
}

