import React from 'react'
import { GoDotFill } from 'react-icons/go'

const OurPromise = () => {
    const promises = [
        {
            icon: 'https://html.awaikenthemes.com/cignet/images/icon-promise-item-1.svg',
            title: 'Assured Fair Price Policy',
        },
        {
            icon: 'https://html.awaikenthemes.com/cignet/images/icon-promise-item-2.svg',
            title: 'Absolute Transparency',
        },
        {
            icon: 'https://html.awaikenthemes.com/cignet/images/icon-promise-item-3.svg',
            title: 'Certified 916 Gold Purity',
        },
        {
            icon: 'https://html.awaikenthemes.com/cignet/images/icon-promise-item-4.svg',
            title: 'Safe Jewellery Purchase Scheme',
        },
        {
            icon: 'https://html.awaikenthemes.com/cignet/images/icon-promise-item-5.svg',
            title: 'Karat Purity Analyser',
        },
    ]

    return (
        <section className="w-full py-16 sm:py-20 lg:py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
                {/* Section Header */}
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="inline-flex items-center gap-1.5 border border-[#304037]/25 px-3.5 py-1 rounded-full text-xs sm:text-sm text-primary font-roboto uppercase tracking-widest bg-[#304037]/5">
                        <GoDotFill className="text-xs text-[#d4af37]" />
                        <span>Our Promise</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-[42px] text-primary font-playfair font-medium tracking-tight leading-tight">
                        The Promise of Perfection
                    </h2>
                </div>

                {/* 5 Promise Items */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-0">
                    {promises.map((item, index) => (
                        <div
                            key={index}
                            className={`group flex flex-col items-center text-center relative px-2 sm:px-4 lg:px-6 transition-transform duration-300 ${
                                index !== promises.length - 1 ? 'lg:border-r lg:border-gray-200' : ''
                            }`}
                        >
                            {/* Icon Box */}
                            <div className="relative w-full aspect-square max-w-[170px] bg-[#F7F7F7] group-hover:bg-[#304037] rounded-xl flex items-center justify-center p-6 sm:p-7 transition-all duration-500 shadow-xs group-hover:shadow-xl overflow-hidden cursor-pointer">
                                <img
                                    src={item.icon}
                                    alt={item.title}
                                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain transition-all duration-500 group-hover:brightness-0 group-hover:invert group-hover:scale-110"
                                />
                            </div>

                            {/* Title Content */}
                            <div className="mt-5 max-w-[180px]">
                                <h3 className="text-base sm:text-lg lg:text-[19px] font-playfair text-[#222E27] font-normal leading-snug group-hover:text-[#304037] transition-colors duration-300">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default OurPromise
