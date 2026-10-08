import multer from 'multer'
import path from 'path'
import fs from 'fs'
import crypto from 'crypto'
import { fileURLToPath } from 'url'
import cloudinary from '../config/cloudinary.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Multer in-memory storage (processes directly without writing to disk first)
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error('Only image files (JPG, PNG, WEBP, AVIF) are allowed!'), false)
    }
}

export const upload = multer({
    storage,
    limits: {
        fileSize: 15 * 1024 * 1024, // 15MB limit
    },
    fileFilter,
})

// Helper to stream memory buffer to Cloudinary
export const uploadBufferToCloudinary = (buffer, folder = 'rangoli_jewellers/products') => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'image',
            },
            (error, result) => {
                if (error) return reject(error)
                resolve(result)
            }
        )
        stream.end(buffer)
    })
}

// Helper to save buffer to local uploads folder as seamless fallback
export const saveBufferLocally = (file, req) => {
    const uploadsDir = path.join(__dirname, '../uploads')
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true })
    }

    const ext = path.extname(file.originalname) || '.jpg'
    const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}`
    const fileName = `jewellery-${uniqueSuffix}${ext}`
    const filePath = path.join(uploadsDir, fileName)

    fs.writeFileSync(filePath, file.buffer)

    const host = req.get('host') || 'localhost:5001'
    const protocol = req.protocol || 'http'
    const fullUrl = `${protocol}://${host}/uploads/${fileName}`

    return {
        url: fullUrl,
        public_id: fileName,
        source: 'local_storage',
    }
}

// High-level robust uploader: Cloudinary first, local fallback
export const processUpload = async (file, req) => {
    try {
        const cloudResult = await uploadBufferToCloudinary(
            file.buffer,
            'rangoli_jewellers/products'
        )
        return {
            success: true,
            url: cloudResult.secure_url,
            public_id: cloudResult.public_id,
            source: 'cloudinary',
            format: cloudResult.format,
            width: cloudResult.width,
            height: cloudResult.height,
        }
    } catch (cloudErr) {
        console.warn(
            `⚠️ Cloudinary Upload Notice (${cloudErr.message}). Using local uploads storage fallback.`
        )
        const localResult = saveBufferLocally(file, req)
        return {
            success: true,
            url: localResult.url,
            public_id: localResult.public_id,
            source: 'local_storage',
            notice:
                'Uploaded locally. To store directly on Cloudinary, grant "create" action to your API Key in Cloudinary Dashboard -> Access Keys.',
        }
    }
}

export default {
    upload,
    uploadBufferToCloudinary,
    saveBufferLocally,
    processUpload,
}
