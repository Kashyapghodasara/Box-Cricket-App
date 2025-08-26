import express from "express"
import {signup, login, logout} from "../controllers/userController.js"
import { isAuthenticated } from '../config/auth.js';  
import { rateLimit } from 'express-rate-limit';
 
// 2. Strict rate limit for auth routes (login/register)
export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,                   // Max 5 attempts per 10 minutes per IP
  message: {
    success: false,
    message: "Too many login attempts. Try again after 10 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const router = express.Router()

router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/logout", logout);

// Protected /me route
router.get("/me", isAuthenticated, (req, res) => {
    // Optionally, fetch user data from DB using req.user.id
    res.status(200).json({
        success: true,
        user: req.user // { id, name, email } from token
    });
});


export default router