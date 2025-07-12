import User from '../models/userSchema.js'
import Booking from '../models/bookingSchema.js'
import Payment from '../models/paymentSchema.js'

export const createPayment = async (req, res) => {
    try {
        
        // We also have to check finalPayement payload is an object
        const {Fullname, Email, City, State, Zipcode, paymentMethode, ...dynamicPayment} = req.body.finalPaymentDetails
        
        if(!Fullname || !Email || !City || !State || !Zipcode || !paymentMethode){
            return res.status(401).json({
                message: "Please fill all the fields",
                success: false
            })
        }

        const createPayment = await Payment.create({
            fullname: Fullname,
            email: Email,
            city: City,
            state: State,
            zipcode: Zipcode,
            paymentMethode,
            user: req.user,
            paymentDetails: dynamicPayment
        })

        return res.status(200).json({
            message: "Payment Created successfully",
            success: true
        })

    } catch (error) {
        console.log("Error Occure in Payment Process", error.message)
        console.log(error)
    }
}