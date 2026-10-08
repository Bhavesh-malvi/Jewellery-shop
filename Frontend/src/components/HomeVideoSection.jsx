import React from 'react'

const HomeVideoSection = () => {
    const pillars = [
        {
            icon: 'https://html.awaikenthemes.com/cignet/images/icon-intro-video-item-1.svg',
            title: 'Bespoke Craftsmanship',
            desc: 'Custom Handcrafted In-House',
        },
        {
            icon: 'https://html.awaikenthemes.com/cignet/images/icon-intro-video-item-2.svg',
            title: 'The Purity Guarantee',
            desc: 'BIS Hallmarked 916 & Certified Gems',
        },
        {
            icon: 'https://html.awaikenthemes.com/cignet/images/icon-intro-video-item-3.svg',
            title: 'Complete Transparency',
            desc: 'Zero Hidden Charges & Detailed Bills',
        },
        {
            icon: 'https://html.awaikenthemes.com/cignet/images/icon-intro-video-item-4.svg',
            title: 'Lifetime Maintenance',
            desc: 'Complimentary Cleaning & Polish',
        },
    ]

    return (
        <section className="relative w-full min-h-[580px] lg:min-h-[640px] overflow-hidden flex flex-col justify-between py-12 lg:py-16">
            {/* Background Video */}
            <video
                className="absolute inset-0 w-full h-full object-cover scale-105"
                src="https://demo.awaikenthemes.com/assets/videos/cignet-intro-video.mp4"
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Cinematic Gradient Dark Overlay for Perfect Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/70 pointer-events-none" />

            {/* Center Brand Statement */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center my-auto space-y-4">
                <div className="inline-flex items-center gap-2 border border-[#d4af37]/50 px-4 py-1.5 rounded-full text-xs font-roboto uppercase tracking-widest text-[#f3e5ab] bg-black/40 backdrop-blur-md shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
                    <span>Crafted With Royal Passion</span>
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-playfair font-normal text-white tracking-tight leading-tight drop-shadow-md">
                    Where Timeless Heritage Meets Modern Brilliance
                </h2>

                <p className="text-gray-300 text-sm sm:text-base font-roboto font-light max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                    Experience the pinnacle of Indian craftsmanship, certified purity, and unconditional trust in every heirloom piece we craft.
                </p>
            </div>

            {/* Bottom 4 Trust Pillars (Glassmorphic Bar) */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 shadow-2xl">
                    {pillars.map((item, index) => (
                        <div
                            key={index}
                            className={`group flex flex-col items-center text-center space-y-2 lg:px-6 transition-transform duration-300 hover:-translate-y-1 ${
                                index !== pillars.length - 1 ? 'lg:border-r lg:border-white/20' : ''
                            }`}
                        >
                            <div className="w-14 h-14 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-110 shadow-sm">
                                <img
                                    src={item.icon}
                                    alt={item.title}
                                    className="w-7 h-7 filter brightness-0 invert"
                                />
                            </div>
                            <h3 className="text-white font-playfair text-lg sm:text-xl font-medium tracking-wide">
                                {item.title}
                            </h3>
                            <p className="text-gray-300 text-xs font-roboto font-light leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HomeVideoSection