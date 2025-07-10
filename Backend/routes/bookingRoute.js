import { bookingBox } from "../controllers/bookingController.js";
import { isAuthenticated } from "../config/auth.js";
import express from 'express'

const router = express.Router();

router.route('/bookings').post(isAuthenticated, bookingBox)

export default router