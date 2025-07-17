import { bookingBox, getBookingDetails, bookedSloteChecking } from "../controllers/bookingController.js";
import { isAuthenticated } from "../config/auth.js";
import express from 'express'

const router = express.Router();

router.route('/bookings').post(isAuthenticated, bookingBox)
router.route('/getBookingsDetails/:userId').get(isAuthenticated, getBookingDetails)
router.route('/getBookingsDetails/:userId').get(isAuthenticated, getBookingDetails)
router.route('/availableSlote/:userId').post(isAuthenticated, bookedSloteChecking)


export default router