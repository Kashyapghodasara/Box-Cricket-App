import express from 'express'
import { isAdminAuthenticated } from '../config/auth.js'
import {
    adminLogin, totalBalance, adminLogout, todayBookedSlots,
    todayRevenue, getBookedBoxStat, getPaymentMethodStat, monthlyBookingStat
} from "../controllers/adminController.js"

const router = express.Router()

router.route('/adminLogin').post(adminLogin)
router.route('/adminLogout').get(adminLogout)
router.route('/totalBalance').get(isAdminAuthenticated, totalBalance)
router.route('/bookedSlotNumber').get(isAdminAuthenticated, todayBookedSlots)
router.route('/todayRevenue').get(isAdminAuthenticated, todayRevenue)
router.route('/getBookedBoxStat').get(isAdminAuthenticated, getBookedBoxStat)
router.route('/getPaymentMethodStat').get(isAdminAuthenticated, getPaymentMethodStat)
router.route('/monthlyBookingStat').get(isAdminAuthenticated, monthlyBookingStat)







export default router