import express from 'express'
import { adminLogin, totalBalance } from "../controllers/adminController.js"
import { isAdminAuthenticated } from '../config/auth.js'

const router = express.Router()

router.route('/adminLogin').post(adminLogin)
router.route('/totalBalance').get(isAdminAuthenticated, totalBalance)

export default router