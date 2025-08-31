import express from "express";
import { isAdminAuthenticated } from "../config/auth.js";
import {
  adminLogin,
  adminLogout,
  refreshAdminToken,
  totalBalance,
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
  fetchTransactionDetails,
} from "../controllers/adminController.js";

const router = express.Router();

// ================= Auth Routes =================
router.post("/adminLogin", adminLogin);
router.get("/adminLogout", adminLogout);

// 👉 New Refresh Token endpoint
router.post("/refresh-token", refreshAdminToken);

// ================= Protected Routes =================
router.get("/totalBalance", isAdminAuthenticated, totalBalance);
router.get("/bookedSlotNumber", isAdminAuthenticated, todayBookedSlots);
router.get("/todayRevenue", isAdminAuthenticated, todayRevenue);
router.get("/getBookedBoxStat", isAdminAuthenticated, getBookedBoxStat);
router.get("/getPaymentMethodStat", isAdminAuthenticated, getPaymentMethodStat);
router.get("/monthlyBookingStat", isAdminAuthenticated, monthlyBookingStat);
router.get("/yesterdayBookingDetails", isAdminAuthenticated, yesterdayBookingDetails);
router.get("/tomorrowBookingDetails", isAdminAuthenticated, tomorrowBookingDetails);
router.get("/overmorrowBookingDetails", isAdminAuthenticated, overmorrowBookingDetails);
router.get("/lastWeekBookingDetails", isAdminAuthenticated, lastWeekBookingDetails);
router.get("/lastMonthBookingDetails", isAdminAuthenticated, lastMonthBookingDetails);
router.get("/lastYearBookingDetails", isAdminAuthenticated, lastYearBookingDetails);
router.get("/fetchTransactionDetails", isAdminAuthenticated, fetchTransactionDetails);

export default router;
