import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import DBConnection from './config/database.js';
import userRouter from './routes/userRoute.js'
import bookingRoute from './routes/bookingRoute.js'
import paymentRoute from './routes/paymentRoute.js'
import adminRouter from './routes/adminRoute.js'

export const app = express()
DBConnection()
dotenv.config({ path: ".env" })

const __filename = fileURLToPath(import.meta.url);  // You have to import this first
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public'))) // This is dosen't directly work in ES module

app.use(cors({
    origin: 'http://localhost:5173' || 'http://localhost:5174',
    credentials: true
}))

app.use("/api/v1/user", userRouter)
app.use("/api/v1/user", bookingRoute)
app.use("/api/v1/user", paymentRoute)
app.use("/api/v1/admin", adminRouter)


if (process.env.NODE_ENV === 'development') {
    dotenv.config();
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT} ⚙`)
    })
}

