import React from 'react'
import { GoDotFill } from 'react-icons/go'
import { RiArrowRightUpLine } from 'react-icons/ri'
import { HiArrowRight } from 'react-icons/hi2'

const BestSeller = () => {
    const category = [
        {
            img: 'https://html.awaikenthemes.com/cignet/images/top-selling-item-image-1.jpg',
            name: 'Earrings',
            items: '48 Designs',
        },
        {
            img: 'https://html.awaikenthemes.com/cignet/images/top-selling-item-image-2.jpg',
            name: 'Necklaces',
            items: '36 Designs',
        },
        {
            img: 'https://html.awaikenthemes.com/cignet/images/top-selling-item-image-3.jpg',
            name: 'Pendants',
            items: '24 Designs',
        },
        {
            img: 'https://html.awaikenthemes.com/cignet/images/top-selling-item-image-4.jpg',
            name: 'Bracelets',
            items: '30 Designs',
        },
        {
            img: 'https://html.awaikenthemes.com/cignet/images/top-selling-item-image-5.jpg',
            name: 'Rings',
            items: '64 Designs',
        },
        {
            img: 'https://html.awaikenthemes.com/cignet/images/top-selling-item-image-6.jpg',
            name: 'Chains',
            items: '18 Designs',
        },
    ]

    const offerCards = [
        {
            tag: 'Trending Now',
            title: 'Brilliant Gold Ring Collection',
            img: 'https://html.awaikenthemes.com/cignet/images/top-offer-item-image-1.png',
        },
        {
            tag: 'Special 15% Off',
            title: 'Golden Elegance Bracelet',
            img: 'https://html.awaikenthemes.com/cignet/images/top-offer-item-image-2.png',
        },
        {
            tag: 'Bespoke Bridal',
            title: 'Chic Necklaces for Her',
            img: 'https://html.awaikenthemes.com/cignet/images/top-offer-item-image-3.png',
        },
    ]

    return (
        <section className="w-full py-16 sm:py-20 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200/80 pb-6">
                    <div>
                        <div className="inline-flex items-center gap-1.5 border border-[#304037]/25 px-3.5 py-1 rounded-full text-xs sm:text-sm text-primary font-roboto uppercase tracking-widest bg-[#304037]/5">
                            <GoDotFill className="text-xs text-[#d4af37]" />
                            <span>Best Seller Collections</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-[42px] text-primary font-playfair font-medium tracking-tight leading-tight mt-3">
                            Top Selling Jewellery Collection
                        </h2>
                    </div>

                    <button className="group self-start md:self-end border border-[#304037] text-primary hover:bg-[#304037] hover:text-white px-7 py-3 rounded-full text-sm font-roboto font-medium transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md cursor-pointer">
                        <span>View All Collections</span>
                        <HiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </div>

                {/* 6 Circular Categories */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8">
                    {category.map((item, index) => (
                        <div key={index} className="group text-center flex flex-col items-center gap-3 cursor-pointer">
                            <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full p-1 border-2 border-transparent group-hover:border-[#d4af37] transition-all duration-500 shadow-md group-hover:shadow-xl bg-white">
                                <div className="w-full h-full rounded-full overflow-hidden">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="space-y-0.5">
                                <h3 className="text-lg sm:text-xl text-primary font-playfair font-normal tracking-wide group-hover:text-[#d4af37] transition-colors duration-300">
                                    {item.name}
                                </h3>
                                <p className="text-xs text-gray-400 font-roboto tracking-wider uppercase">{item.items}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3 Offer/Promo Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4">
                    {offerCards.map((offer, index) => (
                        <div
                            key={index}
                            className="group relative flex items-center justify-between rounded-2xl bg-[#F8F7F4] hover:bg-[#F3EFEA] border border-[#E9E4DC] p-6 sm:p-7 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
                        >
                            <div className="w-[60%] flex flex-col justify-center gap-3 z-10">
                                <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold font-roboto">
                                    {offer.tag}
                                </span>
                                <h3 className="text-xl sm:text-2xl text-primary font-playfair font-normal leading-snug group-hover:text-[#304037]">
                                    {offer.title}
                                </h3>
                                <div className="pt-2">
                                    <span className="text-sm font-roboto font-medium text-primary flex items-center gap-1.5 group-hover:text-[#d4af37] transition-colors cursor-pointer">
                                        View Collection{' '}
                                        <RiArrowRightUpLine className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </span>
                                </div>
                            </div>
                            <div className="w-[40%] flex justify-end">
                                <img
                                    src={offer.img}
                                    alt={offer.title}
                                    className="w-32 h-32 sm:w-36 sm:h-36 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BestSeller