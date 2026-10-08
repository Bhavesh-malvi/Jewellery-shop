import express from 'express'
import { upload, processUpload } from '../middleware/upload.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

// @desc    Upload a single image (Cloudinary or local storage)
// @route   POST /api/upload
// @access  Private / Admin
router.post(
    '/',
    protect,
    adminOnly,
    upload.single('image'),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: 'Please choose an image file to upload',
                })
            }

            const result = await processUpload(req.file, req)

            res.json({
                success: true,
                message:
                    result.source === 'cloudinary'
                        ? 'Image uploaded to Cloudinary successfully'
                        : 'Image uploaded successfully to server storage',
                ...result,
            })
        } catch (error) {
            console.error('Upload error:', error)
            res.status(500).json({
                success: false,
                message: error.message || 'Failed to upload image',
            })
        }
    }
)

// @desc    Upload multiple images (up to 5 images)
// @route   POST /api/upload/multiple
// @access  Private / Admin
router.post(
    '/multiple',
    protect,
    adminOnly,
    upload.array('images', 5),
    async (req, res) => {
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Please select at least one image file',
                })
            }

            const results = await Promise.all(
                req.files.map((file) => processUpload(file, req))
            )

            const urls = results.map((r) => r.url)

            res.json({
                success: true,
                message: `Successfully uploaded ${results.length} images`,
                urls,
                images: results,
            })
        } catch (error) {
            console.error('Multiple upload error:', error)
            res.status(500).json({
                success: false,
                message: error.message || 'Failed to upload images',
            })
        }
    }
)

export default router
