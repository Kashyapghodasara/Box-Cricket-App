import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/userSchema.js'
dotenv.config({ path: "../.env" })

// Protected Route
/*  Reusability: User details are available across all protected routes without re-verifying the token.
 Convenience: Accessing user data from req.user simplifies code in route handlers. */

 /* ⚠️ Once you send res.json(), you cannot also res.redirect() — it will cause:
Cannot set headers after they are sent to the client */

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                message: "Please login to access this resource",
                success: false
            })
        }

        // decode._id is the MongoDB user’s _id you stored when signing the JWT.
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        /* console.log(decode) */
        const userData = await User.findById(decode.id)    //.id is copy variable name which is used in JWT login process
        /* console.log(userData.username) */
        if (!userData) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
            
        }
        req.user = userData
        next()
    } catch (error) {
        console.log("Error Ocuure in Authentication", error.message)
    }
}

