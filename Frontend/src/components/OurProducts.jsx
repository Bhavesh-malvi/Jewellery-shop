import React, { useState } from 'react'
import { GoDotFill } from 'react-icons/go'
import { FaWhatsapp, FaRegHeart, FaHeart } from 'react-icons/fa6'
import { BsBagPlus, BsBagCheck } from 'react-icons/bs'
import { HiArrowRight } from 'react-icons/hi2'
import { useEnquiry } from '../context/EnquiryContext'

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

    const filterTabs = ['All', 'Rings', 'Earrings', 'Necklaces', 'Bracelets']

    const products = [
        {
            id: 1,
            code: 'RJ-RNG-101',
            category: 'Rings',
            tag: 'Best Seller',
            name: 'Royal Solitaire Diamond Ring',
            specs: '18K Rose Gold • VVS-EF Diamond',
            img: 'https://html.awaikenthemes.com/cignet/images/product-image-1.png',
        },
        {
            id: 2,
            code: 'RJ-EAR-202',
            category: 'Earrings',
            tag: 'New Design',
            name: 'Golden Sparkle Drop Earrings',
            specs: '22K Hallmark Gold • Handcrafted',
            img: 'https://html.awaikenthemes.com/cignet/images/product-image-2.png',
        },
        {
            id: 3,
            code: 'RJ-NCK-303',
            category: 'Necklaces',
            tag: '18K Fine',
            name: 'Diamond Celestial Halo Necklace',
            specs: '18K White Gold • Certified Solitaire',
            img: 'https://html.awaikenthemes.com/cignet/images/product-image-3.png',
        },
        {
            id: 4,
            code: 'RJ-RNG-104',
            category: 'Rings',
            tag: 'Bespoke',
            name: 'Timeless Emerald Eternity Ring',
            specs: '18K Yellow Gold • Natural Emerald',
            img: 'https://html.awaikenthemes.com/cignet/images/product-image-4.png',
        },
        {
            id: 5,
            code: 'RJ-BRC-505',
            category: 'Bracelets',
            tag: 'Handcrafted',
            name: 'Artisan Lustre Gold Bangle',
            specs: '22K BIS Hallmarked Yellow Gold',
            img: 'https://html.awaikenthemes.com/cignet/images/product-image-5.png',
        },
        {
            id: 6,
            code: 'RJ-RNG-106',
            category: 'Rings',
            tag: 'Limited Edition',
            name: 'Vintage Floral Diamond Band',
            specs: '18K Dual-Tone Gold • Pave Setting',
            img: 'https://html.awaikenthemes.com/cignet/images/product-image-6.png',
        },
        {
            id: 7,
            code: 'RJ-NCK-307',
            category: 'Necklaces',
            tag: 'Bridal Heritage',
            name: 'Grandeur Pearl Choker Necklace',
            specs: '22K Gold • South Sea Pearls',
            img: 'https://html.awaikenthemes.com/cignet/images/product-image-7.png',
        },
        {
            id: 8,
            code: 'RJ-EAR-208',
            category: 'Earrings',
            tag: 'Trending',
            name: 'Graceful Diamond Hoop Studs',
            specs: '18K Yellow Gold • Brilliant Cut Diamonds',
            img: 'https://html.awaikenthemes.com/cignet/images/product-image-8.png',
        },
    ]

    const toggleWishlist = (id) => {
        setWishlist((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
    }

    const filteredProducts =
        activeTab === 'All'
            ? products
            : products.filter((p) => p.category.toLowerCase() === activeTab.toLowerCase())

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

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
                    {filteredProducts.map((item) => {
                        const isWishlisted = wishlist.includes(item.id)
                        const inBag = isInEnquiry(item.id)

                        return (
                            <div
                                key={item.id}
                                className="group relative bg-white rounded-2xl overflow-hidden border border-[#EDE8E0] hover:border-[#d4af37]/60 hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                            >
                                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#F9F7F3] flex items-center justify-center p-6">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-sm"
                                    />


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

                <div className="flex items-center justify-center w-full h-fit p-5">
                    <button className='px-8 py-3.5 rounded-full bg-[#304037] text-[#f3e5ab] hover:bg-[#24312a] font-roboto font-medium text-sm tracking-wide shadow-xl flex items-center gap-2.5 cursor-pointer transition-all duration-300' >Explore more Designs</button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                    {enquiryItems.length > 0 && (
                        <button
                            onClick={() => setIsDrawerOpen(true)}
                            className="px-8 py-3.5 rounded-full bg-[#304037] text-[#f3e5ab] hover:bg-[#24312a] font-roboto font-medium text-sm tracking-wide shadow-xl flex items-center gap-2.5 cursor-pointer transition-all duration-300"
                        >
                            <BsBagCheck className="text-lg text-[#d4af37]" />
                            <span>View Enquiry Bag ({enquiryItems.length} Pieces)</span>
                            <HiArrowRight className="text-base" />
                        </button>
                    )}
                </div>
            </div>

            {enquiryItems.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#304037] text-white px-6 py-3.5 rounded-full shadow-2xl border border-[#d4af37]/50 flex items-center gap-4 sm:gap-6 backdrop-blur-md animate-fade-in">
                    <div className="flex items-center gap-2 text-sm font-roboto">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] animate-ping" />
                        <span className="font-semibold text-[#f3e5ab]">
                            {enquiryItems.length} {enquiryItems.length === 1 ? 'Design' : 'Designs'}
                        </span>
                        <span className="hidden sm:inline text-gray-300">in Enquiry Bag</span>
                    </div>

                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="bg-[#d4af37] hover:bg-[#e0be53] text-[#1c2922] px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all duration-300 cursor-pointer"
                    >
                        <FaWhatsapp className="text-base text-[#1c2922]" />
                        <span>Send WhatsApp Enquiry</span>
                    </button>
                </div>
            )}
        </section>
    )
}

export default OurProducts