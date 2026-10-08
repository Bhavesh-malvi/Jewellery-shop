import Product from '../models/Product.js'
import { checkDbStatus, connectDB } from '../config/db.js'

const ensureDbConnection = async () => {
    if (!checkDbStatus()) {
        await connectDB()
    }
    return checkDbStatus()
}

// @desc    Get all products from database (with search, category, karat filters)
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
    try {
        const isConnected = await ensureDbConnection()
        if (!isConnected) {
            return res.json({
                success: true,
                count: 0,
                data: [],
                notice: 'Database is connecting. Please check MongoDB Atlas IP Whitelist (0.0.0.0/0).',
            })
        }
        const { search, category, karat, metal, isFeatured, inStock } = req.query
        const query = {}

        if (metal && metal !== 'All') {
            if (metal.toLowerCase() === 'silver') {
                query.metal = 'Silver'
            } else if (metal.toLowerCase() === 'gold') {
                query.metal = { $ne: 'Silver' }
            } else {
                query.metal = metal
            }
        }

        if (category && category !== 'All') {
            query.category = category
        }

        if (karat && karat !== 'All') {
            const cleanKarat = karat.replace('T', '')
            query.karat = cleanKarat
        }

        if (isFeatured !== undefined) {
            query.isFeatured = isFeatured === 'true'
        }

        if (inStock !== undefined) {
            query.inStock = inStock === 'true'
        }

        if (search && search.trim() !== '') {
            const searchRegex = new RegExp(search.trim(), 'i')
            query.$or = [
                { name: searchRegex },
                { code: searchRegex },
                { tag: searchRegex },
                { category: searchRegex },
            ]
        }

        const products = await Product.find(query).sort({ createdAt: -1 })

        res.json({
            success: true,
            count: products.length,
            data: products,
        })
    } catch (error) {
        console.error('Get products error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error while fetching products',
            error: error.message,
        })
    }
}

// @desc    Get single product by ID or Code
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        await ensureDbConnection()
        const paramId = req.params.id
        let product = null

        if (paramId.match(/^[0-9a-fA-F]{24}$/)) {
            product = await Product.findById(paramId)
        } else if (!isNaN(paramId)) {
            product = await Product.findOne({ customId: Number(paramId) })
        } else {
            product = await Product.findOne({ code: paramId.toUpperCase() })
        }

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Jewellery product not found in catalogue',
            })
        }

        res.json({
            success: true,
            data: product,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product details',
            error: error.message,
        })
    }
}

// @desc    Create new product
// @route   POST /api/products
// @access  Private / Admin
const createProduct = async (req, res) => {
    try {
        const isConnected = await ensureDbConnection()
        if (!isConnected) {
            return res.status(503).json({
                success: false,
                message:
                    'Database is not connected. Please check MongoDB Atlas IP Whitelist (0.0.0.0/0) and MONGO_URI in Render.',
            })
        }

        const {
            code,
            name,
            metal,
            category,
            karat,
            availableKarats,
            purity,
            tag,
            shortDescription,
            description,
            specs,
            specifications,
            highlights,
            img,
            images,
            isFeatured,
            inStock,
        } = req.body

        if (!code || !name || !category || !karat || !description || !img) {
            return res.status(400).json({
                success: false,
                message:
                    'Please fill in all required fields: Code, Name, Category, Purity/Karat, Description, and Primary Image',
            })
        }

        const isSilver = metal === 'Silver'
        const cleanMetal = isSilver ? 'Silver' : 'Gold'
        const formattedCode = code.toUpperCase().trim()

        // Check for duplicate code
        const existing = await Product.findOne({ code: formattedCode })
        if (existing) {
            return res.status(400).json({
                success: false,
                message: `Product with code "${formattedCode}" already exists. Please choose a different unique code.`,
            })
        }

        // Normalize available karats/purities
        let cleanKarats = []
        if (isSilver) {
            cleanKarats =
                Array.isArray(availableKarats) && availableKarats.length > 0
                    ? availableKarats
                    : ['925 Sterling', '999 Fine Pure']
        } else {
            const validKarats = ['14KT', '18KT', '20KT', '22KT']
            cleanKarats = Array.isArray(availableKarats)
                ? availableKarats.filter((k) => validKarats.includes(k))
                : ['18KT', '20KT', '22KT']
        }

        // Normalize gallery images
        let finalImages = Array.isArray(images) && images.length > 0 ? images : [img]
        if (!finalImages.includes(img)) {
            finalImages = [img, ...finalImages]
        }

        const productData = {
            customId: Date.now(),
            code: formattedCode,
            name: name.trim(),
            metal: cleanMetal,
            category,
            karat: isSilver ? karat : karat.replace('T', ''),
            availableKarats: cleanKarats,
            purity:
                purity ||
                (isSilver ? `${karat} BIS Hallmarked Silver` : `${karat} Hallmarked Gold`),
            tag: tag || 'New Design',
            shortDescription: shortDescription || description.slice(0, 160) + '...',
            description,
            specs:
                specs ||
                (isSilver
                    ? `${karat} BIS Hallmarked Sterling Silver`
                    : `${karat} BIS Hallmarked Gold`),
            specifications: specifications || {},
            highlights:
                Array.isArray(highlights) && highlights.length > 0
                    ? highlights
                    : [
                          isSilver
                              ? '100% Certified 925 Sterling Silver with verifiable hallmark.'
                              : '100% BIS Hallmarked gold with verified laser HUID.',
                      ],
            img: img.trim(),
            images: finalImages,
            isFeatured: Boolean(isFeatured),
            inStock: inStock !== undefined ? Boolean(inStock) : true,
        }

        const newProduct = await Product.create(productData)

        res.status(201).json({
            success: true,
            message: 'Jewellery piece added to catalogue successfully',
            data: newProduct,
        })
    } catch (error) {
        console.error('Create product error:', error)
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create product in database',
        })
    }
}

