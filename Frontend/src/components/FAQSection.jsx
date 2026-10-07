import React, { useState } from 'react'
import { GoDotFill } from 'react-icons/go'
import { FiPlus, FiMinus } from 'react-icons/fi'

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null)

    const faqs = [
        {
            question: 'What types of materials and gemstones do you use?',
            answer:
                'We use premium-quality gold (22K/18K), silver, platinum & ethically sourced, certified gemstones. Each material is carefully selected to ensure durability, brilliance, and long-lasting beauty.',
        },
        {
            question: 'Are your jewellery pieces certified and authentic?',
            answer:
                'Yes, all our gold jewellery is 100% BIS Hallmarked (916 & 750), and diamond pieces are certified by accredited gemological laboratories like IGI and SGL.',
        },
        {
            question: 'Do you offer customization or personalized jewellery?',
            answer:
                'Yes, we specialize in bespoke custom jewellery. You can connect with our designers on WhatsApp to create personalized rings, necklaces, and bridal sets.',
        },
        {
            question: 'How do I choose the right jewellery for an occasion?',
            answer:
                'Our jewellery consultants are available to guide you based on your occasion, style preference, and budget, ensuring you find the perfect matching piece.',
        },
        {
            question: 'What is your return, exchange, and refund policy?',
            answer:
                'We provide a 100% Lifetime Exchange Policy on gold value and certified diamonds, along with a transparent buyback and inspection service.',
        },
    ]

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index)
    }

    return (
        <section className="w-full py-16 sm:py-20 lg:py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                    {/* Left Column: Title & Information */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="inline-flex items-center gap-1.5 border border-[#304037]/25 px-3.5 py-1 rounded-full text-xs sm:text-sm text-primary font-roboto uppercase tracking-widest bg-[#304037]/5">
                            <GoDotFill className="text-xs text-[#d4af37]" />
                            <span>Frequently Asked Questions</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-[44px] text-primary font-playfair font-medium tracking-tight leading-[1.18]">
                            Common Questions About Our Collection
                        </h2>

                        <p className="text-gray-500 font-roboto font-light text-sm sm:text-base leading-relaxed max-w-md">
                            Find clear answers to the most common questions about our fashion and jewelry collection, helping you shop.
                        </p>

                        <div className="pt-2">
                            <button className="border border-gray-400 hover:border-[#304037] text-primary hover:bg-[#304037] hover:text-white px-7 py-3 rounded-md text-xs font-roboto font-semibold uppercase tracking-wider transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer">
                                View All FAQ's
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Accordion List */}
                    <div className="lg:col-span-7 divide-y divide-gray-200">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index

                            return (
                                <div key={index} className="transition-all duration-300">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full py-5 sm:py-6 flex items-start justify-between gap-4 text-left group cursor-pointer"
                                    >
                                        <h3
                                            className={`text-lg sm:text-xl font-playfair transition-colors duration-200 ${
                                                isOpen
                                                    ? 'text-primary font-medium'
                                                    : 'text-[#222E27] group-hover:text-primary font-normal'
                                            }`}
                                        >
                                            {faq.question}
                                        </h3>

                                        <span className="shrink-0 w-6 h-6 border border-gray-400 rounded flex items-center justify-center text-xs text-gray-600 transition-colors duration-200 group-hover:border-[#304037]">
                                            {isOpen ? <FiMinus /> : <FiPlus />}
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className="pb-6 pr-6 text-gray-500 text-sm sm:text-base font-roboto font-light leading-relaxed animate-fadeIn">
                                            <p>{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FAQSection
