import User from '../models/userSchema.js'
import Booking from '../models/bookingSchema.js'
import Payment from '../models/paymentSchema.js'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config({ path: "../.env" })

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 32 bytes
const ALGORITHM = process.env.ALGO;

function encrypt(text) {
    if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
        throw new Error("ENCRYPTION_KEY must be exactly 32 characters long");
    }

    const iv = crypto.randomBytes(16); // Initialization vector, random per encryption
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
}

export const createPayment = async (req, res) => {
    try {

        // We also have to check finalPayement payload is an object
        const { Fullname, Email, City, State, Zipcode, paymentMethode, Amount, ...dynamicPayment } = req.body.finalPaymentDetails

        if (!Fullname || !Email || !City || !State || !Zipcode || !paymentMethode || !Amount) {
            return res.status(401).json({
                message: "Please fill all the fields",
                success: false
            })
        }

        const findUser = await User.findById(req.user._id)
        if (!findUser) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        const encryptedPayment = encrypt(JSON.stringify(dynamicPayment));

        const createPayment = await Payment.create({
            fullname: Fullname,
            email: Email,
            city: City,
            state: State,
            zipcode: Zipcode,
            paymentMethode,
            amount: Amount,
            user: req.user,
            paymentDetails: encryptedPayment
        })

        findUser.payments.push(createPayment._id)
        await findUser.save()

        return res.status(200).json({
            message: "Payment Created successfully",
            success: true
        })

    } catch (error) {
        console.log("Error Occure in Payment Process", error.message)
        console.log(error)
    }
}