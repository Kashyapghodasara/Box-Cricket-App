import Admin from "../models/adminSchema.js"
import bcrypt from "bcrypt"
import crypto from "crypto";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({ path: "../.env" })

function encrypt(text) {
    const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 32 bytes
    const ALGORITHM = process.env.ALGO;

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

export const seedAdmin = async () => {
    try {
        const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

        if (existingAdmin) {
            console.log("Admin already exists");
            return;
        }

        const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 16);
        const encryptSecretString = encrypt(
            JSON.stringify(process.env.ADMIN_SECRET_STRING)
        );

        await Admin.create({
            name: process.env.ADMIN_NAME,
            username: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL,
            password: hashPassword,
            secret_string: JSON.stringify(encryptSecretString),
        });

        console.log("Admin created successfully ✅");

    } catch (error) {
        console.error("❌ Error in Admin Seeding Process:", error.message);
    }
}
