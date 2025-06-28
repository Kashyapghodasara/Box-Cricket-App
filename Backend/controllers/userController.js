import mongoose from "mongoose"
import DBConnection from "../config/database.js"
import User from "../models/userSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
DBConnection()

// Start creating Signup and Login and logout
// Tested on postman
// Then learn Superset + MMS + Jest
// Start from today

export const signup = async (req, res) => {
    try {
        const { name, username, email, password } = req.body

        if (!name || !username || !email || !password) {
            return res.status(401).json({
                message: "Please fill all the fields",
                success: false
            })
        }

        const findUser = await User.findOne({ email, username })
        if (findUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            })
        }

        const hashPW = await bcrypt.hash(password, 12)
        const createUser = await User.create({
            name,
            username,
            email,
            password: hashPW,
        })
        const findSignedUser = await User.findOne({ email, username }).select("-password")

        return res.status(200).json({
            message: "User created successfully",
            success: true,
            findSignedUser
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }

}

export const login = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Please fill all the fields",
                success: false
            })
        }

        const findUser = await User.findOne({ email, username })
        if (!findUser) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }
        const hashPW = findUser.password
        const comparePassword = bcrypt.compare(password, hashPW)

        if (!comparePassword) {
            return res.status(401).json({
                message: "Password not match in Login Process",
                success: false
            })
        }

        const tokenData = {
            id: findUser._id,
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "3h" })
        const findUserWithToken = await User.findOne({ email, username }).select("-password")

        return res.cookie("token", token, { expiresIn: "3h", httpOnly: true }).status(200).json({
            message: "User logged in successfully",
            message: `Welcome ${findUserWithToken.username}`,
            success: true,
            findUserWithToken
        })
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

export const logout = async (req, res) => {
    return res.cookie("token", "", { expiresIn: Date.now(), httpOnly: true }).status(200).json({
        message: "User logged out successfully",
        success: true
    })
}