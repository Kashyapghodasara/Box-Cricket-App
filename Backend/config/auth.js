import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/userSchema.js'
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
