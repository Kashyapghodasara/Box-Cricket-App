import mongoose from "mongoose"

const boxSchema = new mongoose.Schema({
    box_id: {
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
    capacity: {
        type: String,
        required: true
    }, 
    status: {
        type: ['Available', 'Maintenance'],
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    }

}, {timestamps: true})

const Box = mongoose.model("box", boxSchema)
export default Box