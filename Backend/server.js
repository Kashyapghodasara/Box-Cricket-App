import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import DBConnection from './config/database.js';
import userRouter from './routes/userRoute.js'


export const app = express()
DBConnection()
dotenv.config({path: ".env"})

const __filename = fileURLToPath(import.meta.url);  // You have to import this first
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public'))) // This is dosen't directly work in ES module

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use("/api/v1/user", userRouter)

/* app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} ⚙`)
})    */ 