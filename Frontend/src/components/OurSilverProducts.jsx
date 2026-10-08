import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GoDotFill } from 'react-icons/go'
import { FaWhatsapp, FaRegHeart, FaHeart } from 'react-icons/fa6'
import { BsBagPlus, BsBagCheck, BsPatchCheckFill } from 'react-icons/bs'
import { HiArrowRight } from 'react-icons/hi2'
import { useEnquiry } from '../context/EnquiryContext'
import api from '../services/api'

const OurSilverProducts = () => {
    const {
        addToEnquiry,
        removeFromEnquiry,
        isInEnquiry,
        sendSingleEnquiry,
    } = useEnquiry()

    const [activeTab, setActiveTab] = useState('All')
    const [wishlist, setWishlist] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const filterTabs = [
        'All',
        'Payal',
        'Bichhiya',
        'Silver Chains',
        'Bracelets',
        'Rings',
        'Pooja & Idols',
        'Utensils & Coins',
    ]

    useEffect(() => {
        const fetchSilverProducts = async () => {
            try {
                setLoading(true)
                const res = await api.get('/products', { params: { metal: 'Silver' } })
                if (res.data?.success && Array.isArray(res.data.data)) {
                    setProducts(res.data.data)
                } else {
                    setProducts([])
                }
            } catch (err) {
                console.error('Failed to load silver products:', err)
                setProducts([])
            } finally {
                setLoading(false)
            }
        }
        fetchSilverProducts()
    }, [])

    const toggleWishlist = (id) => {
        setWishlist((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
    }

    const filteredProducts = (
        activeTab === 'All'
            ? products
            : products.filter(
                  (p) =>
                      p.category?.toLowerCase() === activeTab.toLowerCase() ||
                      p.category?.toLowerCase().replace(/s$/, '') ===
                          activeTab.toLowerCase().replace(/s$/, '')
              )
    ).slice(0, 6)

    if (!loading && products.length === 0) {
        return null
    }

    return (
        <section className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F2F4F7] to-[#FAF7F2] border-t border-b border-gray-200 relative overflow-hidden">
            {/* Subtle Silver Metallic Watermark */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-slate-300/20 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="inline-flex items-center gap-2 border border-slate-400/40 px-4 py-1.5 rounded-full text-xs sm:text-sm text-slate-800 font-roboto uppercase tracking-widest bg-white/80 shadow-xs backdrop-blur-xs">
                        <BsPatchCheckFill className="text-xs text-slate-600" />
                        <span className="font-semibold">925 Hallmark Certified Silver & Sacred Articles</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-[42px] text-[#1F2B24] font-playfair font-medium tracking-tight leading-tight">
                        The Silver Pavilion & Pooja Heritage
                    </h2>

                    <p className="text-gray-600 text-sm sm:text-base font-roboto font-light max-w-2xl">
                        Handcrafted bridal payal, toe rings (bichhiya), solid silver kadas, and 999 fine silver pooja idols and coins for auspicious celebrations.
                    </p>

                    {/* Filter Category Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-4">
                        {filterTabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4.5 py-1.5 rounded-full text-xs font-roboto tracking-wide transition-all duration-300 cursor-pointer ${
                                    activeTab === tab
                                        ? 'bg-slate-800 text-cyan-200 shadow-md font-semibold'
                                        : 'bg-white text-gray-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
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
                        <div className="w-9 h-9 border-2 border-slate-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
                            Loading silver collection...
                        </span>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="py-16 text-center space-y-3 bg-white rounded-2xl border border-gray-200 p-8 max-w-lg mx-auto">
                        <p className="text-base font-playfair text-gray-700">
                            No silver designs found in {activeTab} category right now.
                        </p>
                        <button
                            onClick={() => setActiveTab('All')}
                            className="px-5 py-2 rounded-full bg-slate-800 text-cyan-200 text-xs uppercase tracking-wider font-semibold cursor-pointer"
                        >
                            View All Silver Designs
                        </button>
                    </div>
                ) : (
                    /* Product Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                        {filteredProducts.map((item) => {
                            const pId = item._id || item.customId || item.id
                            const isWishlisted = wishlist.includes(pId)
                            const inBag = isInEnquiry(pId)

                            return (
                                <div
                                    key={pId}
                                    className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-slate-400 hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                                >
                                    <Link
                                        to={`/product/${pId}`}
                                        className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#F8F9FA] flex items-center justify-center p-6 block cursor-pointer"
                                    >
                                        <img
                                            src={
                                                item.img ||
                                                item.images?.[0] ||
                                                'https://images.unsplash.com/photo-1611591475155-4284ec28d351?w=800&auto=format&fit=crop&q=80'
                                            }
                                            alt={item.name}
                                            onError={(e) => {
                                                e.currentTarget.onerror = null
                                                e.currentTarget.src =
                                                    'https://images.unsplash.com/photo-1611591475155-4284ec28d351?w=800&auto=format&fit=crop&q=80'
                                            }}
                                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-sm"
                                        />

                                        {/* Silver Purity Badge */}
                                        <span className="absolute bottom-3 left-3 bg-slate-900 text-cyan-200 text-[10px] font-bold font-mono px-2 py-0.5 rounded shadow-xs flex items-center gap-1 border border-cyan-400/30">
                                            <span>✦</span>
                                            <span>{item.karat || '925'} Silver</span>
                                        </span>

                                        {/* Tag */}
                                        <span className="absolute top-3 left-3 bg-slate-700 text-white text-[10px] font-roboto font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                            {item.tag || '925 Sterling'}
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

                                    {/* Info & Action Buttons */}
                                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between text-xs text-gray-400">
                                                <span className="uppercase tracking-wider font-semibold text-slate-700 text-[10px]">
                                                    {item.category}
                                                </span>
                                                <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                                                    {item.code || 'RJ-SLV'}
                                                </span>
                                            </div>

                                            <Link
                                                to={`/product/${pId}`}
                                                className="block font-playfair text-lg text-[#1F2B24] font-normal group-hover:text-slate-800 transition-colors line-clamp-1"
                                            >
                                                {item.name}
                                            </Link>

                                            <p className="text-xs text-gray-500 font-roboto font-light line-clamp-1">
                                                {item.specs || item.purity || '925 BIS Hallmarked Silver'}
                                            </p>
                                        </div>

                                        {/* Actions: Direct WhatsApp Enquiry + Add to Enquiry Bag */}
                                        <div className="pt-2 space-y-2">
                                            <button
                                                type="button"
                                                onClick={() => sendSingleEnquiry(item)}
                                                className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-roboto font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-sm cursor-pointer"
                                            >
                                                <FaWhatsapp className="text-sm" />
                                                <span>Enquire on WhatsApp</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (inBag) {
                                                        removeFromEnquiry(pId)
                                                    } else {
                                                        addToEnquiry(item)
                                                    }
                                                }}
                                                className={`w-full py-2 px-3 rounded-xl text-xs font-roboto font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer border ${
                                                    inBag
                                                        ? 'bg-slate-100 text-slate-800 border-slate-300'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:border-slate-500 hover:bg-slate-50'
                                                }`}
                                            >
                                                {inBag ? (
                                                    <>
                                                        <BsBagCheck className="text-sm text-slate-800" />
                                                        <span>In Enquiry Bag</span>
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

                {/* Bottom CTA to Silver Catalogue */}
                <div className="flex justify-center pt-4">
                    <Link
                        to="/catalogue?metal=silver"
                        className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs sm:text-sm font-roboto uppercase tracking-wider transition-all duration-300 shadow-md group cursor-pointer border border-slate-700"
                    >
                        <span>View All Silver Catalogue</span>
                        <HiArrowRight className="text-base text-cyan-300 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default OurSilverProducts
