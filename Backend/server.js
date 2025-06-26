import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express()
dotenv.config({path: ".env"})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(cors, {
    origin: 'http://localhost:5173/',
    credentials: true
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} ⚙`)
})    