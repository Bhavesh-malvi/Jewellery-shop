import mongoose from 'mongoose'

const specificationSchema = new mongoose.Schema(
    {
        goldPurity: {
            type: String,
            default: '22K (916 BIS Hallmark)',
        },
        grossWeight: {
            type: String,
            default: '5.200 gm (Approx.)',
        },
        netGoldWeight: {
            type: String,
            default: '5.000 gm',
        },
        diamondDetails: {
            type: String,
            default: '100% Solid Pure Gold Casting',
        },
        hallmarkCertification: {
            type: String,
            default: 'BIS 916 Hallmark with Unique Laser HUID Stamp',
        },
        metalColor: {
            type: String,
            default: 'Traditional Warm Yellow Gold',
        },
        sizeFit: {
            type: String,
            default: 'Standard Indian Sizes (Custom resizing available in showroom)',
        },
        makingTime: {
            type: String,
            default: 'Ready in stock at Narolgam Showroom',
        },
    },
    { _id: false }
)

const productSchema = new mongoose.Schema(
    {
        customId: {
            type: Number,
            index: true,
        },
        code: {
            type: String,
            required: [true, 'Please provide a unique product code (e.g. RJ-RNG-101)'],
            unique: true,
            uppercase: true,
            trim: true,
        },
        name: {
            type: String,
            required: [true, 'Please provide product name'],
            trim: true,
        },
        metal: {
            type: String,
            enum: ['Gold', 'Silver'],
            default: 'Gold',
            index: true,
        },
        category: {
            type: String,
            required: [true, 'Please select a category'],
            enum: [
                'Rings',
                'Earrings',
                'Necklaces',
                'Bracelets',
                'Bangles',
                'Pendants',
                'Chains',
                'Payal',
                'Bichhiya',
                'Pooja & Idols',
                'Utensils & Coins',
                'Kadas',
            ],
            trim: true,
        },
        karat: {
            type: String,
            required: [true, 'Please select purity / karat'],
            enum: ['22K', '20K', '18K', '14K', '925', '999', 'Traditional', 'N/A'],
            default: '22K',
        },
        availableKarats: {
            type: [String],
            default: ['18KT', '20KT', '22KT'],
        },
        purity: {
            type: String,
            default: '22K Hallmarked Gold',
        },
        tag: {
            type: String,
            default: 'Exclusive',
            trim: true,
        },
        shortDescription: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a product description'],
            trim: true,
        },
        specs: {
            type: String,
            default: 'BIS Hallmarked Gold',
            trim: true,
        },
        specifications: {
            type: specificationSchema,
            default: () => ({}),
        },
        highlights: {
            type: [String],
            default: [
                'Crafted with high purity BIS hallmarked gold.',
                'Comfort-fit finish suitable for daily & celebration wear.',
                'Laser HUID stamped with verifiable purity certification.',
            ],
        },
        img: {
            type: String,
            required: [true, 'Please provide primary image URL'],
            trim: true,
        },
        images: {
            type: [String],
            default: [],
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        inStock: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
)

// Auto ensure images array contains at least img
productSchema.pre('save', function () {
    if (!this.images || this.images.length === 0) {
        this.images = [this.img]
    }
    if (!this.shortDescription && this.description) {
        this.shortDescription =
            this.description.slice(0, 160) + (this.description.length > 160 ? '...' : '')
    }
})

const Product = mongoose.model('Product', productSchema)
export default Product
