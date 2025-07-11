import request from 'supertest'
import mongoose from 'mongoose'
import { app } from '../server.js'
import User from '../models/userSchema.js'
import Bookings from '../models/bookingSchema.js'
import { MongoMemoryServer } from 'mongodb-memory-server'
import dotenv from 'dotenv'
dotenv.config();

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri)
})

afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.dropDatabase()
        await mongoose.disconnect()
    }
})

afterEach(async () => {
    const { collections } = mongoose.connection // Object of All Collection
    for (const key in collections) {           // Loop over all the collection names (users, posts, etc.
        await collections[key].deleteMany({}) // Because passing {} as the filter means: delete everything
    }
})

/* your booking endpoint requires authentication, and the request you sent in the test does not include valid 
authentication credentials (like a token, cookie, session) */

describe('Slote Booking Test', () => {

    it('Book Slote', async () => {

        // Signup to implement Login
        const signupUserData = { name: "test", username: "TEST", email: "test@t.com", password: "test123" }
        await request(app).post('/api/v1/user/signup').send(signupUserData)

        // Login to get Token for booking box otherwise it will throw error
        const loginUserData = { username: 'TEST', email: 'test@t.com', password: 'test123' }
        const loginRes = await request(app).post('/api/v1/user/login').send(loginUserData)
        expect(loginRes.body).toHaveProperty("message", "User logged in successfully")
        expect(loginRes.statusCode).toBe(200)

        // Booking Box Test
        const bookingSloteData = { Boxid: "BX001", Date: "11-07-2025", Start_time: "10:00", End_time: "11:00", Price: 600, Size: "Small", Duration: "1 hour" }
        const token = loginRes.body.token
        const res = await request(app).post('/api/v1/user/bookings').set('Authorization', `Bearer ${token}`).send(bookingSloteData)

        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe("Box Booked Successfully")
        expect(res.body.success).toBe(true)
    })

    it('Empty Field Book Test', async () => {
        // Signup to implement Login
        const signupUserData = { name: "test", username: "TEST", email: "test@t.com", password: "test123" }
        await request(app).post('/api/v1/user/signup').send(signupUserData)

        // Login to get Token for booking box otherwise it will throw error
        const loginUserData = { username: 'TEST', email: 'test@t.com', password: 'test123' }
        const loginRes = await request(app).post('/api/v1/user/login').send(loginUserData)
        expect(loginRes.body).toHaveProperty("message", "User logged in successfully")
        expect(loginRes.statusCode).toBe(200)
        const token = loginRes.body.token

        const bookingSloteData = { Boxid: "BX002", Date: "11-07-2025", Start_time: "", End_time: "", Price: "", Size: "Small", Duration: "" }
        const res = await request(app).post('/api/v1/user/bookings').set('Authorization', `Bearer ${token}`).send(bookingSloteData)
        expect(res.statusCode).toBe(401)
        expect(res.body.message).toBe("Please fill all the fields")
        expect(res.body.success).toBe(false)
    })
})