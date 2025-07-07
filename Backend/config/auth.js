import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/userSchema.js'
dotenv.config({ path: "../.env" })

// Protected Route
/*  Reusability: User details are available across all protected routes without re-verifying the token.
 Convenience: Accessing user data from req.user simplifies code in route handlers. */

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            res.status(401).json({
                message: "Please login to access this resource",
                success: false
            })
            return res.redirect('/registration')
        }

        // decode._id is the MongoDB user’s _id you stored when signing the JWT.
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const userData = await User.findById(decode._id)
        if (!userData) {
            res.status(404).json({
                message: "User not found",
                success: false
            })
            return res.redirect('/registration')
        }
        req.user = userData
        next()
    } catch (error) {
        console.log("Error Ocuure in Authentication", error.message)
    }
}

export default isAuthenticated