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
    ticket_no:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookings"
    }],
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookings"
    }]
}, {timestamps: true})

const User = mongoose.model("user", userSchema)
export default User