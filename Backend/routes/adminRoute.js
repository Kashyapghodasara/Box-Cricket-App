import express from 'express'
import { adminLogin, totalBalance, adminLogout, todayBookedSlots, todayRevenue } from "../controllers/adminController.js"
import { isAdminAuthenticated } from '../config/auth.js'

const router = express.Router()

router.route('/adminLogin').post(adminLogin)
router.route('/adminLogout').get(adminLogout)
router.route('/totalBalance').get(isAdminAuthenticated, totalBalance)
router.route('/bookedSlotNumber').get(isAdminAuthenticated, todayBookedSlots)
router.route('/todayRevenue').get(isAdminAuthenticated, todayRevenue)



export default router