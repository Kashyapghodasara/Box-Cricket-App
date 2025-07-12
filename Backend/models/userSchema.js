import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    ticket_no: {
        type: [Number],  // array of numbers
        required: true
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookings"
    }], 
    payments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment"
    }]
}, { timestamps: true })

const User = mongoose.model("user", userSchema)
export default User