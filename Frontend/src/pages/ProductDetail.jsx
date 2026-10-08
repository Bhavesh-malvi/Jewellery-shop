import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FaWhatsapp, FaArrowRight } from 'react-icons/fa6'
import {
    HiOutlineShieldCheck,
    HiOutlineTruck,
    HiOutlineSparkles,
} from 'react-icons/hi2'
import { BsBagPlus, BsBagCheck, BsPatchCheckFill } from 'react-icons/bs'
import { allProducts, getProductById } from '../data/productsData'
import { useEnquiry } from '../context/EnquiryContext'
import api from '../services/api'

// Comprehensive Karat Specifications & Purity Details (Only 22KT, 20KT, 18KT, 14KT - No 24KT jewellery)
const KARAT_PURITY_MAP = {
    '22KT': {
        karat: '22KT',
        purityPercentage: '91.6%',
        hallmarkStandard: 'BIS 916 Hallmark with Laser HUID',
        fineness: '916 / 1000 Fineness',
        composition: '91.6% Pure Solid Gold • 8.4% Precious Alloys',
        description:
            'The revered Indian standard for traditional jewellery, bridal necklaces, and bangles, striking the ideal balance of rich yellow luster and enduring durability.',
        suitableFor: 'Traditional Bridal Wear, Heavy Sets, Bangles & Daily Chains',
        hardness: 'Durable with Iconic Warm Indian Gold Glow',
        durability: 'High resistance to wear with lifetime polish guarantee',
    },
    '20KT': {
        karat: '20KT',
        purityPercentage: '83.3%',
        hallmarkStandard: 'BIS 833 Hallmark with Laser HUID',
        fineness: '833 / 1000 Fineness',
        composition: '83.3% Pure Gold • 16.7% Precious Alloys',
        description:
            '83.3% Pure Gold offering elevated structural hardness, subtle antique sheen, and exceptional security for stone and filigree work.',
        suitableFor: 'Antique Heritage Art, Daily Chains, Kada & Statement Rings',
        hardness: 'Enhanced Scratch & Deformation Resistance',
        durability: 'Ideal for everyday heirloom longevity',
    },
    '18KT': {
        karat: '18KT',
        purityPercentage: '75.0%',
        hallmarkStandard: 'BIS 750 Hallmark with Laser HUID',
        fineness: '750 / 1000 Fineness',
        composition: '75.0% Pure Gold • 25.0% Diamond-Setting Alloys',
        description:
            'The global benchmark for fine diamond and gemstone jewellery, providing superior prong strength to securely lock precious diamonds with brilliant luster.',
        suitableFor: 'Solitaire Rings, Diamond Necklaces, Modern Pendants & Office Wear',
        hardness: 'High Strength & Superior Prong Retention',
        durability: 'Engineered for everyday diamond safety and brilliance',
    },
    '14KT': {
        karat: '14KT',
        purityPercentage: '58.5%',
        hallmarkStandard: 'BIS 585 Hallmark with Laser HUID',
        fineness: '585 / 1000 Fineness',
        composition: '58.5% Pure Gold • 41.5% Strengthened Alloys',
        description:
            'Modern lightweight formulation engineered for maximum scratch resistance and daily active lifestyle durability without bending.',
        suitableFor: 'Minimalist Daily Wear, Contemporary Bands & Stackable Jewellery',
        hardness: 'Maximum Durability & Dent Resistance',
        durability: 'Perfect for active 24/7 lifestyle',
    },
}

