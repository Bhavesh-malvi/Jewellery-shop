import React, { useState } from 'react'
import { GoDotFill } from 'react-icons/go'
import { FaWhatsapp } from 'react-icons/fa6'
import { IoLocationOutline, IoCallOutline, IoMailOutline, IoTimeOutline, IoNavigateCircleOutline } from 'react-icons/io5'
import { BsShieldCheck, BsCarFront, BsCupHot } from 'react-icons/bs'
import { useEnquiry } from '../context/EnquiryContext'

const VisitShowroom = () => {
    const { whatsappNumber } = useEnquiry()

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        requirement: 'Bridal Jewellery Consultation',
        message: '',
    })

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const text = `*Rangoli Jewellers - VIP Showroom Appointment Request*

Namaste! I would like to schedule an in-store appointment at your Narol, Ahmedabad showroom.

• *Name:* ${formData.name || 'Not provided'}
• *Contact Number:* ${formData.phone || 'Not provided'}
• *Preferred Date:* ${formData.date || 'Flexible'}
• *Interest / Requirement:* ${formData.requirement}
${formData.message ? `• *Special Notes:* ${formData.message}` : ''}

Please confirm the appointment slot. Thank you!`

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
        window.open(url, '_blank')
    }

    return (
        <div className="w-full bg-[#FAFAF8] min-h-screen">
            {/* Header Banner */}
            <div className="bg-[#304037] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#3e5247] text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 border border-[#d4af37]/40 px-4 py-1 rounded-full text-xs font-roboto uppercase tracking-widest text-[#f3e5ab] bg-[#24312a]/60 backdrop-blur-sm">
                    <GoDotFill className="text-xs text-[#d4af37]" />
                    <span>Ahmedabad Flagship Showroom</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-playfair font-normal tracking-tight">
                    Visit Our Jewellery Showroom
                </h1>

                <p className="text-gray-300 text-sm sm:text-base font-roboto font-light max-w-2xl mx-auto leading-relaxed">
                    Experience our mastercrafted jewellery in person. Visit our showroom in Narol, Ahmedabad or book a private bridal consultation slot.
                </p>
            </div>

            {/* Main Content: Info & Booking Form */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Showroom Details & Contact Cards */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold font-roboto">
                                Store Information
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-playfair font-medium text-primary mt-1">
                                Rangoli Jewellers, Ahmedabad
                            </h2>
                        </div>

                        {/* Contact Details List */}
                        <div className="space-y-5">
                            <div className="p-6 rounded-2xl bg-white border border-[#EDE8E0] shadow-sm flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#304037]/10 flex items-center justify-center text-[#304037] shrink-0 text-2xl">
                                    <IoLocationOutline />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-roboto font-semibold text-gray-900 uppercase tracking-wide">
                                        Showroom Address
                                    </h3>
                                    <p className="text-xs sm:text-sm font-roboto text-gray-600 leading-relaxed">
                                        Rangoli Jewellers, Rangoli Nagar, Narol, Ahmedabad, Gujarat 382405
                                    </p>
                                    <a
                                        href="https://maps.google.com/?q=Rangoli+Nagar+Narol+Ahmedabad"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] font-medium pt-1 hover:underline"
                                    >
                                        <IoNavigateCircleOutline className="text-base" />
                                        <span>Open in Google Maps</span>
                                    </a>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-white border border-[#EDE8E0] shadow-sm flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#304037]/10 flex items-center justify-center text-[#304037] shrink-0 text-2xl">
                                    <IoCallOutline />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-roboto font-semibold text-gray-900 uppercase tracking-wide">
                                        Phone & Direct Calling
                                    </h3>
                                    <a
                                        href="tel:+917340681617"
                                        className="text-sm font-roboto text-gray-700 hover:text-primary font-medium block"
                                    >
                                        +91 7340681617
                                    </a>
                                    <p className="text-xs text-gray-400 font-roboto">Available 10:30 AM to 8:30 PM</p>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-white border border-[#EDE8E0] shadow-sm flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#304037]/10 flex items-center justify-center text-[#304037] shrink-0 text-2xl">
                                    <IoTimeOutline />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-roboto font-semibold text-gray-900 uppercase tracking-wide">
                                        Showroom Timings
                                    </h3>
                                    <p className="text-xs sm:text-sm font-roboto text-gray-600">
                                        Monday – Saturday: 10:30 AM – 8:30 PM
                                    </p>
                                    <p className="text-xs text-gray-400 font-roboto">Sunday: By Prior Appointment</p>
                                </div>
                            </div>
                        </div>

                        {/* In-Store Amenities */}
                        <div className="p-6 rounded-2xl bg-[#304037] text-white space-y-4 shadow-lg">
                            <h3 className="text-base font-playfair font-medium text-[#f3e5ab]">
                                In-Store Experience & Amenities
                            </h3>
                            <div className="grid grid-cols-2 gap-3 text-xs font-roboto text-gray-300">
                                <div className="flex items-center gap-2">
                                    <BsShieldCheck className="text-[#d4af37] text-base" />
                                    <span>Live Karatmeter Testing</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BsCupHot className="text-[#d4af37] text-base" />
                                    <span>Private Bridal Lounge</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BsCarFront className="text-[#d4af37] text-base" />
                                    <span>Convenient Parking</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#d4af37]">✦</span>
                                    <span>Free Cleaning & Polish</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Book In-Store Consultation Form */}
                    <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-[#EDE8E0] shadow-xl space-y-6">
                        <div>
                            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold font-roboto">
                                VIP Appointment
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-playfair font-medium text-primary mt-1">
                                Schedule a Showroom Consultation
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 font-roboto font-light mt-1.5 leading-relaxed">
                                Book a dedicated jewellery consultant for bridal selection, engagement rings, or custom gold order discussions.
                            </p>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-roboto uppercase tracking-wider text-gray-700 font-medium mb-1.5">
                                        Your Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-roboto focus:outline-none focus:border-[#304037] bg-[#FAFAF8]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-roboto uppercase tracking-wider text-gray-700 font-medium mb-1.5">
                                        WhatsApp Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="e.g. 7340681617"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-roboto focus:outline-none focus:border-[#304037] bg-[#FAFAF8]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-roboto uppercase tracking-wider text-gray-700 font-medium mb-1.5">
                                        Preferred Date
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-roboto focus:outline-none focus:border-[#304037] bg-[#FAFAF8]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-roboto uppercase tracking-wider text-gray-700 font-medium mb-1.5">
                                        Occasion / Requirement
                                    </label>
                                    <select
                                        value={formData.requirement}
                                        onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-roboto focus:outline-none focus:border-[#304037] bg-[#FAFAF8]"
                                    >
                                        <option value="Bridal Jewellery Consultation">Bridal Jewellery Consultation</option>
                                        <option value="Engagement Rings & Solitaires">Engagement Rings & Solitaires</option>
                                        <option value="Men's Fine Jewellery">Men's Fine Jewellery</option>
                                        <option value="Bespoke Custom Jewellery">Bespoke Custom Jewellery</option>
                                        <option value="General Catalogue Viewing">General Catalogue Viewing</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-roboto uppercase tracking-wider text-gray-700 font-medium mb-1.5">
                                    Special Notes / Specific Design Interest
                                </label>
                                <textarea
                                    rows="3"
                                    placeholder="Tell us if you have any specific gold weight, diamond carat, or design preferences..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-roboto focus:outline-none focus:border-[#304037] bg-[#FAFAF8]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 rounded-xl bg-[#304037] hover:bg-[#233029] text-white font-roboto font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2.5 cursor-pointer border border-[#304037] hover:border-[#d4af37]"
                            >
                                <FaWhatsapp className="text-xl text-[#d4af37]" />
                                <span>Confirm Appointment via WhatsApp</span>
                            </button>

                            <p className="text-[11px] text-gray-400 text-center font-roboto">
                                ✦ We will instantly confirm your consultation slot on WhatsApp (+91 7340681617).
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VisitShowroom
