import express from 'express'
import { isAdminAuthenticated } from '../config/auth.js'
import {
    adminLogin, 
    totalBalance, 
    adminLogout, 
    todayBookedSlots,
    todayRevenue, 
    getBookedBoxStat, 
    getPaymentMethodStat, 
    tomorrowBookingDetails,
    overmorrowBookingDetails,
    monthlyBookingStat,
    yesterdayBookingDetails,
    lastWeekBookingDetails, 
    lastMonthBookingDetails,
    lastYearBookingDetails,
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
router.route('/yesterdayBookingDetails').get(isAdminAuthenticated, yesterdayBookingDetails)
router.route('/tomorrowBookingDetails').get(isAdminAuthenticated, tomorrowBookingDetails)
router.route('/overmorrowBookingDetails').get(isAdminAuthenticated, overmorrowBookingDetails)
router.route('/lastWeekBookingDetails').get(isAdminAuthenticated, lastWeekBookingDetails)
router.route('/lastMonthBookingDetails').get(isAdminAuthenticated, lastMonthBookingDetails)
router.route('/lastYearBookingDetails').get(isAdminAuthenticated, lastYearBookingDetails)












export default router