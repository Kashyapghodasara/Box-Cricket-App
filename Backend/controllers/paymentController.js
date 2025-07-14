import User from '../models/userSchema.js'
import Booking from '../models/bookingSchema.js'
import Payment from '../models/paymentSchema.js'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config({ path: "../.env" })

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 32 bytes
const ALGORITHM = process.env.ALGO;

// Box booked id -> Payment schema    - Done
// Payment created id  -> Box Schema

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
        const { Fullname, Email, City, State, Zipcode, paymentMethode, Amount, ...dynamicPayment } = req.body;
        const bookedBoxId = req.params.id;

        if (!Fullname || !Email || !City || !State || !Zipcode || !paymentMethode || !Amount) {
            return res.status(401).json({
                message: "Please fill all the fields",
                success: false,
            });
        }

        const findUser = await User.findById(req.user._id);
        if (!findUser) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
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
            paymentDetails: encryptedPayment,
            bookedBoxInfo: bookedBoxId,
            user: req.user._id,
        });

        findUser.payments.push(createPayment._id);
        await findUser.save();

        const findBookedBooking = await Booking.findById(bookedBoxId);
        if (!findBookedBooking) {
            return res.status(400).json({
                message: "Box not found",
                success: false,
            });
        }

        findBookedBooking.paymentInfo.push(createPayment._id);
        await findBookedBooking.save();

        return res.status(200).json({
            message: "Payment Created successfully",
            success: true,
            paymentId: createPayment._id
        });
    } catch (error) {
        console.error("Error Occurred in Payment Process", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export const getPaymentDetails = async (req, res) => {
    try {
        const paymentId = req.params.paymentid;
        if (!paymentId) {
            return res.status(404).json({
                message: "Payment Id not found",
                success: false
            })
        }

        const findPaymentDetails = await Payment.findById(paymentId)
        const findBookingDetails = await Booking.findById(findPaymentDetails.bookedBoxInfo)
        if (!findPaymentDetails || !findBookingDetails) {
            return res.status(404).json({
                message: "Booking Details not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Payment details fetched successfully",
            success: true,
            paymentData: findPaymentDetails,
            boxData: findBookingDetails
        })
        
    } catch (error) {
        console.error("Error Occurred in Payment Process", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
}
