import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/userSchema.js'
import Admin from '../models/adminSchema.js'
dotenv.config({ path: "../.env" })

export const isAuthenticated = async (req, res, next) => {
    try {
        let token;

        // ✅ Support token from cookie OR Authorization header
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                message: "Please login to access this resource",
                success: false
            });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const userData = await User.findById(decode.id);

        if (!userData) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        req.user = userData;
        next();
    } catch (error) {
        console.log("Error in Authentication:", error.message);
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};


/**
 * ================= Admin Authentication =================
 * Uses only **Access Token**
 * Refresh token is only used at /refreshToken endpoint, NOT here.
 */
export const isAdminAuthenticated = async (req, res, next) => {
    try {
        let adminToken;

        // 1. Look for the token ONLY in the Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            adminToken = req.headers.authorization.split(" ")[1];
        }

        // If no token is found at all
        if (!adminToken) {
            return res.status(401).json({
                message: "Authentication failed: No token provided.",
                success: false,
            });
        }

        // 2. Verify the token
        const decoded = jwt.verify(adminToken, process.env.ADMIN_JWT_SECRET);

        const adminData = await Admin.findById(decoded.id);
        if (!adminData) {
            return res.status(404).json({
                message: "Admin not found with this token.",
                success: false,
            });
        }

        req.admin = adminData;
        next();

    } catch (error) {
        // 3. IMPORTANT: Send a 401 for ALL errors, including token expiry
        // This ensures the frontend's catch block will always trigger the refresh logic.
        console.log("Error in Admin Authentication:", error.message);
        return res.status(401).json({
            message: "Admin authentication failed. Please refresh token or login again.",
            success: false,
        });
    }
};