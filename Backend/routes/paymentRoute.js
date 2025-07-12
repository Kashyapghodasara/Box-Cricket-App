import express from 'express'
import { isAuthenticated } from '../config/auth.js';    
import { createPayment } from '../controllers/paymentController.js';
const router = express.Router()

router.route('/createpayment').post(isAuthenticated, createPayment)

export default router