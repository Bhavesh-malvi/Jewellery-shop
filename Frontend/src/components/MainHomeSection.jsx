import React from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa6'
import { GoDotFill } from 'react-icons/go'
import { HiArrowRight } from 'react-icons/hi2'
import { BsShieldCheck } from 'react-icons/bs'

const MainHomeSection = () => {
    return (
        <section className="relative min-h-[88vh] flex items-center bg-[url('https://html.awaikenthemes.com/cignet/images/hero-bg-image.jpg')] bg-cover bg-center bg-no-repeat overflow-hidden">
            {/* Elegant dark gradient overlay for optimal readability & luxury depth */}
            <div className="absolute inset-0 pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    {/* Left Column: Hero Text Content */}
                    <div className="lg:col-span-8 xl:col-span-7 space-y-6 text-white">
                        {/* Pill Tag */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#304037]/70 border border-[#d4af37]/40 text-[#f3e5ab] text-xs uppercase tracking-widest backdrop-blur-md shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
                            <span>Discover The Art Of Perfection</span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] font-playfair tracking-tight text-white">
                            Elevate Your Style With{' '}
                            <span className="italic text-[#f3e5ab] font-light">Timeless Fashion</span>
                        </h1>

                        {/* Description */}
                        <p className="text-gray-200 text-sm sm:text-base font-roboto font-light leading-relaxed max-w-xl">
                            Discover a curated collection of elegant fashion and premium jewellery designed to express your unique personality from everyday essentials to statement bridal pieces.
                        </p>

                        {/* Feature Points */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div className="flex items-center gap-2.5 text-gray-100 text-sm sm:text-base font-roboto">
                                <span className="text-[#d4af37] text-xl">✦</span>
                                <span className="font-medium">Premium Quality Materials</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-gray-100 text-sm sm:text-base font-roboto">
                                <span className="text-[#d4af37] text-xl">✦</span>
                                <span className="font-medium">Affordable Luxury Collection</span>
                            </div>
                        </div>

                        {/* Elegant Golden Divider */}
                        <div className="w-full h-[1px] bg-gradient-to-r from-[#d4af37]/60 via-white/20 to-transparent my-6" />

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
                            {/* Primary Button */}
                            <Link
                                to="/catalogue"
                                className="group px-8 py-3.5 rounded-full bg-[#d4af37] hover:bg-[#e0be53] text-[#1c2922] font-roboto font-semibold text-sm tracking-wide shadow-lg hover:shadow-[#d4af37]/30 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                            >
                                <span>Explore Collection</span>
                                <HiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                            {/* WhatsApp Button */}
                            <a
                                href="https://wa.me/917340681617?text=Hello%20Rangoli%20Jewellers,%20I%20would%20like%20to%20enquire%20about%20your%20jewellery%20collection."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-[#d4af37] font-roboto font-medium text-sm tracking-wide transition-all duration-300 flex items-center gap-2.5 backdrop-blur-md shadow-sm cursor-pointer"
                            >
                                <FaWhatsapp className="text-xl text-[#d4af37] group-hover:scale-110 transition-transform duration-200" />
                                <span>Enquiry on WhatsApp</span>
                            </a>
                        </div>
                    </div> 
                </div>
            </div>
        </section>
    )
}

export default MainHomeSection