const SILVER_PURITY_MAP = {
    '925': {
        karat: '925',
        purityPercentage: '92.5%',
        hallmarkStandard: 'BIS 925 Hallmark Sterling Silver',
        fineness: '925 / 1000 Fineness',
        composition: '92.5% Pure Solid Silver • 7.5% Strengthened Copper Alloys',
        description:
            'The international and Indian benchmark for fine sterling silver jewellery, anti-tarnish payals, rings, and designer silver chains.',
        suitableFor: 'Payal, Bichhiya, Designer Chains, Bracelets & Rings',
        hardness: 'Tough & Tarnish Resistant Sterling Alloy',
        durability: 'Engineered for enduring shine and daily comfort',
    },
    '999': {
        karat: '999',
        purityPercentage: '99.9%',
        hallmarkStandard: 'BIS 999 Fine Pure Silver',
        fineness: '999 / 1000 Fineness',
        composition: '99.9% Pure Solid Sacred Silver',
        description:
            'Highest purity devotional silver, revered for auspicious Laxmi-Ganesh coins, pooja thalis, temple idols, and divine utensils.',
        suitableFor: 'Pooja Idols, Silver Coins, Kalash, Devotional Utensils & Gifts',
        hardness: 'Ultra-Pure Soft Devotional Luster',
        durability: 'Sacred heirloom purity with divine white radiance',
    },
    'Traditional': {
        karat: 'Traditional',
        purityPercentage: '80.0%+',
        hallmarkStandard: 'Traditional Heritage Silver Craft',
        fineness: '800+ / 1000 Fineness',
        composition: 'Traditional Silver Craftsmanship with Artisan Patina',
        description:
            'Heirloom tribal, antique, and traditional Rajasthani/Gujarati handcrafted silver ornaments.',
        suitableFor: 'Traditional Payal, Heavy Kadas, Tribal Ornaments',
        hardness: 'Robust Traditional Craft Weight',
        durability: 'Time-tested artisan resilience',
    },
}

const ProductDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const {
        addToEnquiry,
        removeFromEnquiry,
        isInEnquiry,
        whatsappNumber,
    } = useEnquiry()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        const fetchProductFromApi = async () => {
            try {
                setLoading(true)
                const res = await api.get(`/products/${id}`)
                if (res.data?.success && res.data.data) {
                    setProduct(res.data.data)
                    setNotFound(false)
                } else {
                    setNotFound(true)
                }
            } catch (err) {
                console.error('Error fetching product:', err)
                setNotFound(true)
            } finally {
                setLoading(false)
            }
        }
        fetchProductFromApi()
    }, [id])

    // Load related products from database
    useEffect(() => {
        const loadRelated = async () => {
            try {
                const res = await api.get('/products')
                if (res.data?.success && Array.isArray(res.data.data)) {
                    const others = res.data.data
                        .filter((item) => (item._id || item.customId || item.id) !== id)
                        .slice(0, 4)
                    setRelatedProducts(others)
                }
            } catch (e) {
                // Ignore
            }
        }
        loadRelated()
    }, [id])

    // State for gallery images
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    const isSilver = product?.metal === 'Silver'

    // State for Karat / Purity selection
    const defaultSilverKarats = ['925', '999', 'Traditional']
    const defaultGoldKarats = ['14KT', '18KT', '20KT', '22KT']

    const rawKarats =
        product?.availableKarats && product.availableKarats.length > 0
            ? product.availableKarats
            : (isSilver ? defaultSilverKarats : defaultGoldKarats)

    const availableKarats = isSilver
        ? rawKarats
        : rawKarats.filter((kt) => kt !== '24KT' && kt !== '24K')

    const getInitialKarat = () => {
        if (!product) return isSilver ? '925' : '22KT'
        if (isSilver) {
            return product.karat || '925'
        }
        return availableKarats.includes(`${product.karat}T`)
            ? `${product.karat}T`
            : availableKarats[0] || '22KT'
    }

    const [selectedKarat, setSelectedKarat] = useState(getInitialKarat)

    // Active bottom tab
    const [activeTab, setActiveTab] = useState('description')

    // Scroll to top on id change
    useEffect(() => {
        window.scrollTo(0, 0)
        setSelectedImageIndex(0)
        if (product) {
            if (product.metal === 'Silver') {
                setSelectedKarat(product.karat || '925')
            } else {
                const defKarat = availableKarats.includes(`${product.karat}T`)
                    ? `${product.karat}T`
                    : availableKarats[0] || '22KT'
                setSelectedKarat(defKarat)
            }
        }
        setActiveTab('description')
    }, [id, product])

    if (loading) {
        return (
            <div className="min-h-[75vh] flex flex-col items-center justify-center bg-[#FCFBF8]">
                <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-xs uppercase tracking-widest text-[#304037] font-semibold">
                    Loading Jewellery Details...
                </p>
            </div>
        )
    }

    if (!product || notFound) {
        return (
            <div className="min-h-[75vh] flex flex-col items-center justify-center bg-[#FCFBF8] text-center px-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] text-2xl mx-auto mb-4">
                    💍
                </div>
                <h2 className="text-2xl sm:text-3xl font-playfair text-[#304037] mb-2">
                    Jewellery Piece Not Found
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 max-w-md mb-6">
                    This design may have been updated or removed from the showroom catalogue.
                </p>
                <div className="flex gap-3">
                    <Link
                        to="/catalogue"
                        className="px-6 py-2.5 rounded-xl bg-[#304037] text-white text-xs uppercase tracking-wider font-semibold"
                    >
                        Browse Catalogue
                    </Link>
                    <Link
                        to="/contact"
                        className="px-6 py-2.5 rounded-xl border border-[#d4af37] text-[#304037] text-xs uppercase tracking-wider font-semibold"
                    >
                        Visit Showroom
                    </Link>
                </div>
            </div>
        )
    }

    // Active purity / karat details
    const activeKaratDetails = isSilver
        ? (SILVER_PURITY_MAP[selectedKarat] || SILVER_PURITY_MAP[product?.karat] || SILVER_PURITY_MAP['925'])
        : (KARAT_PURITY_MAP[selectedKarat] || KARAT_PURITY_MAP['22KT'])

    // Direct WhatsApp enquiry handler with selected karat / purity
    const handleWhatsAppEnquiry = () => {
        const karatInfo = activeKaratDetails
        const message = `*Rangoli Jewellers - Product Enquiry*

Namaste! I am interested in inquiring about this design from your showroom:

• *Design:* ${product.name}
• *Product Code:* ${product.code}
• *Precious Metal:* ${isSilver ? 'Silver Collection (925 / 999)' : 'Gold Collection (BIS Hallmarked)'}
• *Category:* ${product.category}
• *Selected ${isSilver ? 'Silver Purity' : 'Gold Karat'}:* ${selectedKarat} (${karatInfo.purityPercentage} Pure • ${karatInfo.hallmarkStandard})
• *Net ${isSilver ? 'Silver' : 'Gold'} Weight:* ${product.specifications?.netSilverWeight || product.specifications?.netGoldWeight || product.specs || 'Standard'}
• *Gross Weight:* ${product.specifications?.grossWeight || 'Approximate'}

Kindly share today's live rate quote, custom sizing options, and showroom availability. Thank you!`

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
    }

    const productId = product._id || product.customId || product.id
    const inBag = isInEnquiry(productId)

    // Gallery images (strictly real photos without dummy fallbacks)
    const rawImages = Array.isArray(product.images) && product.images.length > 0
        ? product.images
        : [product.img].filter(Boolean)

    const galleryImages = rawImages.length > 0 ? rawImages : [product.img]

    return (
        <div className="bg-[#FCFBF8] text-[#304037] min-h-screen pt-24 pb-20 font-roboto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 1. Breadcrumbs */}
                <nav
                    aria-label="Breadcrumb"
                    className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-gray-500 py-4 mb-4 font-roboto"
                >
                    <Link
                        to="/"
                        className="hover:text-[#304037] transition-colors"
                    >
                        Home
                    </Link>
                    <span className="text-gray-300">→</span>
                    <Link
                        to={isSilver ? '/catalogue?metal=silver' : '/catalogue?metal=gold'}
                        className="hover:text-[#304037] transition-colors"
                    >
                        {isSilver ? 'Silver Collection' : 'Jewellery'}
                    </Link>
                    <span className="text-gray-300">→</span>
                    <Link
                        to={isSilver ? `/catalogue?metal=silver&category=${encodeURIComponent(product.category)}` : `/catalogue?category=${encodeURIComponent(product.category)}`}
                        className="hover:text-[#304037] transition-colors"
                    >
                        {product.category}
                    </Link>
                    <span className="text-gray-300">→</span>
                    <span className="text-gray-800 font-medium truncate max-w-xs sm:max-w-md">
                        {product.name}
                    </span>
                </nav>

                {/* 2. Main Product Section (2-Column: Gallery on left, Info on right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
                    {/* LEFT COLUMN: Gallery with 3 stacked thumbnails on left + large main image on right */}
                    <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 sm:gap-5">
                        {/* 3 Stacked Thumbnails */}
                        <div className="flex sm:flex-col gap-3 sm:gap-4 shrink-0 justify-center sm:justify-start">
                            {galleryImages.slice(0, 3).map((imgUrl, index) => {
                                const isSelected = selectedImageIndex === index
                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setSelectedImageIndex(index)}
                                        aria-label={`View photo ${index + 1}`}
                                        className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-[#F7F4EE] p-2 flex items-center justify-center border-2 transition-all duration-300 cursor-pointer ${
                                            isSelected
                                                ? isSilver
                                                    ? 'border-slate-700 shadow-md scale-102 ring-1 ring-slate-400'
                                                    : 'border-[#304037] shadow-md scale-102 ring-1 ring-[#304037]/20'
                                                : 'border-transparent hover:border-gray-300 opacity-75 hover:opacity-100'
                                        }`}
                                    >
                                        <img
                                            src={imgUrl || product.img || product.images?.[0] || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80'}
                                            alt={`${product.name} thumbnail ${index + 1}`}
                                            onError={(e) => {
                                                e.currentTarget.onerror = null
                                                e.currentTarget.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80'
                                            }}
                                            className="w-full h-full object-contain"
                                        />
                                    </button>
                                )
                            })}
                        </div>

                        {/* Large Main Interactive Image Card */}
                        <div className="flex-1 bg-[#F9F7F3] rounded-2xl border border-[#EDE8E0] p-6 sm:p-10 flex items-center justify-center relative min-h-[380px] sm:min-h-[480px] md:min-h-[520px] overflow-hidden group shadow-sm">
                            <img
                                src={galleryImages[selectedImageIndex] || product.img || product.images?.[0] || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80'}
                                alt={product.name}
                                onError={(e) => {
                                    e.currentTarget.onerror = null
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80'
                                }}
                                className="w-full h-full max-h-[440px] object-contain transition-transform duration-700 group-hover:scale-108 drop-shadow-md select-none"
                            />

                            {/* Hallmark Overlay Tag */}
                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#d4af37]/40 shadow-sm flex items-center gap-1.5">
                                <BsPatchCheckFill className={isSilver ? "text-slate-600 text-xs" : "text-[#d4af37] text-xs"} />
                                <span className="text-[11px] font-roboto font-semibold text-[#304037] tracking-wider uppercase">
                                    {isSilver ? `${selectedKarat || '925'} BIS Hallmarked Silver` : 'BIS Hallmarked'}
                                </span>
                            </div>

                            {/* Tag */}
                            {product.tag && (
                                <div className="absolute top-4 right-4 bg-[#304037] text-white px-3 py-1 rounded-full text-[10px] font-roboto font-medium uppercase tracking-wider shadow-sm">
                                    {product.tag}
                                </div>
                            )}

                            {/* Subtle zoom indicator on hover */}
                            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-gray-500 text-[11px] px-2.5 py-1 rounded-lg border border-gray-200 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {isSilver ? '100% Solid Sterling Silver' : '100% Solid Gold Details'}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Product Information & Interactive Options */}
                    <div className="lg:col-span-5 flex flex-col space-y-6">
                        {/* Title & Category */}
                        <div>
                            <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-[#304037] font-normal tracking-tight leading-tight">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`text-xs uppercase tracking-widest font-semibold ${isSilver ? 'text-slate-600' : 'text-[#d4af37]'}`}>
                                    {product.category}
                                </span>
                                <span className="text-gray-300">•</span>
                                <span className="text-xs text-gray-400 font-mono">
                                    Code: {product.code}
                                </span>
                            </div>
                        </div>

                        {/* Short Description */}
                        <p className="text-sm text-gray-600 font-roboto leading-relaxed font-light">
                            {product.shortDescription || product.description}
                        </p>

                        {/* Hallmark & Live Gold/Silver Quotation Badge (Replaces price) */}
                        <div className="bg-[#FAF7F2] border border-[#d4af37]/35 rounded-xl p-4 flex items-center justify-between">
                            <div>
                                <span className={`text-[11px] uppercase tracking-wider font-bold font-roboto ${isSilver ? 'text-slate-700' : 'text-[#d4af37]'}`}>
                                    {isSilver ? 'Live Silver Rate Valuation' : 'Live Gold Rate Valuation'}
                                </span>
                                <p className="text-sm font-playfair text-[#304037] font-medium mt-0.5">
                                    {isSilver ? 'Custom Quote on Live Market Silver Rate' : 'Custom Quote on Live Market Gold Rate'}
                                </p>
                                <p className="text-[11px] text-gray-500 font-roboto mt-0.5">
                                    Inclusive of standard hallmarking • 100% transparent billing
                                </p>
                            </div>
                            <div className="text-right shrink-0 ml-3">
                                <span className="inline-block bg-[#304037] text-[#d4af37] text-[11px] font-mono font-bold px-3 py-1.5 rounded-lg shadow-sm">
                                    {isSilver ? 'BIS 925 / 999' : 'BIS 916 / 750'}
                                </span>
                            </div>
                        </div>

                        {/* CARAT / PURITY SELECTOR SECTION */}
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-800 font-roboto">
                                    {isSilver ? 'Silver Purity Standard' : 'Carat'}
                                </label>
                                <span className={`text-xs font-medium font-roboto ${isSilver ? 'text-slate-700' : 'text-[#d4af37]'}`}>
                                    Selected: {selectedKarat} ({activeKaratDetails.purityPercentage} {isSilver ? 'Silver' : 'Gold'})
                                </span>
                            </div>

                            {/* Karat / Purity Button Pills */}
                            <div className="flex flex-wrap items-center gap-2.5">
                                {availableKarats.map((kt) => {
                                    const isSelected = selectedKarat === kt
                                    return (
                                        <button
                                            key={kt}
                                            type="button"
                                            onClick={() => setSelectedKarat(kt)}
                                            className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                                                isSelected
                                                    ? isSilver
                                                        ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                                                        : 'bg-[#304037] text-white shadow-sm border border-[#304037]'
                                                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#304037] hover:text-[#304037]'
                                            }`}
                                        >
                                            {kt}
                                        </button>
                                    )
                                })}
                            </div>

                            {/* DYNAMIC PURITY & SPECIFICATIONS CARD FOR SELECTED CARAT / STANDARD */}
                            <div className="mt-3 bg-gradient-to-br from-[#FDFBF7] to-[#F5EFE6] border border-[#d4af37]/30 rounded-xl p-4 space-y-2.5 shadow-xs">
                                <div className="flex items-center justify-between border-b border-[#EDE3D0] pb-2">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full animate-pulse ${isSilver ? 'bg-slate-600' : 'bg-[#d4af37]'}`}></span>
                                        <span className="text-xs font-bold text-[#304037] uppercase tracking-wide">
                                            {selectedKarat} {isSilver ? 'Silver' : 'Gold'} Purity Details
                                        </span>
                                    </div>
                                    <span className="text-xs font-mono font-bold text-[#304037] bg-white px-2 py-0.5 rounded border border-[#d4af37]/30">
                                        {activeKaratDetails.purityPercentage} Pure
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <span className="text-gray-500 text-[11px] block">
                                            Hallmark Standard:
                                        </span>
                                        <span className="font-medium text-gray-800">
                                            {activeKaratDetails.hallmarkStandard}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-[11px] block">
                                            Fineness Grade:
                                        </span>
                                        <span className="font-medium text-gray-800 font-mono">
                                            {activeKaratDetails.fineness}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-[11px] block">
                                            {isSilver ? 'Net Silver Weight:' : 'Net Gold Weight:'}
                                        </span>
                                        <span className="font-medium text-gray-800">
                                            {product.specifications?.netSilverWeight || product.specifications?.netGoldWeight || product.specs || 'Standard Weight'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-[11px] block">
                                            Approx. Gross Weight:
                                        </span>
                                        <span className="font-medium text-gray-800">
                                            {product.specifications?.grossWeight || 'Standard'}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-[11px] text-gray-600 leading-normal pt-1 border-t border-[#EDE3D0]">
                                    {activeKaratDetails.description}
                                </p>
                            </div>
                        </div>

                        {/* ACTION BUTTONS (Only Add to Enquiry Bag & WhatsApp Enquiry) */}
                        <div className="space-y-3 pt-2">
                            {/* Add to Enquiry Bag Button */}
                            <button
                                type="button"
                                onClick={() => {
                                    if (inBag) {
                                        removeFromEnquiry(product.id)
                                    } else {
                                        addToEnquiry(product)
                                    }
                                }}
                                className={`w-full py-3.5 px-5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-sm ${
                                    inBag
                                        ? 'bg-[#222e27] text-[#d4af37] border border-[#d4af37]'
                                        : 'bg-[#304037] hover:bg-[#233029] text-white border border-[#304037] hover:border-[#d4af37]'
                                }`}
                            >
                                {inBag ? (
                                    <>
                                        <BsBagCheck className="text-base text-[#d4af37]" />
                                        <span>Added to Enquiry Bag</span>
                                    </>
                                ) : (
                                    <>
                                        <BsBagPlus className="text-base text-[#d4af37]" />
                                        <span>Add to Enquiry Bag</span>
                                    </>
                                )}
                            </button>

                            {/* Direct WhatsApp Enquiry Button */}
                            <button
                                type="button"
                                onClick={handleWhatsAppEnquiry}
                                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7a6e] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                            >
                                <FaWhatsapp className="text-lg" />
                                <span>Enquire on WhatsApp ({selectedKarat} {isSilver ? 'Silver' : 'Gold'})</span>
                            </button>
                        </div>

                        {/* 3 VALUE PERKS (matching Screenshot 1) */}
                        <div className="pt-6 border-t border-gray-100 space-y-3.5">
                            <div className="flex items-center gap-3 text-xs text-gray-600">
                                <div className="w-8 h-8 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#304037] shrink-0">
                                    <HiOutlineTruck className="text-base" />
                                </div>
                                <span>Free Shipping & Showroom Trial</span>
                            </div>

                            <div className="flex items-center gap-3 text-xs text-gray-600">
                                <div className="w-8 h-8 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#304037] shrink-0">
                                    <HiOutlineShieldCheck className="text-base" />
                                </div>
                                <span>Flexible and Secure Payment, Pay on Delivery</span>
                            </div>

                            <div className="flex items-center gap-3 text-xs text-gray-600">
                                <div className="w-8 h-8 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#304037] shrink-0">
                                    <HiOutlineSparkles className="text-base" />
                                </div>
                                <span>600,000+ Happy Customers & BIS Hallmarked Trust</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. TABS SECTION (matching Screenshot 2) */}
                <div className="mb-20">
                    {/* Tab Navigation */}
                    <div className="flex items-center gap-8 border-b border-gray-200">
                        <button
                            type="button"
                            onClick={() => setActiveTab('description')}
                            className={`pb-4 text-sm sm:text-base font-playfair transition-all duration-200 cursor-pointer relative ${
                                activeTab === 'description'
                                    ? 'text-[#304037] font-semibold border-b-2 border-[#304037]'
                                    : 'text-gray-400 hover:text-gray-700'
                            }`}
                        >
                            Product Description
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('specifications')}
                            className={`pb-4 text-sm sm:text-base font-playfair transition-all duration-200 cursor-pointer relative ${
                                activeTab === 'specifications'
                                    ? 'text-[#304037] font-semibold border-b-2 border-[#304037]'
                                    : 'text-gray-400 hover:text-gray-700'
                            }`}
                        >
                            Additional Information
                        </button>
                    </div>

                    {/* Tab 1: Product Description */}
                    {activeTab === 'description' && (
                        <div className="pt-8 space-y-5 max-w-4xl">
                            <p className="text-sm text-gray-600 font-roboto leading-relaxed">
                                {product.description}
                            </p>
                            <p className="text-sm text-gray-600 font-roboto leading-relaxed">
                                Its smooth finish and elegant silhouette create a subtle yet captivating shine that enhances your overall look without being overpowering. Whether worn alone for a minimalist style or paired with other jewelry for a layered fashion statement, it always stands out effortlessly. Made with high-quality, skin-friendly materials, it ensures lasting durability, comfort, and resistance to tarnish. It is lightweight, easy to wear throughout the day, and designed to maintain its brilliance over time.
                            </p>

                            {/* Bullet points matching Screenshot 2 */}
                            <ul className="space-y-3 pt-2 text-sm text-gray-600 font-roboto">
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#304037] text-lg leading-none mt-0.5">•</span>
                                    <span>
                                        Crafted with a clean, refined look that represents simplicity and luxury together, making it suitable for both modern and traditional styles.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#304037] text-lg leading-none mt-0.5">•</span>
                                    <span>
                                        Ideal for daily wear, office use, parties, weddings, engagements, and special celebrations, making it a versatile jewelry piece.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#304037] text-lg leading-none mt-0.5">•</span>
                                    <span>
                                        Designed with a smooth inner finish and lightweight structure so you can wear it comfortably throughout the day without irritation.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#304037] text-lg leading-none mt-0.5">•</span>
                                    <span>
                                        {isSilver
                                            ? 'Govt. Approved BIS Hallmarked Silver with official 925 / 999 stamp assuring genuine sterling purity.'
                                            : 'Govt. Approved BIS Hallmarked with unique verifiable Laser HUID stamp assuring 100% genuine gold purity.'}
                                    </span>
                                </li>
                            </ul>

                            {/* Centered navigation dots matching Screenshot 2 */}
                            <div className="flex justify-center items-center gap-2 pt-6">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#304037]"></span>
                                <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                            </div>
                        </div>
                    )}

                    {/* Tab 2: Additional Information (Specifications table) */}
                    {activeTab === 'specifications' && (
                        <div className="pt-8 max-w-4xl">
                            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                                <table className="w-full text-left text-xs sm:text-sm font-roboto">
                                    <tbody className="divide-y divide-gray-100">
                                        <tr className="bg-[#FAF7F2]">
                                            <td className="py-3.5 px-5 font-semibold text-[#304037] w-1/3">
                                                Selected {isSilver ? 'Silver Purity' : 'Gold Karat'}
                                            </td>
                                            <td className="py-3.5 px-5 text-gray-700 font-mono font-bold">
                                                {selectedKarat} ({activeKaratDetails.purityPercentage} {isSilver ? 'Silver' : 'Gold'})
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-5 font-semibold text-[#304037]">
                                                Hallmark Certification
                                            </td>
                                            <td className="py-3.5 px-5 text-gray-700">
                                                {product.specifications?.hallmarkCertification ||
                                                    activeKaratDetails.hallmarkStandard}
                                            </td>
                                        </tr>
                                        <tr className="bg-[#FAF7F2]">
                                            <td className="py-3.5 px-5 font-semibold text-[#304037]">
                                                {isSilver ? 'Net Silver Weight' : 'Net Gold Weight'}
                                            </td>
                                            <td className="py-3.5 px-5 text-gray-700 font-mono">
                                                {product.specifications?.netSilverWeight || product.specifications?.netGoldWeight || product.specs || 'Standard Weight'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-5 font-semibold text-[#304037]">
                                                Approx. Gross Weight
                                            </td>
                                            <td className="py-3.5 px-5 text-gray-700 font-mono">
                                                {product.specifications?.grossWeight || 'Standard'}
                                            </td>
                                        </tr>
                                        <tr className="bg-[#FAF7F2]">
                                            <td className="py-3.5 px-5 font-semibold text-[#304037]">
                                                Diamond / Stone Details
                                            </td>
                                            <td className="py-3.5 px-5 text-gray-700">
                                                {product.specifications?.diamondDetails ||
                                                    '100% Solid Pure Gold Casting'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-5 font-semibold text-[#304037]">
                                                Metal Color / Tone
                                            </td>
                                            <td className="py-3.5 px-5 text-gray-700">
                                                {product.specifications?.metalColor ||
                                                    'Warm Yellow Gold / Rose Gold'}
                                            </td>
                                        </tr>
                                        <tr className="bg-[#FAF7F2]">
                                            <td className="py-3.5 px-5 font-semibold text-[#304037]">
                                                Sizing & Custom Fit
                                            </td>
                                            <td className="py-3.5 px-5 text-gray-700">
                                                {product.specifications?.sizeFit ||
                                                    'Standard Indian Sizes (Custom resizing available in showroom)'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-5 font-semibold text-[#304037]">
                                                Showroom Availability
                                            </td>
                                            <td className="py-3.5 px-5 text-gray-700">
                                                {product.specifications?.makingTime ||
                                                    'Ready in stock at Narolgam Showroom'}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* 4. FEATURED PRODUCTS SECTION */}
                {relatedProducts.length > 0 && (
                    <div className="pt-10 border-t border-gray-200">
                        <div className="text-center mb-10">
                            {/* Pill badge matching Screenshot 2 */}
                            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full border border-gray-300 bg-white text-[11px] font-roboto font-semibold tracking-wider uppercase text-gray-700 mb-3 shadow-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#304037]"></span>
                                <span>Featured Products</span>
                            </div>

                            {/* Title matching Screenshot 2 */}
                            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-[#304037] font-normal tracking-tight">
                                Explore Our Signature Jewellery Pieces
                            </h2>
                        </div>

                        {/* 4 Product Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((item) => {
                                const rId = item._id || item.customId || item.id
                                return (
                                    <div
                                        key={rId}
                                        className="group bg-white rounded-2xl overflow-hidden border border-[#EDE8E0] hover:border-[#d4af37]/60 hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                                    >
                                        {/* Image */}
                                        <Link
                                            to={`/product/${rId}`}
                                            className="relative h-60 sm:h-64 w-full overflow-hidden bg-[#F9F7F3] flex items-center justify-center p-6 block"
                                        >
                                            <img
                                                src={item.img || item.images?.[0] || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80'}
                                                alt={item.name}
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null
                                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80'
                                                }}
                                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-sm"
                                            />
                                            <span className="absolute bottom-3 left-3 bg-white/95 text-primary text-[10px] font-bold font-mono px-2 py-0.5 rounded border border-[#d4af37]/40 shadow-xs">
                                                {item.karat} Gold
                                            </span>
                                        </Link>

                                        {/* Content */}
                                        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="uppercase tracking-widest text-[#d4af37] font-semibold text-[10px]">
                                                        {item.category}
                                                    </span>
                                                    <span className="text-gray-400 font-mono text-[10px]">
                                                        {item.code}
                                                    </span>
                                                </div>
                                                <Link
                                                    to={`/product/${rId}`}
                                                    className="block font-playfair text-base text-[#304037] font-normal group-hover:text-[#d4af37] transition-colors line-clamp-1"
                                                >
                                                    {item.name}
                                                </Link>
                                                <p className="text-xs text-gray-500 font-roboto font-light line-clamp-1">
                                                    {item.specs}
                                                </p>
                                            </div>

                                            <Link
                                                to={`/product/${rId}`}
                                                className="w-full py-2.5 px-3 rounded-xl bg-[#304037] hover:bg-[#233029] text-white text-xs font-roboto font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200"
                                            >
                                                <span>View Details</span>
                                                <FaArrowRight className="text-[10px] text-[#d4af37]" />
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDetail
