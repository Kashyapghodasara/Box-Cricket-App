import express from "express"
import {signup, login, logout} from "../controllers/userController.js"
import { isAuthenticated } from '../config/auth.js';    


const router = express.Router()

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').post(logout)

// Protected /me route
router.get("/me", isAuthenticated, (req, res) => {
    // Optionally, fetch user data from DB using req.user.id
    res.status(200).json({
        success: true,
        user: req.user // { id, name, email } from token
    });
});


export default router