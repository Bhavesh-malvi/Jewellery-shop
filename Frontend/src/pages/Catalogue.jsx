import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { GoDotFill } from 'react-icons/go'
import { FaWhatsapp, FaRegHeart, FaHeart, FaMagnifyingGlass } from 'react-icons/fa6'
import { BsBagPlus, BsBagCheck } from 'react-icons/bs'
import { IoCloseOutline } from 'react-icons/io5'
import { useEnquiry } from '../context/EnquiryContext'
import api from '../services/api'

const categories = ['All', 'Rings', 'Earrings', 'Necklaces', 'Bracelets', 'Bangles', 'Pendants', 'Chains']

const karats = [
    {
        id: 'All',
        label: 'All Karats',
        hallmark: 'All Purity',
        desc: 'Browse entire collection',
    },
    {
        id: '22K',
        label: '22K Gold',
        hallmark: 'BIS 916',
        desc: '91.6% Pure • Bridal & Royal Heritage',
    },
    {
        id: '20K',
        label: '20K Gold',
        hallmark: 'BIS 833',
        desc: '83.3% Pure • Traditional & Antique Art',
    },
    {
        id: '18K',
        label: '18K Gold',
        hallmark: 'BIS 750',
        desc: '75.0% Fine • Diamond Solitaires & Modern',
    },
]

const normalizeCategory = (catName) => {
    if (!catName) return 'All'
    const clean = catName.trim().toLowerCase()
    if (clean === 'all') return 'All'

    const matched = categories.find((c) => {
        if (c === 'All') return false
        const cLower = c.toLowerCase()
        return (
            cLower === clean ||
            cLower === `${clean}s` ||
            clean === `${cLower}s` ||
            cLower.replace(/s$/, '') === clean.replace(/s$/, '')
        )
    })
    return matched || 'All'
}

const normalizeKarat = (karatVal) => {
    if (!karatVal) return 'All'
    const clean = karatVal.trim().toUpperCase()
    if (clean === 'ALL') return 'All'
    if (clean.includes('22')) return '22K'
    if (clean.includes('20')) return '20K'
    if (clean.includes('18')) return '18K'
    return 'All'
}

