import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
    box_id: {
        type: String,
        required: true
    }, 
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    },
    ticket_no: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true})

const Bookings = new mongoose.model("booking", bookingSchema)
export default Bookings