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
    // UPI ID
    upi_id: {
        type: String,
        required: true,
    },
    transaction_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    remark: {
        type: String,
        required: true
    },

    // Bank Transfer Details
    ac_no: {
        type: String,
        required: true,
        match: /^[0-9]+$/, // ✅ Regex: Only digits allowed
    },
    ac_holdername: {
        type: String,
        required: true
    },
    ifsc: {
        type: String,
        required: true,
    },
    bank_name: {
        type: String,
        required: true
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

const Payment = mongoose.model("payment", paymentSchema)
export default Payment