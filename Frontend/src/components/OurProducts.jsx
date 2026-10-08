import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GoDotFill } from 'react-icons/go'
import { FaWhatsapp, FaRegHeart, FaHeart } from 'react-icons/fa6'
import { BsBagPlus, BsBagCheck } from 'react-icons/bs'
import { HiArrowRight } from 'react-icons/hi2'
import { useEnquiry } from '../context/EnquiryContext'
import api from '../services/api'

const OurProducts = () => {
    const {
        enquiryItems,
        addToEnquiry,
        removeFromEnquiry,
        isInEnquiry,
        sendSingleEnquiry,
        setIsDrawerOpen,
    } = useEnquiry()

    const [activeTab, setActiveTab] = useState('All')
    const [wishlist, setWishlist] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const filterTabs = ['All', 'Rings', 'Earrings', 'Necklaces', 'Bracelets', 'Bangles', 'Pendants', 'Chains']

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const res = await api.get('/products')
                if (res.data?.success && Array.isArray(res.data.data)) {
                    setProducts(res.data.data)
                }
            } catch (err) {
                console.error('Failed to load products for homepage:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    const toggleWishlist = (id) => {
        setWishlist((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
    }

    const filteredProducts =
        activeTab === 'All'
            ? products
            : products.filter(
                  (p) =>
                      p.category.toLowerCase() === activeTab.toLowerCase() ||
                      p.category.toLowerCase().replace(/s$/, '') ===
                          activeTab.toLowerCase().replace(/s$/, '')
              )

    if (!loading && products.length === 0) {
        return null
    }

    return (
        <section className="w-full py-16 sm:py-20 lg:py-24 bg-[#FAFAF8] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="inline-flex items-center gap-1.5 border border-[#304037]/25 px-3.5 py-1 rounded-full text-xs sm:text-sm text-primary font-roboto uppercase tracking-widest bg-[#304037]/5">
                        <GoDotFill className="text-xs text-[#d4af37]" />
                        <span>Curated Design Catalogue</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-[42px] text-primary font-playfair font-medium tracking-tight leading-tight">
                        Explore Our Signature Jewellery Pieces
                    </h2>

                    <p className="text-gray-500 text-sm sm:text-base font-roboto font-light max-w-2xl">
                        Select individual designs to enquire instantly on WhatsApp, or add multiple pieces to your Enquiry Bag for a consolidated estimate.
                    </p>

                    {/* Filter Category Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-4">
                        {filterTabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-roboto tracking-wide transition-all duration-300 cursor-pointer ${
                                    activeTab === tab
                                        ? 'bg-[#304037] text-white shadow-md'
                                        : 'bg-white text-gray-600 hover:text-[#304037] hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="py-20 text-center space-y-3">
                        <div className="w-9 h-9 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
                            Loading signature pieces...
                        </span>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="py-16 text-center space-y-3">
                        <p className="text-base font-playfair text-gray-600">
                            No designs available in {activeTab} category right now.
                        </p>
                        <button
                            onClick={() => setActiveTab('All')}
                            className="px-5 py-2 rounded-full bg-[#304037] text-white text-xs uppercase tracking-wider"
                        >
                            View All Designs
                        </button>
                    </div>
                ) : (
                    /* Product Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
                        {filteredProducts.map((item) => {
                            const pId = item._id || item.customId || item.id
                            const isWishlisted = wishlist.includes(pId)
                            const inBag = isInEnquiry(pId)

                            return (
                                <div
                                    key={pId}
                                    className="group relative bg-white rounded-2xl overflow-hidden border border-[#EDE8E0] hover:border-[#d4af37]/60 hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                                >
                                    <Link
                                        to={`/product/${pId}`}
                                        className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#F9F7F3] flex items-center justify-center p-6 block cursor-pointer"
                                    >
                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-sm"
                                        />

                                        {/* Karat Badge */}
                                        <span className="absolute bottom-3 left-3 bg-white/95 text-primary text-[10px] font-bold font-mono px-2 py-0.5 rounded border border-[#d4af37]/40 shadow-xs">
                                            {item.karat} Gold
                                        </span>

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                toggleWishlist(pId)
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

                                            <Link
                                                to={`/product/${pId}`}
                                                className="block text-base sm:text-lg text-primary font-playfair font-normal leading-snug group-hover:text-[#d4af37] transition-colors line-clamp-1 cursor-pointer"
                                            >
                                                {item.name}
                                            </Link>

                                            <p className="text-xs text-gray-500 font-roboto font-light">
                                                {item.specs}
                                            </p>
                                        </div>

                                        <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                                            <button
                                                onClick={() => sendSingleEnquiry(item)}
                                                className="group/btn w-full py-2.5 px-3 rounded-xl bg-[#304037] hover:bg-[#233029] text-white text-xs font-roboto font-medium uppercase tracking-wider flex items-center justify-center gap-2 border border-[#304037] hover:border-[#d4af37] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                                            >
                                                <FaWhatsapp className="text-base text-[#d4af37] group-hover/btn:scale-110 transition-transform duration-200" />
                                                <span>Enquire on WhatsApp</span>
                                            </button>

                                            <button
                                                onClick={() => {
                                                    if (inBag) {
                                                        removeFromEnquiry(pId)
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

                {/* Bottom CTA to Catalogue */}
                <div className="flex justify-center pt-4">
                    <Link
                        to="/catalogue"
                        className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#304037] text-white hover:bg-[#233029] text-xs sm:text-sm font-roboto uppercase tracking-wider transition-all duration-300 shadow-md group cursor-pointer"
                    >
                        <span>View Full 2026 Catalogue</span>
                        <HiArrowRight className="text-base text-[#d4af37] group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default OurProducts