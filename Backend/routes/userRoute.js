import express from "express"
import isAuthenticated from "../config/auth.js"
import {signup, login, logout} from "../controllers/userController.js"

const router = express.Router()

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').post(logout)




export default router