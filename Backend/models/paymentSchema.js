import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethode: {
        type: String,
        required: true
    },
    paymentDetails : {
        type: Object,
        required: true
    },
    bookedBoxInfo : [{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, { timestamps: true })

const Payment = mongoose.model("payment", paymentSchema)
export default Payment