import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GoDotFill } from 'react-icons/go'
import { FaWhatsapp, FaRegHeart, FaHeart, FaMagnifyingGlass } from 'react-icons/fa6'
import { BsBagPlus, BsBagCheck } from 'react-icons/bs'
import { IoCloseOutline } from 'react-icons/io5'
import { useEnquiry } from '../context/EnquiryContext'

const categories = ['All', 'Rings', 'Earrings', 'Necklaces', 'Bracelets', 'Bangles', 'Pendants', 'Chains']

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

    const [selectedCategory, setSelectedCategory] = useState(() => normalizeCategory(categoryParam))
    const [searchQuery, setSearchQuery] = useState(() => searchParam || '')
    const [selectedPurity, setSelectedPurity] = useState('All')
    const [wishlist, setWishlist] = useState([])

    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(normalizeCategory(categoryParam))
        } else {
            setSelectedCategory('All')
        }
    }, [categoryParam])

    useEffect(() => {
        if (searchParam !== null && searchParam !== undefined) {
            setSearchQuery(searchParam)
        }
    }, [searchParam])

    const purities = ['All', '22K Hallmarked Gold', '18K Diamond']

    const allDesigns = [
        {
            id: 1,
            code: 'RJ-RNG-101',
            category: 'Rings',
            purity: '18K Diamond',
            tag: 'Best Seller',
            name: 'Royal Solitaire Diamond Ring',
            specs: '18K Rose Gold • VVS-EF Solitaire Diamond',
            img: 'https://html.awaikenthemes.com/cignet/images/product-image-1.png',
        },
        {
            id: 2,
            code: 'RJ-EAR-202',
            category: 'Earrings',
            purity: '22K Hallmarked Gold',
            tag: 'New Design',
            name: 'Golden Sparkle Drop Earrings',
            specs: '22K BIS Hallmarked Yellow Gold • Handcrafted',
            img: 'https://html.awaikenthemes.com/cignet/images/product-image-2.png',
        },
        {
            id: 3,
            code: 'RJ-NCK-303',
            category: 'Necklaces',
            purity: '18K Diamond',
            tag: '18K Fine',
            name: 'Diamond Celestial Halo Necklace',
            specs: '18K White Gold • Certified Brilliant Diamond',
            img: 'https://html.awaikenthemes.com/cignet/images/product-image-3.png',
        },
        {
            id: 4,
            code: 'RJ-RNG-104',
            category: 'Rings',
            purity: '18K Diamond',
            tag: 'Bespoke',
            name: 'Timeless Emerald Eternity Ring',
            specs: '18K Yellow Gold • Natural Colombian Emerald',
            img: 'https://html.awaikenthemes.com/cignet/images/product-image-4.png',
        },
        {
            id: 5,
            code: 'RJ-BRC-505',
            category: 'Bracelets',
            purity: '22K Hallmarked Gold',
            tag: 'Signature',
            name: 'Artisan Lustre Gold Bangle',
            specs: '22K Hallmarked Gold • Antique Floral Filigree',
            img: 'https://html.awaikenthemes.com/cignet/images/product-image-5.png',
        },
        {
            id: 6,
            code: 'RJ-RNG-106',
            category: 'Rings',
            purity: '18K Diamond',
            tag: 'Limited',
            name: 'Vintage Floral Diamond Band',
            specs: '18K Dual-Tone Gold • Micro Pave Diamonds',
            img: 'https://html.awaikenthemes.com/cignet/images/product-image-6.png',
        },
        {
            id: 7,
            code: 'RJ-NCK-307',
            category: 'Necklaces',
            purity: '22K Hallmarked Gold',
            tag: 'Bridal Heritage',
            name: 'Grandeur Pearl Choker Necklace',
            specs: '22K Yellow Gold • Handpicked South Sea Pearls',
            img: 'https://html.awaikenthemes.com/cignet/images/product-image-7.png',
        },
        {
            id: 8,
            code: 'RJ-EAR-208',
            category: 'Earrings',
            purity: '18K Diamond',
            tag: 'Trending',
            name: 'Graceful Diamond Hoop Studs',
            specs: '18K Rose Gold • Brilliant Cut Solitaires',
            img: 'https://html.awaikenthemes.com/cignet/images/product-image-8.png',
        },
        {
            id: 9,
            code: 'RJ-RNG-109',
            category: 'Rings',
            purity: '22K Hallmarked Gold',
            tag: 'Traditional',
            name: 'Mayur Peacock Gold Signet Ring',
            specs: '22K BIS 916 Hallmark Yellow Gold',
            img: 'https://html.awaikenthemes.com/cignet/images/top-selling-item-image-5.jpg',
        },
        {
            id: 10,
            code: 'RJ-EAR-210',
            category: 'Earrings',
            purity: '22K Hallmarked Gold',
            tag: 'Jhumka',
            name: 'Royal Heritage Chandbali Jhumkas',
            specs: '22K Gold • Precious Enamel Meenakari Art',
            img: 'https://html.awaikenthemes.com/cignet/images/top-selling-item-image-1.jpg',
        },
        {
            id: 11,
            code: 'RJ-PND-411',
            category: 'Pendants',
            purity: '18K Diamond',
            tag: 'Modern',
            name: 'Infinity Heart Diamond Pendant',
            specs: '18K Gold • Certified VVS Diamond Centre',
            img: 'https://html.awaikenthemes.com/cignet/images/top-selling-item-image-3.jpg',
        },
        {
            id: 12,
            code: 'RJ-BRC-512',
            category: 'Bracelets',
            purity: '22K Hallmarked Gold',
            tag: 'Men Special',
            name: 'Imperial Sovereign Kada',
            specs: '22K Heavy Hallmark Gold • Solid Carved Finish',
            img: 'https://html.awaikenthemes.com/cignet/images/top-selling-item-image-4.jpg',
        },
        {
            id: 13,
            code: 'RJ-EAR-213',
            category: 'Earrings',
            purity: '18K Diamond',
            tag: 'Exclusive',
            name: 'Solitaire Floral Diamond Studs',
            specs: '18K Yellow Gold • Certified VVS-EF Diamonds',
            img: 'https://html.awaikenthemes.com/cignet/images/product-image-2.png',
        },
        {
            id: 14,
            code: 'RJ-EAR-214',
            category: 'Earrings',
            purity: '22K Hallmarked Gold',
            tag: 'Heritage',
            name: 'Kundan Polki Royal Chandelier Earrings',
            specs: '22K Yellow Gold • Natural Uncut Polki & Emerald Beads',
            img: 'https://html.awaikenthemes.com/cignet/images/top-selling-item-image-1.jpg',
        },
        {
            id: 15,
            code: 'RJ-CHN-715',
            category: 'Chains',
            purity: '22K Hallmarked Gold',
            tag: 'Classic',
            name: 'Imperial BIS Solid Gold Rope Chain',
            specs: '22K BIS 916 Hallmark Gold • Handcrafted Italian Weave',
            img: 'https://html.awaikenthemes.com/cignet/images/top-selling-item-image-6.jpg',
        },
        {
            id: 16,
            code: 'RJ-CHN-716',
            category: 'Chains',
            purity: '18K Diamond',
            tag: 'Modern Lux',
            name: 'Italian Diamond-Faceted Curb Link Chain',
            specs: '18K Yellow Gold • Precision Diamond Bevel Edge',
            img: 'https://html.awaikenthemes.com/cignet/images/top-selling-item-image-6.jpg',
        },
        {
            id: 17,
            code: 'RJ-BNG-617',
            category: 'Bangles',
            purity: '22K Hallmarked Gold',
            tag: 'Bridal Set',
            name: 'Royal Rajasthani Meenakari Kada Bangles',
            specs: '22K Hallmarked Gold • Pair of Traditional Hand-Carved Kadas',
            img: 'https://html.awaikenthemes.com/cignet/images/top-selling-item-image-4.jpg',
        },
        {
            id: 18,
            code: 'RJ-BNG-618',
            category: 'Bangles',
            purity: '18K Diamond',
            tag: 'Signature',
            name: 'Aura Brilliant Diamond Pavé Sleek Bangle',
            specs: '18K Rose Gold • Continuous Solitaire Diamond Line',
            img: 'https://html.awaikenthemes.com/cignet/images/product-image-5.png',
        },
        {
            id: 19,
            code: 'RJ-PND-419',
            category: 'Pendants',
            purity: '22K Hallmarked Gold',
            tag: 'Temple Art',
            name: 'Sacred Lakshmi Nakshi Gold Pendant',
            specs: '22K Antique Hallmarked Gold • Hand-engraved Nakshi Detailing',
            img: 'https://html.awaikenthemes.com/cignet/images/top-selling-item-image-3.jpg',
        },
        {
            id: 20,
            code: 'RJ-NCK-320',
            category: 'Necklaces',
            purity: '22K Hallmarked Gold',
            tag: 'Royal Bridal',
            name: 'Imperial Polki Kundan Maharani Necklace Set',
            specs: '22K Gold • Handcrafted Jadau Cluster with Matching Earrings',
            img: 'https://html.awaikenthemes.com/cignet/images/top-selling-item-image-2.jpg',
        },
    ]

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

    const handleResetFilters = () => {
        setSelectedCategory('All')
        setSelectedPurity('All')
        setSearchQuery('')
        const nextParams = new URLSearchParams(searchParams)
        nextParams.delete('category')
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

    const filteredDesigns = allDesigns.filter((item) => {
        const matchesCategory =
            selectedCategory === 'All' ||
            item.category.toLowerCase() === selectedCategory.toLowerCase() ||
            item.category.toLowerCase().replace(/s$/, '') === selectedCategory.toLowerCase().replace(/s$/, '')

        const matchesPurity =
            selectedPurity === 'All' || item.purity.toLowerCase() === selectedPurity.toLowerCase()

        const searchLower = searchQuery.toLowerCase().trim()
        const matchesSearch =
            !searchLower ||
            item.name.toLowerCase().includes(searchLower) ||
            item.code.toLowerCase().includes(searchLower) ||
            item.specs.toLowerCase().includes(searchLower) ||
            item.category.toLowerCase().includes(searchLower)

        return matchesCategory && matchesPurity && matchesSearch
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
                {/* Category Pills */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6">
                    <div className="flex flex-wrap items-center gap-2">
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

                    {/* Purity Filter */}
                    <div className="flex items-center gap-2 text-xs font-roboto">
                        <span className="text-gray-500 font-medium">Purity:</span>
                        <select
                            value={selectedPurity}
                            onChange={(e) => setSelectedPurity(e.target.value)}
                            className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-gray-700 text-xs font-roboto focus:outline-none focus:border-[#304037]"
                        >
                            {purities.map((p) => (
                                <option key={p} value={p}>
                                    {p}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results Count & Active Category Indicator */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-500 font-roboto">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span>
                            Showing <strong className="text-gray-800">{filteredDesigns.length}</strong> Designs
                        </span>
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
                    {(selectedCategory !== 'All' || selectedPurity !== 'All' || searchQuery) && (
                        <button
                            onClick={handleResetFilters}
                            className="text-[#304037] font-medium hover:underline cursor-pointer self-start sm:self-auto"
                        >
                            Reset All Filters
                        </button>
                    )}
                </div>

                {/* Design Grid */}
                {filteredDesigns.length === 0 ? (
                    <div className="py-20 text-center space-y-4">
                        <p className="text-lg font-playfair text-gray-600">No designs match your filter.</p>
                        <button
                            onClick={handleResetFilters}
                            className="px-6 py-2.5 rounded-full bg-[#304037] text-white text-xs font-roboto uppercase tracking-wider cursor-pointer hover:bg-[#233029] transition-colors"
                        >
                            View All Designs
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
                        {filteredDesigns.map((item) => {
                            const isWishlisted = wishlist.includes(item.id)
                            const inBag = isInEnquiry(item.id)

                            return (
                                <div
                                    key={item.id}
                                    className="group relative bg-white rounded-2xl overflow-hidden border border-[#EDE8E0] hover:border-[#d4af37]/60 hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                                >
                                    {/* Image Container */}
                                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#F9F7F3] flex items-center justify-center p-6">
                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-sm"
                                        />

                                        {/* Tag */}
                                        <span className="absolute top-3 left-3 bg-[#304037] text-white text-[10px] font-roboto font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                            {item.tag}
                                        </span>

                                        {/* Wishlist Button */}
                                        <button
                                            onClick={() => toggleWishlist(item.id)}
                                            aria-label="Wishlist"
                                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-gray-500 hover:text-red-500 hover:bg-white shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer"
                                        >
                                            {isWishlisted ? (
                                                <FaHeart className="text-red-500 text-sm" />
                                            ) : (
                                                <FaRegHeart className="text-sm" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Info & Action Buttons */}
                                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between text-xs font-roboto">
                                                <span className="uppercase tracking-widest text-[#d4af37] font-semibold text-[11px]">
                                                    {item.category}
                                                </span>
                                                <span className="text-gray-400 font-mono text-[11px]">
                                                    {item.code}
                                                </span>
                                            </div>

                                            <h3 className="text-base sm:text-lg text-primary font-playfair font-normal leading-snug group-hover:text-[#d4af37] transition-colors line-clamp-1">
                                                {item.name}
                                            </h3>

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
                                                        removeFromEnquiry(item.id)
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
