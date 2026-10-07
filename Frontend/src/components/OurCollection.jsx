import React from 'react'
import { Link } from 'react-router-dom'
import { GoDotFill } from 'react-icons/go'
import { HiArrowRight } from 'react-icons/hi2'

const OurCollection = () => {
    const collections = [
        {
            tag: "Men's Fine Jewellery",
            title: 'New Collection For Men',
            description:
                "Our latest men's jewellery collection, crafted to reflect strength, masculine poise, and distinctive individuality.",
            highlights: ['✦ Sovereign Kadas & Bracelets', '✦ Solitaire Signet Rings'],
            img: 'https://html.awaikenthemes.com/cignet/images/collection-item-image-1.jpg',
            badge: 'Kadas & Rings',
        },
        {
            tag: "Women's Bridal & Grace",
            title: 'New Collection For Women',
            description:
                "Our latest women's jewellery collection, crafted to reflect eternal grace, intricate bridal heritage, and radiant glamour.",
            highlights: ['✦ Polki & Choker Necklaces', '✦ Handcrafted Royal Bangles'],
            img: 'https://html.awaikenthemes.com/cignet/images/collection-item-image-2.jpg',
            badge: 'Bridal & Daily Elegance',
        },
    ]

    return (
        <section className="w-full py-16 sm:py-20 lg:py-24 bg-[#FAFAF8] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                {/* Section Header */}
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="inline-flex items-center gap-1.5 border border-[#304037]/25 px-3.5 py-1 rounded-full text-xs sm:text-sm text-primary font-roboto uppercase tracking-widest bg-[#304037]/5">
                        <GoDotFill className="text-xs text-[#d4af37]" />
                        <span>Curated Distinction</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-[42px] text-primary font-playfair font-medium tracking-tight leading-tight">
                        Discover Our Signature Collections
                    </h2>

                    <p className="text-gray-500 text-sm sm:text-base font-roboto font-light max-w-2xl">
                        Handcrafted with meticulous devotion, celebrating timeless statements of power for him and celestial grace for her.
                    </p>
                </div>

                {/* Collection Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                    {collections.map((item, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-3xl border border-[#EDE8E0] hover:border-[#d4af37]/60 shadow-sm hover:shadow-2xl transition-all duration-500 p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row justify-between gap-6 sm:gap-8 items-center"
                        >
                            {/* Left Text Column */}
                            <div className="flex-1 flex flex-col justify-between h-full space-y-4">
                                <div className="space-y-2">
                                    <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold font-roboto">
                                        {item.tag}
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-playfair font-medium text-primary leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-[#6B7572] font-roboto font-light text-sm leading-relaxed pt-1">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Highlights */}
                                <div className="space-y-1 pt-1">
                                    {item.highlights.map((highlight, hIdx) => (
                                        <p key={hIdx} className="text-xs font-roboto text-gray-700 font-medium">
                                            {highlight}
                                        </p>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <div className="pt-2">
                                    <Link
                                        to="/collections"
                                        className="group/btn inline-flex items-center gap-2 border border-[#304037] text-primary hover:bg-[#304037] hover:text-white px-7 py-3 rounded-full text-xs sm:text-sm font-roboto font-medium tracking-wide transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                                    >
                                        <span>Explore Collection</span>
                                        <HiArrowRight className="text-base transition-transform duration-300 group-hover/btn:translate-x-1" />
                                    </Link>
                                </div>
                            </div>

                            {/* Right Image Column */}
                            <div className="relative w-full sm:w-52 md:w-60 h-64 sm:h-72 rounded-2xl overflow-hidden bg-[#F9F7F3] p-2 flex items-center justify-center shrink-0">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-108"
                                />

                                {/* Floating Tag */}
                                <span className="absolute bottom-4 left-4 bg-[#304037]/85 backdrop-blur-sm text-white text-[11px] font-roboto font-medium px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                                    {item.badge}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default OurCollection