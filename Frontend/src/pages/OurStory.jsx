import React from 'react'
import { GoDotFill } from 'react-icons/go'
import { FaWhatsapp } from 'react-icons/fa6'
import { BsShieldCheck, BsGem, BsAward, BsArrowRepeat } from 'react-icons/bs'
import { useEnquiry } from '../context/EnquiryContext'

const OurStory = () => {
    const { whatsappNumber } = useEnquiry()

    const craftSteps = [
        {
            num: '01',
            title: 'Concept & Artistic Sketch',
            desc: 'Every jewel begins as an intimate hand-drawn sketch inspired by royal architecture, Indian flora, and ancestral traditions.',
        },
        {
            num: '02',
            title: '3D CAD & Precision Wax',
            desc: 'Our digital jewellery artists convert the sketch into an exact 3D render to ensure ergonomic comfort and balanced weight.',
        },
        {
            num: '03',
            title: 'Pure Gold Casting',
            desc: 'Refined 22K and 18K gold is melted and vacuum-cast with exact metallurgical alloy composition for strength and luster.',
        },
        {
            num: '04',
            title: 'Handcrafted Stone Setting',
            desc: 'Master artisans with 20+ years of experience handset every diamond and gemstone under stereoscopic magnification.',
        },
        {
            num: '05',
            title: 'Government Hallmark Testing',
            desc: 'Every piece is sent to government-approved testing centers for laser BIS 916 hallmarking and gemological verification.',
        },
        {
            num: '06',
            title: 'Mirror Finish & Heritage Box',
            desc: 'The jewel undergoes multi-stage ultrasonic cleaning and final rouge polishing before resting in our signature velvet box.',
        },
    ]

    const trustCards = [
        {
            icon: <BsShieldCheck className="text-3xl text-[#d4af37]" />,
            title: '100% BIS Hallmarked 916',
            desc: 'Zero compromise on purity. Every gram of gold is certified and stamped with the government hallmark.',
        },
        {
            icon: <BsGem className="text-3xl text-[#d4af37]" />,
            title: 'Certified Natural Diamonds',
            desc: 'We only set ethically sourced, conflict-free natural diamonds certified by internationally accredited labs (IGI/SGL).',
        },
        {
            icon: <BsArrowRepeat className="text-3xl text-[#d4af37]" />,
            title: 'Lifetime Exchange Policy',
            desc: 'Your jewellery is an asset. We offer transparent 100% gold value exchange across any of our collections.',
        },
        {
            icon: <BsAward className="text-3xl text-[#d4af37]" />,
            title: 'Transparent Pricing & Billing',
            desc: 'Detailed breakups of gold weight, stone weight, making charges, and current rates on every tax invoice.',
        },
    ]

    return (
        <div className="w-full bg-[#FAFAF8] min-h-screen">
            {/* Hero Banner */}
            <div className="bg-[#304037] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#3e5247] text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 border border-[#d4af37]/40 px-4 py-1 rounded-full text-xs font-roboto uppercase tracking-widest text-[#f3e5ab] bg-[#24312a]/60 backdrop-blur-sm">
                    <GoDotFill className="text-xs text-[#d4af37]" />
                    <span>Heritage • Craftsmanship • Trust</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-playfair font-normal tracking-tight max-w-4xl mx-auto">
                    The Story Behind Rangoli Jewellers
                </h1>

                <p className="text-gray-300 text-sm sm:text-base font-roboto font-light max-w-2xl mx-auto leading-relaxed">
                    Rooted in Ahmedabad, crafting timeless heirlooms with pure devotion, ancestral techniques, and modern perfection.
                </p>
            </div>

            {/* Brand Philosophy Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-6 space-y-6">
                        <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold font-roboto">
                            Our Ahmedabad Heritage
                        </span>

                        <h2 className="text-3xl sm:text-4xl font-playfair font-medium text-primary leading-tight">
                            More Than Ornaments, We Craft Family Heirlooms
                        </h2>

                        <p className="text-gray-600 font-roboto font-light text-sm sm:text-base leading-relaxed">
                            At <strong>Rangoli Jewellers</strong>, every piece is born from a legacy of uncompromising integrity. Situated in Rangoli Nagar, Narol, Ahmedabad, our showroom stands as a sanctuary of trusted jewellery shopping.
                        </p>

                        <p className="text-gray-600 font-roboto font-light text-sm sm:text-base leading-relaxed">
                            Whether you are choosing an engagement ring to pledge eternal love, preparing bridal jewellery for your wedding day, or investing in auspicious sovereign gold, our team ensures complete transparency and honest guidance.
                        </p>

                        <div className="pt-2">
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=Namaste%20Rangoli%20Jewellers,%20I%20would%20like%20to%20learn%20more%20about%20your%20jewellery%20heritage.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#304037] hover:bg-[#233029] text-white text-xs sm:text-sm font-roboto font-medium tracking-wide transition-all shadow-sm"
                            >
                                <FaWhatsapp className="text-lg text-[#d4af37]" />
                                <span>Talk to Our Jewellery Founder</span>
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-6">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                            <img
                                src="https://html.awaikenthemes.com/cignet/images/collection-item-image-2.jpg"
                                alt="Rangoli Craftsmanship"
                                className="w-full h-96 sm:h-[450px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                                <p className="text-white font-playfair text-xl sm:text-2xl font-light italic">
                                    “Purity is not a feature for us; it is our holy promise.”
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* The 6-Step Karigari Process */}
            <div className="bg-white py-16 sm:py-20 border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="text-center space-y-3">
                        <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold font-roboto">
                            The Making of a Jewel
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-playfair font-medium text-primary">
                            The 6 Stages of Master Karigari
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {craftSteps.map((step, idx) => (
                            <div
                                key={idx}
                                className="p-7 rounded-2xl bg-[#FAFAF8] border border-gray-200 hover:border-[#d4af37]/60 hover:shadow-lg transition-all space-y-3 group"
                            >
                                <span className="text-3xl font-playfair font-bold text-[#d4af37] block">
                                    {step.num}
                                </span>
                                <h3 className="text-lg font-playfair font-medium text-primary group-hover:text-[#d4af37] transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 font-roboto font-light leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4 Pillars of Trust */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-12">
                <div className="text-center space-y-3">
                    <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold font-roboto">
                        Zero Compromise
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-playfair font-medium text-primary">
                        Our Guarantees to Every Patron
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trustCards.map((card, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-2xl bg-white border border-[#EDE8E0] hover:border-[#d4af37] hover:shadow-xl transition-all space-y-3 text-center flex flex-col items-center"
                        >
                            <div className="w-14 h-14 rounded-full bg-[#304037]/5 flex items-center justify-center">
                                {card.icon}
                            </div>
                            <h3 className="text-base font-playfair font-medium text-primary">
                                {card.title}
                            </h3>
                            <p className="text-xs text-gray-500 font-roboto font-light leading-relaxed">
                                {card.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OurStory
