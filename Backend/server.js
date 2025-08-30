import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from "helmet";
import { rateLimit } from 'express-rate-limit';
import axios from 'axios';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import DBConnection from './config/database.js';
import userRouter from './routes/userRoute.js';
import bookingRoute from './routes/bookingRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import adminRouter from './routes/adminRoute.js';

dotenv.config({ path: ".env" });

export const app = express();
DBConnection();
axios.defaults.withCredentials = true;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================= Rate Limiters =================
export const userLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { success: false, message: "Too many requests for admin routes" }
});

// ================= Proxy & Parsers =================
app.set("trust proxy", 1); // Required for secure cookies on Render

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ================= Helmet =================
app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://admin-box-cricket-app.vercel.app"],
    styleSrc: ["'self'", "https:", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
    fontSrc: ["'self'", "https:", "data:"],
    connectSrc: [
      "'self'",
      "https://backend-box-cricket.onrender.com",
      "https://admin-box-cricket-app.vercel.app",
      "https://box-cricket-app.vercel.app"
    ],
    formAction: [
      "'self'",
      "https://admin-box-cricket-app.vercel.app",
      "https://box-cricket-app.vercel.app"
    ],
    frameAncestors: ["'self'"],
  },
}));

// ================= CORS =================
const allowedOrigins = [
  "https://box-cricket-app.vercel.app",
  "https://admin-box-cricket-app.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// ================= Routes =================
app.use("/api/v1/user", userRouter);
app.use("/api/v1/user", userLimiter, bookingRoute);
app.use("/api/v1/user", userLimiter, paymentRoute);
app.use("/api/v1/admin", adminLimiter, adminRouter);

// ================= Server Start =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
