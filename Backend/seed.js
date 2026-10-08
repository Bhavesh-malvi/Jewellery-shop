import 'dotenv/config'
import mongoose from 'mongoose'
import User from './models/User.js'
import Product from './models/Product.js'
import { allProducts } from './data/initialProducts.js'

const seedData = async () => {
    try {
        console.log('🌱 Connecting to MongoDB to seed database...')
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jewellery_shop')
        console.log('✅ Connected to MongoDB!')

        // 1. Clear existing
        console.log('🧹 Clearing existing collections...')
        await User.deleteMany({})
        await Product.deleteMany({})

        // 2. Seed Admin User
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@rangoli.com'
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

        console.log(`👤 Creating Default Admin User: ${adminEmail}`)
        const admin = await User.create({
            name: 'Rangoli Admin',
            email: adminEmail,
            password: adminPassword,
            role: 'admin',
        })
        console.log(`✅ Admin created with ID: ${admin._id}`)

        // 3. Seed Products
        console.log(`💎 Seeding ${allProducts.length} jewellery products...`)
        const formattedProducts = allProducts.map((p) => {
            const valid = ['14KT', '18KT', '20KT', '22KT']
            const cleanKarats = (p.availableKarats || ['18KT', '20KT', '22KT']).filter((k) =>
                valid.includes(k)
            )

            return {
                customId: p.id,
                code: p.code,
                name: p.name,
                category: p.category,
                karat: (p.karat || '22K').replace('T', ''),
                availableKarats: cleanKarats,
                purity: p.purity || `${p.karat} Hallmarked Gold`,
                tag: p.tag || 'Exclusive',
                shortDescription: p.shortDescription || p.description?.slice(0, 160) + '...',
                description: p.description || p.shortDescription || 'Crafted with hallmarked gold.',
                specs: p.specs || 'BIS Hallmarked Gold',
                specifications: p.specifications || {},
                highlights: p.highlights || [],
                img: p.img,
                images: p.images || [p.img],
                isFeatured: p.id <= 4,
                inStock: true,
            }
        })

        await Product.insertMany(formattedProducts)
        console.log(`✅ Successfully seeded ${formattedProducts.length} products!`)

        console.log('\n=============================================')
        console.log('🎉 Seed completed successfully!')
        console.log(`🔐 Admin Login:`)
        console.log(`   Email:    ${adminEmail}`)
        console.log(`   Password: ${adminPassword}`)
        console.log('=============================================\n')

        process.exit(0)
    } catch (error) {
        console.error('❌ Error seeding data:', error.message)
        process.exit(1)
    }
}

seedData()
