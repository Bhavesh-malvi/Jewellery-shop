import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB, checkDbStatus, getDbDiagnostics } from './config/db.js'

// Route files
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.set('trust proxy', 1)

// Connect to Database
connectDB()

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Request logger for development
app.use((req, res, next) => {
    console.log(`📡 [${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`)
    next()
})

// Mount routers
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/upload', uploadRoutes)

// Health Check API
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Rangoli Jewellers Backend API is running smoothly',
        timestamp: new Date().toISOString(),
        databaseConnected: checkDbStatus(),
        database: getDbDiagnostics(),
        environment: process.env.NODE_ENV || 'development',
    })
})

// Root route
app.get('/', (req, res) => {
    res.send('👑 Rangoli Jewellers Backend REST API running (ES Modules).')
})

// 404 Route handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Endpoint ${req.originalUrl} not found`,
    })
})

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err)
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    })
})

const PORT = process.env.PORT || 5001

const server = app.listen(PORT, () => {
    console.log(`\n======================================================`)
    console.log(`🚀 Rangoli Jewellers Backend Server running on port ${PORT} [ES Modules]`)
    console.log(`🔗 API Base URL: http://localhost:${PORT}/api`)
    console.log(`🔐 Default Admin: admin@rangoli.com / admin123`)
    console.log(`======================================================\n`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection: ${err.message}`)
})

export default app