const Catalogue = () => {
    const {
        addToEnquiry,
        removeFromEnquiry,
        isInEnquiry,
        sendSingleEnquiry,
        whatsappNumber,
    } = useEnquiry()

    const [searchParams, setSearchParams] = useSearchParams()
    const categoryParam = searchParams.get('category')
    const searchParam = searchParams.get('search')
    const karatParam = searchParams.get('karat') || searchParams.get('purity')

    const [selectedCategory, setSelectedCategory] = useState(() => normalizeCategory(categoryParam))
    const [selectedKarat, setSelectedKarat] = useState(() => normalizeKarat(karatParam))
    const [searchQuery, setSearchQuery] = useState(() => searchParam || '')
    const [wishlist, setWishlist] = useState([])

    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(normalizeCategory(categoryParam))
        } else {
            setSelectedCategory('All')
        }
    }, [categoryParam])

    useEffect(() => {
        if (karatParam) {
            setSelectedKarat(normalizeKarat(karatParam))
        } else {
            setSelectedKarat('All')
        }
    }, [karatParam])

    useEffect(() => {
        if (searchParam !== null && searchParam !== undefined) {
            setSearchQuery(searchParam)
        }
    }, [searchParam])

    const toggleWishlist = (id) => {
        setWishlist((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
    }

    const handleCategorySelect = (cat) => {
        setSelectedCategory(cat)
        const nextParams = new URLSearchParams(searchParams)
        if (cat === 'All') {
            nextParams.delete('category')
        } else {
            nextParams.set('category', cat)
        }
        setSearchParams(nextParams, { replace: true })
    }

    const handleKaratSelect = (k) => {
        setSelectedKarat(k)
        const nextParams = new URLSearchParams(searchParams)
        if (k === 'All') {
            nextParams.delete('karat')
            nextParams.delete('purity')
        } else {
            nextParams.set('karat', k.toLowerCase())
            nextParams.delete('purity')
        }
        setSearchParams(nextParams, { replace: true })
    }

    const handleResetFilters = () => {
        setSelectedCategory('All')
        setSelectedKarat('All')
        setSearchQuery('')
        const nextParams = new URLSearchParams(searchParams)
        nextParams.delete('category')
        nextParams.delete('karat')
        nextParams.delete('purity')
        nextParams.delete('search')
        setSearchParams(nextParams, { replace: true })
    }

    const handleSearchChange = (val) => {
        setSearchQuery(val)
        const nextParams = new URLSearchParams(searchParams)
        if (val.trim()) {
            nextParams.set('search', val)
        } else {
            nextParams.delete('search')
        }
        setSearchParams(nextParams, { replace: true })
    }

    const [dbProducts, setDbProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true)
                const res = await api.get('/products')
                if (res.data?.success && Array.isArray(res.data.data)) {
                    setDbProducts(res.data.data)
                }
            } catch (err) {
                console.error('Failed to load products from database:', err)
            } finally {
                setLoading(false)
            }
        }
        loadProducts()
    }, [])

    const currentCatalog = dbProducts

    const filteredDesigns = currentCatalog.filter((item) => {
        const matchesCategory =
            selectedCategory === 'All' ||
            item.category.toLowerCase() === selectedCategory.toLowerCase() ||
            item.category.toLowerCase().replace(/s$/, '') === selectedCategory.toLowerCase().replace(/s$/, '')

        const matchesKarat =
            selectedKarat === 'All' ||
            item.karat === selectedKarat ||
            (item.purity && item.purity.toLowerCase().includes(selectedKarat.toLowerCase())) ||
            (item.specs && item.specs.toLowerCase().includes(selectedKarat.toLowerCase()))

        const searchLower = searchQuery.toLowerCase().trim()
        const matchesSearch =
            !searchLower ||
            item.name.toLowerCase().includes(searchLower) ||
            item.code.toLowerCase().includes(searchLower) ||
            item.specs.toLowerCase().includes(searchLower) ||
            item.category.toLowerCase().includes(searchLower) ||
            (item.karat && item.karat.toLowerCase().includes(searchLower))

        return matchesCategory && matchesKarat && matchesSearch
    })

    return (
        <div className="w-full bg-[#FAFAF8] min-h-screen">
            {/* Catalogue Hero Banner */}
            <div className="bg-[#304037] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#3e5247] relative overflow-hidden">
                <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
                    <div className="inline-flex items-center gap-1.5 border border-[#d4af37]/40 px-4 py-1 rounded-full text-xs font-roboto uppercase tracking-widest text-[#f3e5ab] bg-[#24312a]/60 backdrop-blur-sm">
                        <GoDotFill className="text-xs text-[#d4af37]" />
                        <span>Rangoli Jewellers Design Archive</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-playfair font-normal tracking-tight">
                        Our Jewellery Design Catalogue
                    </h1>

                    <p className="text-gray-300 text-sm sm:text-base font-roboto font-light max-w-2xl mx-auto leading-relaxed">
                        Browse our curated collection of hallmarked gold, diamond, and bespoke designs. Enquire directly on WhatsApp for real-time gold rates, weight specifications, and customizations.
                    </p>

                    {/* Quick Search Bar */}
                    <div className="pt-4 max-w-xl mx-auto">
                        <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 p-1.5 focus-within:border-[#d4af37] transition-all">
                            <FaMagnifyingGlass className="text-[#d4af37] ml-4 text-base shrink-0" />
                            <input
                                type="text"
                                placeholder="Search by name, code (e.g. RJ-RNG-101), or stone..."
                                value={searchQuery}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none font-roboto"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => handleSearchChange('')}
                                    className="p-1.5 mr-2 text-gray-400 hover:text-white cursor-pointer"
                                    title="Clear search"
                                >
                                    <IoCloseOutline className="text-lg" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {/* Shop by Gold Karat Selector */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#EDE8E0] shadow-sm space-y-3.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                                <span className="text-[#d4af37] text-sm">✦</span>
                                <h2 className="text-base sm:text-lg font-playfair font-medium text-primary">
                                    Shop by Gold Karat (Purity)
                                </h2>
                            </div>
                            <p className="text-xs text-gray-500 font-roboto">
                                Select purity grade: 22K (916 BIS Hallmark), 20K (833 BIS Traditional), or 18K (750 Fine Diamonds)
                            </p>
                        </div>
                        {selectedKarat !== 'All' && (
                            <button
                                onClick={() => handleKaratSelect('All')}
                                className="text-xs text-[#d4af37] hover:underline font-roboto font-medium self-start sm:self-auto cursor-pointer"
                            >
                                Show All Karats
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
                        {karats.map((k) => {
                            const isSelected = selectedKarat === k.id
                            return (
                                <button
                                    key={k.id}
                                    onClick={() => handleKaratSelect(k.id)}
                                    className={`relative p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer group flex flex-col justify-between gap-1.5 ${
                                        isSelected
                                            ? 'bg-[#304037] text-white border-[#d4af37] shadow-md ring-1 ring-[#d4af37]'
                                            : 'bg-[#FAFAF8] text-gray-700 border-gray-200 hover:border-[#d4af37]/50 hover:bg-white'
                                    }`}
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <span className={`font-roboto font-bold text-sm tracking-wide ${isSelected ? 'text-[#f3e5ab]' : 'text-primary'}`}>
                                            {k.label}
                                        </span>
                                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                                            isSelected ? 'bg-[#d4af37] text-[#1c2922]' : 'bg-gray-200 text-gray-700'
                                        }`}>
                                            {k.hallmark}
                                        </span>
                                    </div>
                                    <p className={`text-[11px] font-roboto leading-snug line-clamp-1 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                                        {k.desc}
                                    </p>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-gray-500 font-roboto font-medium mr-1 hidden sm:inline">Category:</span>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategorySelect(cat)}
                                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-roboto tracking-wide transition-all cursor-pointer ${
                                    selectedCategory === cat
                                        ? 'bg-[#304037] text-[#f3e5ab] font-medium shadow-sm ring-1 ring-[#d4af37]/40'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count & Active Filter Indicator */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-500 font-roboto">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span>
                            Showing <strong className="text-gray-800">{filteredDesigns.length}</strong> Designs
                        </span>
                        {selectedKarat !== 'All' && (
                            <span className="inline-flex items-center gap-1.5 bg-[#d4af37]/15 text-[#304037] px-3 py-0.5 rounded-full font-medium text-[11px] border border-[#d4af37]/30">
                                <span>Karat: <strong>{selectedKarat} Gold</strong></span>
                                <button
                                    onClick={() => handleKaratSelect('All')}
                                    className="hover:text-red-500 font-bold ml-0.5 cursor-pointer"
                                    title="Clear karat filter"
                                >
                                    ✕
                                </button>
                            </span>
                        )}
                        {selectedCategory !== 'All' && (
                            <span className="inline-flex items-center gap-1.5 bg-[#304037]/10 text-[#304037] px-3 py-0.5 rounded-full font-medium text-[11px] border border-[#304037]/20">
                                <span>Category: <strong>{selectedCategory}</strong></span>
                                <button
                                    onClick={() => handleCategorySelect('All')}
                                    className="hover:text-red-500 font-bold ml-0.5 cursor-pointer"
                                    title="Clear category filter"
                                >
                                    ✕
                                </button>
                            </span>
                        )}
                        {searchQuery && (
                            <span className="inline-flex items-center gap-1.5 bg-[#d4af37]/15 text-[#304037] px-3 py-0.5 rounded-full font-medium text-[11px] border border-[#d4af37]/30">
                                <span>Search: "{searchQuery}"</span>
                                <button
                                    onClick={() => handleSearchChange('')}
                                    className="hover:text-red-500 font-bold ml-0.5 cursor-pointer"
                                    title="Clear search"
                                >
                                    ✕
                                </button>
                            </span>
                        )}
                    </div>
                    {(selectedCategory !== 'All' || selectedKarat !== 'All' || searchQuery) && (
                        <button
                            onClick={handleResetFilters}
                            className="text-[#304037] font-medium hover:underline cursor-pointer self-start sm:self-auto"
                        >
                            Reset All Filters
                        </button>
                    )}
                </div>

                {/* Design Grid */}
                {loading ? (
                    <div className="py-28 text-center space-y-4">
                        <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#304037]">
                            Loading Rangoli Jewellery Designs...
                        </p>
                    </div>
                ) : filteredDesigns.length === 0 ? (
                    <div className="py-24 text-center space-y-4">
                        <p className="text-base sm:text-lg font-playfair text-gray-500">
                            {dbProducts.length === 0
                                ? 'No designs in catalogue yet.'
                                : 'No designs match your filter.'}
                        </p>
                        {(selectedCategory !== 'All' || selectedKarat !== 'All' || searchQuery) && (
                            <button
                                onClick={handleResetFilters}
                                className="px-6 py-2.5 rounded-full bg-[#304037] text-white text-xs font-roboto uppercase tracking-wider cursor-pointer hover:bg-[#233029] transition-colors"
                            >
                                View All Designs
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
                        {filteredDesigns.map((item) => {
                            const itemId = item._id || item.customId || item.id
                            const isWishlisted = wishlist.includes(itemId)
                            const inBag = isInEnquiry(itemId)

                            return (
                                <div
                                    key={itemId}
                                    className="group relative bg-white rounded-2xl overflow-hidden border border-[#EDE8E0] hover:border-[#d4af37]/60 hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                                >
                                    {/* Image Container */}
                                    <Link
                                        to={`/product/${itemId}`}
                                        className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#F9F7F3] flex items-center justify-center p-6 block cursor-pointer"
                                    >
                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-sm"
                                        />

                                        {/* Tag */}
                                        <span className="absolute top-3 left-3 bg-[#304037] text-white text-[10px] font-roboto font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                            {item.tag || 'Exclusive'}
                                        </span>

                                        {/* Karat Badge */}
                                        <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur text-primary text-[10px] font-bold font-mono px-2 py-0.5 rounded border border-[#d4af37]/50 shadow-sm flex items-center gap-1">
                                            <span className="text-[#d4af37]">✦</span>
                                            <span>{item.karat} Gold</span>
                                        </span>

                                        {/* Wishlist Button */}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                toggleWishlist(itemId)
                                            }}
                                            aria-label="Wishlist"
                                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-gray-500 hover:text-red-500 hover:bg-white shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer z-10"
                                        >
                                            {isWishlisted ? (
                                                <FaHeart className="text-red-500 text-sm" />
                                            ) : (
                                                <FaRegHeart className="text-sm" />
                                            )}
                                        </button>
                                    </Link>

                                    {/* Info & Action Buttons */}
                                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between text-xs font-roboto">
                                                <div className="flex items-center gap-2">
                                                    <span className="uppercase tracking-widest text-[#d4af37] font-semibold text-[11px]">
                                                        {item.category}
                                                    </span>
                                                    <span className="bg-[#f4efe6] text-[#304037] text-[10px] font-bold font-mono px-1.5 py-0.2 rounded border border-[#d4af37]/30">
                                                        {item.karat}
                                                    </span>
                                                </div>
                                                <span className="text-gray-400 font-mono text-[11px]">
                                                    {item.code}
                                                </span>
                                            </div>

                                            <Link
                                                to={`/product/${itemId}`}
                                                className="block text-base sm:text-lg text-primary font-playfair font-normal leading-snug group-hover:text-[#d4af37] transition-colors line-clamp-1 cursor-pointer"
                                            >
                                                {item.name}
                                            </Link>

                                            <p className="text-xs text-gray-500 font-roboto font-light">
                                                {item.specs}
                                            </p>
                                        </div>

                                        {/* Buttons */}
                                        <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                                            {/* WhatsApp Enquiry Button */}
                                            <button
                                                onClick={() => sendSingleEnquiry(item)}
                                                className="group/btn w-full py-2.5 px-3 rounded-xl bg-[#304037] hover:bg-[#233029] text-white text-xs font-roboto font-medium uppercase tracking-wider flex items-center justify-center gap-2 border border-[#304037] hover:border-[#d4af37] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                                            >
                                                <FaWhatsapp className="text-base text-[#d4af37] group-hover/btn:scale-110 transition-transform duration-200" />
                                                <span>Enquire on WhatsApp</span>
                                            </button>

                                            {/* Add to Bag Button */}
                                            <button
                                                onClick={() => {
                                                    if (inBag) {
                                                        removeFromEnquiry(itemId)
                                                    } else {
                                                        addToEnquiry(item)
                                                    }
                                                }}
                                                className={`w-full py-2 px-3 rounded-xl text-xs font-roboto font-medium tracking-wide flex items-center justify-center gap-2 border transition-all duration-300 cursor-pointer ${
                                                    inBag
                                                        ? 'bg-[#d4af37]/15 text-[#304037] border-[#d4af37] font-semibold'
                                                        : 'bg-white hover:bg-[#304037]/5 text-[#304037] border-gray-300 hover:border-[#304037]'
                                                }`}
                                            >
                                                {inBag ? (
                                                    <>
                                                        <BsBagCheck className="text-sm text-[#304037]" />
                                                        <span>Added in Bag (Remove)</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <BsBagPlus className="text-sm text-gray-500" />
                                                        <span>+ Add to Enquiry Bag</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* Bespoke Custom Design Banner */}
                <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#304037] text-white border border-[#3e5247] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="space-y-2 text-center md:text-left">
                        <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold font-roboto">
                            Bespoke Custom Jewellery Studio
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-playfair font-normal">
                            Have a Special Design Photo or Sketch in Mind?
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm font-roboto font-light max-w-xl">
                            Share any reference image or idea on WhatsApp. Our master artisans in Ahmedabad will craft it to your exact gold weight, diamond purity, and ring size.
                        </p>
                    </div>

                    <a
                        href={`https://wa.me/${whatsappNumber}?text=Namaste%20Rangoli%20Jewellers,%20I%20have%20a%20custom%20jewellery%20design%20reference%20photo%20that%20I%20would%20like%20to%20craft.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 px-8 py-3.5 rounded-full bg-[#d4af37] hover:bg-[#e0be53] text-[#1c2922] font-roboto font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-lg transition-all duration-300 cursor-pointer"
                    >
                        <FaWhatsapp className="text-lg" />
                        <span>Send Custom Design Photo</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Catalogue
