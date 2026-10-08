import mongoose from 'mongoose'

let isDbConnected = false

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        })
        isDbConnected = true
        console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`)
    } catch (error) {
        isDbConnected = false
        console.warn(`⚠️ MongoDB Connection Notice: ${error.message}`)
        console.warn(`👉 Make sure MongoDB is running locally or specify your MongoDB Atlas URI in Backend/.env`)
    }
}

export const checkDbStatus = () => isDbConnected

export default { connectDB, checkDbStatus }
