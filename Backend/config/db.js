import mongoose from 'mongoose'

let isDbConnected = false
let lastDbError = null

// Fallback Atlas URI if environment variable is missing on Render / Cloud host
const DEFAULT_ATLAS_URI =
    'mongodb+srv://bhaveshmalviya335_db_user:JH8iX1npS0C31xeU@cluster0.fodiwas.mongodb.net/jewellery_shop?retryWrites=true&w=majority&appName=Cluster0'

export const connectDB = async () => {
    const uri = process.env.MONGO_URI || DEFAULT_ATLAS_URI

    try {
        if (mongoose.connection.readyState === 1) {
            isDbConnected = true
            return true
        }

        console.log('📡 Connecting to MongoDB Atlas...')
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 8000,
            socketTimeoutMS: 45000,
        })

        isDbConnected = true
        lastDbError = null
        console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`)
        return true
    } catch (error) {
        isDbConnected = false
        lastDbError = error.message
        console.error(`❌ MongoDB Connection Error: ${error.message}`)
        console.warn('👉 Verify that 0.0.0.0/0 is whitelisted in MongoDB Atlas -> Network Access.')
        return false
    }
}

// Track connection lifecycle
mongoose.connection.on('connected', () => {
    isDbConnected = true
    lastDbError = null
})

mongoose.connection.on('disconnected', () => {
    isDbConnected = false
    console.warn('⚠️ MongoDB connection disconnected.')
})

mongoose.connection.on('error', (err) => {
    isDbConnected = false
    lastDbError = err.message
    console.error('❌ MongoDB runtime error:', err.message)
})

export const checkDbStatus = () => isDbConnected || mongoose.connection.readyState === 1

export const getDbDiagnostics = () => ({
    connected: checkDbStatus(),
    readyState: mongoose.connection.readyState,
    hasCustomEnvUri: Boolean(process.env.MONGO_URI),
    lastError: lastDbError,
})

export default { connectDB, checkDbStatus, getDbDiagnostics }
