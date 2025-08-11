import express from 'express'
import { adminLogin, totalBalance, adminLogout, todayBookedSlots, todayRevenue, getBookedBoxStat, getPaymentMethodStat } from "../controllers/adminController.js"
import { isAdminAuthenticated } from '../config/auth.js'

const router = express.Router()

router.route('/adminLogin').post(adminLogin)
router.route('/adminLogout').get(adminLogout)
router.route('/totalBalance').get(isAdminAuthenticated, totalBalance)
router.route('/bookedSlotNumber').get(isAdminAuthenticated, todayBookedSlots)
router.route('/todayRevenue').get(isAdminAuthenticated, todayRevenue)
router.route('/getBookedBoxStat').get(isAdminAuthenticated, getBookedBoxStat)
router.route('/getPaymentMethodStat').get(isAdminAuthenticated, getPaymentMethodStat)






export default router