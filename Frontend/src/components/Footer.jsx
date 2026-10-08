import React from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp, FaInstagram, FaFacebookF, FaPinterestP } from 'react-icons/fa6'
import { IoLocationOutline, IoCallOutline, IoMailOutline, IoTimeOutline } from 'react-icons/io5'
import { HiArrowRight } from 'react-icons/hi2'
import Logo from '../../public/logo.png'
import { useEnquiry } from '../context/EnquiryContext'

const Footer = () => {
    const { whatsappNumber } = useEnquiry()

    return (
        <footer className="w-full bg-[#304037] text-white border-t border-[#3e5247] relative">
            {/* Main Footer Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
                    {/* Column 1: Brand & WhatsApp Enquiry Box (lg:col-span-4) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Brand Logo */}
                        <Link to="/" className="inline-block group">
                            <img
                                src={Logo}
                                alt="Rangoli Jewellers"
                                className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </Link>

                        <p className="text-gray-300 text-sm font-roboto font-light leading-relaxed">
                            Crafting timeless memories with hallmarked gold, certified diamonds, and bespoke jewellery heritage. Designed for life’s most celebrated milestones.
                        </p>

                        {/* WhatsApp Enquiry Box (Replacing Email Newsletter) */}
                        <div className="p-5 rounded-2xl bg-[#24312a] border border-[#d4af37]/40 space-y-3.5 shadow-lg">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
                                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold font-roboto">
                                    Instant WhatsApp Enquiry
                                </span>
                            </div>

                            <p className="text-xs text-gray-300 font-roboto font-light leading-relaxed">
                                Connect directly with our master jewellery consultant for design catalogues, live gold rates, and custom quotes.
                            </p>

                            <a
                                href={`https://wa.me/${whatsappNumber}?text=Namaste%20Rangoli%20Jewellers,%20I%20have%20an%20enquiry%20regarding%20your%20jewellery%20catalogue.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between w-full py-3 px-4 rounded-xl bg-[#304037] hover:bg-[#1f2a24] text-white border border-[#3e5247] hover:border-[#d4af37] transition-all duration-300 shadow-sm cursor-pointer"
                            >
                                <span className="flex items-center gap-2.5 text-xs sm:text-sm font-roboto font-medium">
                                    <FaWhatsapp className="text-xl text-[#d4af37] group-hover:scale-110 transition-transform duration-200" />
                                    <span>Chat with Jewellery Expert</span>
                                </span>
                                <span className="w-7 h-7 rounded-lg bg-[#d4af37] text-[#1c2922] flex items-center justify-center text-xs font-bold transition-transform duration-300 group-hover:translate-x-1">
                                    <HiArrowRight />
                                </span>
                            </a>
                        </div>

                        {/* Social Media Links */}
                        <div className="flex items-center gap-3 pt-1">
                            {[
                                { icon: <FaInstagram />, href: '#', label: 'Instagram' },
                                { icon: <FaFacebookF />, href: '#', label: 'Facebook' },
                                { icon: <FaPinterestP />, href: '#', label: 'Pinterest' },
                                {
                                    icon: <FaWhatsapp />,
                                    href: `https://wa.me/${whatsappNumber}`,
                                    label: 'WhatsApp',
                                },
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    aria-label={social.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-[#24312a] border border-[#3e5247] hover:border-[#d4af37] text-gray-300 hover:text-[#d4af37] hover:bg-[#304037] flex items-center justify-center text-sm transition-all duration-300 shadow-sm"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links (lg:col-span-2) */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-base sm:text-lg font-playfair font-medium text-white tracking-wide border-b border-[#3e5247] pb-2.5 inline-block">
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5 text-sm font-roboto font-light text-gray-300">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'All Catalogue', path: '/catalogue' },
                                { name: '22K Gold (916)', path: '/catalogue?karat=22k' },
                                { name: '20K Gold (833)', path: '/catalogue?karat=20k' },
                                { name: '18K Diamond (750)', path: '/catalogue?karat=18k' },
                                { name: 'Collections', path: '/collections' },
                                { name: 'Our Story', path: '/about' },
                                { name: 'Visit Showroom', path: '/contact' },
                            ].map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={item.path}
                                        className="hover:text-[#d4af37] transition-colors duration-200 flex items-center gap-2 group"
                                    >
                                        <span className="text-[#d4af37] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                            ✦
                                        </span>
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Trust & Customer Policies (lg:col-span-3) */}
                    <div className="lg:col-span-3 space-y-4">
                        <h3 className="text-base sm:text-lg font-playfair font-medium text-white tracking-wide border-b border-[#3e5247] pb-2.5 inline-block">
                            Our Promises
                        </h3>
                        <ul className="space-y-2.5 text-sm font-roboto font-light text-gray-300">
                            {[
                                'BIS 916 Hallmarked Gold',
                                'IGI / SGL Certified Diamonds',
                                '100% Lifetime Exchange Policy',
                                'Safe Insured Transit & Delivery',
                                'Custom Jewellery Design Studio',
                                'Jewellery Care & Cleaning Guide',
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                                    <span className="text-[#d4af37] text-xs">✦</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact & Showroom Details (lg:col-span-3) */}
                    <div className="lg:col-span-3 space-y-4">
                        <h3 className="text-base sm:text-lg font-playfair font-medium text-white tracking-wide border-b border-[#3e5247] pb-2.5 inline-block">
                            Showroom Contact
                        </h3>

                        <div className="space-y-3.5 text-sm font-roboto font-light text-gray-300">
                            <div className="flex items-start gap-3">
                                <IoLocationOutline className="text-lg text-[#d4af37] shrink-0 mt-0.5" />
                                <div>
                                    <p className="leading-snug">
                                        Shop No 14, Pragati One, Nr. Hifi Char Rasta, Narolgam, Ahmedabad, Gujarat 382405
                                    </p>
                                    <a
                                        href="https://maps.google.com/?q=22.955048,72.584717"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-[11px] text-[#d4af37] hover:underline pt-1"
                                    >
                                        Get Directions on Maps →
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <IoCallOutline className="text-lg text-[#d4af37] shrink-0" />
                                <a
                                    href="tel:+917340681617"
                                    className="hover:text-[#d4af37] transition-colors"
                                >
                                    +91 7340681617
                                </a>
                            </div>

                            <div className="flex items-center gap-3">
                                <IoMailOutline className="text-lg text-[#d4af37] shrink-0" />
                                <a
                                    href="mailto:care@rangolijewellers.com"
                                    className="hover:text-[#d4af37] transition-colors"
                                >
                                    care@rangolijewellers.com
                                </a>
                            </div>

                            <div className="flex items-start gap-3">
                                <IoTimeOutline className="text-lg text-[#d4af37] shrink-0 mt-0.5" />
                                <p className="text-xs leading-relaxed text-gray-400">
                                    Mon - Sat: 10:30 AM - 8:30 PM
                                    <br />
                                    Sunday: By Prior Appointment
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright & Guarantee Strip */}
            <div className="w-full bg-[#24312a] border-t border-[#34463c] py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-roboto text-gray-400">
                    <p className="text-center sm:text-left">
                        © 2026 <span className="text-[#f3e5ab] font-medium">Rangoli Jewellers</span>. All Rights Reserved. Crafted with Timeless Passion.
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-gray-400 flex-wrap justify-center">
                        <span className="flex items-center gap-1 text-[#d4af37]">
                            <span>✦</span> BIS Hallmarked
                        </span>
                        <span className="flex items-center gap-1 text-[#d4af37]">
                            <span>✦</span> IGI Certified
                        </span>
                        <span className="flex items-center gap-1 text-[#d4af37]">
                            <span>✦</span> Insured Delivery
                        </span>
                        <span className="text-gray-600">•</span>
                        <Link
                            to="/admin"
                            className="hover:text-[#d4af37] transition-colors flex items-center gap-1 font-mono text-[10px] text-gray-400"
                        >
                            <span>🔐 Admin Portal</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
