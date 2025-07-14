import express from 'express'
import { isAuthenticated } from '../config/auth.js';    
import { createPayment, getPaymentDetails } from '../controllers/paymentController.js';
const router = express.Router()

router.route('/createpayment/:id').post(isAuthenticated, createPayment)
router.route('/getPayment/:paymentid').get(isAuthenticated, getPaymentDetails)


export default router