// @desc    Update existing product
// @route   PUT /api/products/:id
// @access  Private / Admin
const updateProduct = async (req, res) => {
    try {
        await ensureDbConnection()
        const paramId = req.params.id
        const updateData = { ...req.body }

        if (updateData.code) {
            updateData.code = updateData.code.toUpperCase().trim()
        }

        if (updateData.karat && updateData.metal !== 'Silver') {
            updateData.karat = updateData.karat.replace('T', '')
        }

        if (Array.isArray(updateData.availableKarats)) {
            if (updateData.metal !== 'Silver') {
                const valid = ['14KT', '18KT', '20KT', '22KT']
                updateData.availableKarats = updateData.availableKarats.filter((k) =>
                    valid.includes(k)
                )
            }
        }

        let filter = {}
        if (paramId.match(/^[0-9a-fA-F]{24}$/)) {
            filter = { _id: paramId }
        } else if (!isNaN(paramId)) {
            filter = { customId: Number(paramId) }
        } else {
            filter = { code: paramId.toUpperCase() }
        }

        const updated = await Product.findOneAndUpdate(filter, updateData, {
            new: true,
            runValidators: true,
        })

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Jewellery product not found for update',
            })
        }

        res.json({
            success: true,
            message: 'Product updated successfully in database',
            data: updated,
        })
    } catch (error) {
        console.error('Update product error:', error)
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to update product',
        })
    }
}

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private / Admin
const deleteProduct = async (req, res) => {
    try {
        await ensureDbConnection()
        const paramId = req.params.id

        let filter = {}
        if (paramId.match(/^[0-9a-fA-F]{24}$/)) {
            filter = { _id: paramId }
        } else if (!isNaN(paramId)) {
            filter = { customId: Number(paramId) }
        } else {
            filter = { code: paramId.toUpperCase() }
        }

        const deleted = await Product.findOneAndDelete(filter)

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Product not found for deletion',
            })
        }

        res.json({
            success: true,
            message: 'Product removed from catalogue successfully',
        })
    } catch (error) {
        console.error('Delete product error:', error)
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to delete product',
        })
    }
}

// @desc    Get Admin Dashboard Stats from database
// @route   GET /api/admin/stats
// @access  Private / Admin
const getStats = async (req, res) => {
    try {
        const isConnected = await ensureDbConnection()
        if (!isConnected) {
            return res.json({
                success: true,
                data: {
                    totalProducts: 0,
                    categoryCounts: {},
                    karatCounts: { '22K': 0, '20K': 0, '18K': 0, '14K': 0 },
                    featuredCount: 0,
                    inStockCount: 0,
                    recentProducts: [],
                },
            })
        }
        const items = await Product.find({})
        const totalProducts = items.length

        const categoryCounts = {}
        const karatCounts = { '22K': 0, '20K': 0, '18K': 0, '14K': 0 }
        let featuredCount = 0
        let inStockCount = 0

        items.forEach((item) => {
            categoryCounts[item.category] =
                (categoryCounts[item.category] || 0) + 1

            const k = item.karat ? item.karat.replace('T', '') : '22K'
            if (karatCounts[k] !== undefined) {
                karatCounts[k]++
            } else {
                karatCounts[k] = 1
            }

            if (item.isFeatured) featuredCount++
            if (item.inStock !== false) inStockCount++
        })

        res.json({
            success: true,
            data: {
                totalProducts,
                categoryCounts,
                karatCounts,
                featuredCount,
                inStockCount,
                recentProducts: items.slice(0, 6),
            },
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to compute admin statistics',
            error: error.message,
        })
    }
}

export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getStats,
}

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getStats,
}
