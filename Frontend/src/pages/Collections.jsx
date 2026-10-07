import React from 'react'
import { Link } from 'react-router-dom'
import { GoDotFill } from 'react-icons/go'
import { FaWhatsapp } from 'react-icons/fa6'
import { HiArrowRight } from 'react-icons/hi2'
import { useEnquiry } from '../context/EnquiryContext'

const Collections = () => {
    const { whatsappNumber } = useEnquiry()

    const collections = [
        {
            title: 'The Vivah Bridal Heritage',
            subtitle: 'Grandeur for the Modern Royal Bride',
            tag: 'Bridal Couture',
            description:
                'Every bridal piece is crafted with ancestral blessings and certified perfection. Featuring handcrafted Kundan chokers, multilayered Raani Haars, bespoke bridal bangles, and ornate jhumkas.',
            highlights: ['22K BIS 916 Hallmark Gold', 'Natural Uncut Polki Diamonds', 'Custom Weight & Length Fitting'],
            img: 'https://html.awaikenthemes.com/cignet/images/collection-item-image-2.jpg',
            featuredCount: '45+ Bridal Designs',
        },
        {
            title: 'Men’s Sovereign Collection',
            subtitle: 'Bold Statement of Distinction & Heritage',
            tag: 'Men’s Fine Jewellery',
            description:
                'Designed for the gentleman who commands respect. Solid carved 22K kadas, solitaire signet rings, textured bracelets, and heavy gold chains crafted for lifetime durability.',
            highlights: ['Solid Heavy 22K Gold Casting', 'VVS Diamond Accent Rings', 'Comfort Inner Curve Design'],
            img: 'https://html.awaikenthemes.com/cignet/images/collection-item-image-1.jpg',
            featuredCount: '30+ Men Designs',
        },
        {
            title: 'Polki, Kundan & Jadau Splendour',
            subtitle: 'Centuries of Rajasthani Heritage Craftsmanship',
            tag: 'Heirloom Art',
            description:
                'Uncut Syndicate polki diamonds embedded in 24K gold foil with traditional Meenakari enamel on the reverse. Masterpieces destined to be passed down through generations.',
            highlights: ['Syndicate Quality Polki', 'Pure 24K Foil Jadau Technique', 'Natural Zambian Emerald Drops'],
            img: 'https://html.awaikenthemes.com/cignet/images/top-offer-item-image-3.png',
            featuredCount: '25+ Heirloom Pieces',
        },
        {
            title: 'Minimalist Everyday Brilliance',
            subtitle: 'Understated Elegance for Daily Life & Workwear',
            tag: 'Daily Luxury',
            description:
                'Lightweight 18K rose gold, yellow gold, and platinum creations crafted for everyday comfort. Delicate tennis bracelets, solitaire pendant chains, and micro-pave eternity bands.',
            highlights: ['Comfort Fit Daily Wear', 'Certified Natural Diamonds', 'Tarnish-Resistant Finish'],
            img: 'https://html.awaikenthemes.com/cignet/images/top-offer-item-image-2.png',
            featuredCount: '40+ Daily Wear Pieces',
        },
    ]

    return (
        <div className="w-full bg-[#FAFAF8] min-h-screen">
            {/* Header Banner */}
            <div className="bg-[#304037] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#3e5247] text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 border border-[#d4af37]/40 px-4 py-1 rounded-full text-xs font-roboto uppercase tracking-widest text-[#f3e5ab] bg-[#24312a]/60 backdrop-blur-sm">
                    <GoDotFill className="text-xs text-[#d4af37]" />
                    <span>Curated Design Lookbooks</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-playfair font-normal tracking-tight">
                    Our Thematic Jewellery Collections
                </h1>

                <p className="text-gray-300 text-sm sm:text-base font-roboto font-light max-w-2xl mx-auto leading-relaxed">
                    Explore curated lookbooks designed for weddings, royal festivities, daily celebrations, and sovereign gentlemen.
                </p>
            </div>

            {/* Collection Showcase List */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
                {collections.map((item, index) => {
                    const isEven = index % 2 === 1

                    return (
                        <div
                            key={index}
                            className={`p-8 sm:p-12 rounded-3xl bg-white border border-[#EDE8E0] hover:border-[#d4af37]/60 shadow-sm hover:shadow-xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                                isEven ? 'lg:flex-row-reverse' : ''
                            }`}
                        >
                            {/* Text Details (7 cols) */}
                            <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-2' : ''}`}>
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold font-roboto">
                                            {item.tag}
                                        </span>
                                        <span className="text-xs text-gray-400 font-roboto">• {item.featuredCount}</span>
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-medium text-primary leading-tight">
                                        {item.title}
                                    </h2>

                                    <p className="text-sm font-roboto font-medium text-[#304037]/80 italic">
                                        {item.subtitle}
                                    </p>
                                </div>

                                <p className="text-[#6B7572] font-roboto font-light text-sm sm:text-base leading-relaxed">
                                    {item.description}
                                </p>

                                {/* Highlights */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                                    {item.highlights.map((h, hIdx) => (
                                        <div key={hIdx} className="flex items-center gap-2 text-xs sm:text-sm font-roboto text-gray-700">
                                            <span className="text-[#d4af37]">✦</span>
                                            <span>{h}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* WhatsApp Consultation CTA */}
                                <div className="pt-4 flex flex-wrap items-center gap-4">
                                    <a
                                        href={`https://wa.me/${whatsappNumber}?text=Namaste%20Rangoli%20Jewellers,%20I%20am%20interested%20in%20exploring%20the%20${encodeURIComponent(
                                            item.title
                                        )}.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#304037] hover:bg-[#233029] text-white text-xs sm:text-sm font-roboto font-medium tracking-wide transition-all duration-300 shadow-sm cursor-pointer border border-[#304037] hover:border-[#d4af37]"
                                    >
                                        <FaWhatsapp className="text-lg text-[#d4af37]" />
                                        <span>Consult on WhatsApp</span>
                                    </a>

                                    <Link
                                        to="/catalogue"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-gray-100 text-[#304037] text-xs sm:text-sm font-roboto font-medium tracking-wide transition-all duration-300 shadow-sm cursor-pointer border border-gray-300 hover:border-[#304037]"
                                    >
                                        <span>Browse Catalogue</span>
                                        <HiArrowRight className="text-base" />
                                    </Link>
                                </div>
                            </div>

                            {/* Image Showcase (5 cols) */}
                            <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : ''}`}>
                                <div className="relative rounded-2xl overflow-hidden bg-[#F9F7F3] p-4 flex items-center justify-center border border-gray-100 shadow-sm group">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-72 sm:h-84 object-contain rounded-xl transition-transform duration-700 group-hover:scale-108"
                                    />
                                    <div className="absolute bottom-4 left-4 bg-[#304037]/85 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-full text-xs font-roboto">
                                        <span className="text-[#f3e5ab] font-medium">{item.featuredCount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Collections
