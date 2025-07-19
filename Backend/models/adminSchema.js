import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
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
    secret_string: {
        iv: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }
}, { timestamps: true })

const Admin = mongoose.model("admin", adminSchema);
export default Admin