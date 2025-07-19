import Admin from "../models/adminSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv, { decrypt } from "dotenv"
import crypto from "crypto"
import { Error } from "mongoose"
dotenv.config({ path: "../.env" })

function decryptText(encrypted) {

    const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 32 bytes
    const ALGORITHM = process.env.ALGO;

    if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
        throw new Error("ENCRYPTION_KEY must be exactly 32 characters long");
    }

    let data = encrypted;

    // if somehow still string, parse it — but skip if already object
    if (typeof encrypted === "string") {
        try {
            data = JSON.parse(encrypted);
        } catch {
            throw new Error("Invalid JSON in encrypted string");
        }
    }

    const iv = Buffer.from(data.iv, 'hex');
    const content = Buffer.from(data.content, 'hex');

    const decipher = crypto.createDecipheriv(
        ALGORITHM,
        Buffer.from(ENCRYPTION_KEY),
        iv
    );

    let decrypted = decipher.update(content);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();

}


export const adminLogin = async (req, res) => {
    try {
        console.log(req.body)
        const { name, username, email, password, secret_string } = req.body


        if (!username || !name || !email || !password || !secret_string) {
            return res.status(401).json("Please fill all the fields")
        }

        const findAdmin = await Admin.findOne({ email, username })
        if (!findAdmin) {
            return res.status(400).json({ message: "Admin not found", success: false })
        }
        console.log("Username email mathc")

        const decryptString = await decryptText(findAdmin.secret_string)

        if (decryptString !== secret_string) {
            return res.status(400).json({
                message: "Admin Credentials doesn't match",
                success: false
            })
        }

        const hashPW = findAdmin.password
        const comparePW = await bcrypt.compare(password, hashPW)
        /* console.log(comparePW)   */// return TRUE

        if (!comparePW) {
            return res.status(401).json({
                message: "Password doesn't match in Admin Login Process",
                success: false
            })
        }

        const tokenData = {
            id: findAdmin._id
        }

        const token = jwt.sign(tokenData, process.env.ADMIN_JWT_SECRET, { expiresIn: "1d" })
        const findAdminWithToken = await Admin.findOne({ email, username }).select('-password -secret_string')

        return res.cookie("adminToken", token, { expiresIn: "1d", httpOnly: true }).status(200).json({
            message: "Admin logged in successfully",
            username: `Welcome ${findAdminWithToken.username}`,
            admin: findAdminWithToken,
            success: true
        })

    } catch (error) {
        console.log("Error occure in Admin Login Process", error.message)
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error", success: false })
    }
}