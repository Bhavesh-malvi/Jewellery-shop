import express from 'express'
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getStats,
} from '../controllers/productController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.get('/', getAllProducts)
router.get('/stats', protect, adminOnly, getStats)
router.get('/:id', getProductById)

// Protected Admin routes
router.post('/', protect, adminOnly, createProduct)
router.put('/:id', protect, adminOnly, updateProduct)
router.delete('/:id', protect, adminOnly, deleteProduct)

export default router
