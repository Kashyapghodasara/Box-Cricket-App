import request from 'supertest'
import mongoose from 'mongoose'
import { app } from '../server.js'
import User from '../models/userSchema.js'
import { MongoMemoryServer } from 'mongodb-memory-server'
import dotenv from 'dotenv'
dotenv.config();

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri)
})

/* 0 = disconnected
1 = connected
2 = connecting
3 = disconnecting
If it’s already 0, no need to call dropDatabase() or close() */
afterAll(async () => {
    if(mongoose.connection.readyState !== 0) {
        await mongoose.connection.dropDatabase()
        await mongoose.disconnect()
    }
})

afterEach(async () => {
    const {collections} = mongoose.connection // Object of All Collection
    for(const key in collections) {           // Loop over all the collection names (users, posts, etc.
        await collections[key].deleteMany({}) // Because passing {} as the filter means: delete everything
    }
})

describe("User Authentication", () => {
    it('Signup test', async () => {
        const userData = {name : "test", username:"TEST", email: "test@t.com", password: "test123"}
        const res = await request(app).post('/api/v1/user/signup').send(userData)
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty("message", "User created successfully")
        expect(res.body.success).toBe(true)

        const findUser = await User.findOne({email: "test@t.com", username: "TEST"})
        expect(findUser.email).toBe(userData.email)
        expect(findUser.username).toBe(userData.username)
    })

    it('Login Test', async () => {

        //Signup is must, because MMS has no static DB
        const signupUserData = {name : "test", username:"TEST", email: "test@t.com", password: "test123"}
        await request(app).post('/api/v1/user/signup').send(signupUserData)

        const loginUserData = {username: 'TEST', email: 'test@t.com', password: 'test123'}
        const res = await request(app).post('/api/v1/user/login').send(loginUserData)

        expect(res.body).toHaveProperty("message", "User logged in successfully")
        expect(res.body).toHaveProperty("username", `Welcome ${loginUserData.username}`)
        expect(res.body.success).toBe(true)
        expect(res.statusCode).toBe(200)
    })

    it('Empty Field Reg. Test', async () => {
        const signupUserData = {name : "", username:"TEST", email: "", password: ""}
        const res = await request(app).post('/api/v1/user/signup').send(signupUserData)
        expect(res.statusCode).toBe(401)
        expect(res.body).toHaveProperty("message", "Please fill all the fields")
        expect(res.body.success).toBe(false)

        const loginUserData = {username: "", email: "", password: ""}
        const loginRes = await request(app).post('/api/v1/user/login').send(loginUserData)
        expect(loginRes.statusCode).toBe(401)
        expect(loginRes.body).toHaveProperty("message", "Please fill all the fields")
        expect(loginRes.body.success).toBe(false)
    })
})
