import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { BsBagHeart } from 'react-icons/bs'
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5'
import { HiOutlineBars3, HiXMark, HiChevronDown } from 'react-icons/hi2'
import { FiSmartphone } from 'react-icons/fi'
import Logo from '../../public/logo.png'
import { useEnquiry } from '../context/EnquiryContext'
import { usePwa } from '../context/PwaContext'

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { enquiryItems, setIsDrawerOpen } = useEnquiry()
    const { openQrModal, installApp } = usePwa()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isKaratDropdownOpen, setIsKaratDropdownOpen] = useState(false)
    const karatDropdownRef = useRef(null)

    const karatCategories = [
        {
            karat: '22K',
            title: '22K Gold Jewellery',
            hallmark: 'BIS 916 Hallmark',
            desc: '91.6% Pure Gold • Bridal, Kadas & Royal Necklaces',
            path: '/catalogue?karat=22k',
        },
        {
            karat: '20K',
            title: '20K Traditional Gold',
            hallmark: 'BIS 833 Purity',
            desc: '83.3% Pure Gold • Antique Filigree & Daily Heritage',
            path: '/catalogue?karat=20k',
        },
        {
            karat: '18K',
            title: '18K Diamond & Gold',
            hallmark: 'BIS 750 Fine',
            desc: '75.0% Fine Gold • Solitaire Rings & Modern Luxury',
            path: '/catalogue?karat=18k',
        },
    ]

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (karatDropdownRef.current && !karatDropdownRef.current.contains(event.target)) {
                setIsKaratDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        setIsKaratDropdownOpen(false)
        setIsMenuOpen(false)
    }, [location])

    return (
        <header className="w-full sticky top-0 z-50 bg-primary shadow-md border-b border-[#3e5247]">
            {/* Top Announcement Bar */}
            <div className="w-full bg-[#24312a] text-gold-light text-xs sm:text-sm py-2 px-4 text-center tracking-widest font-roboto border-b border-[#34463c] flex items-center justify-center gap-2">
                <span className="text-gold text-xs">✦</span>
                <span className="font-light">Exclusive Engagement Rings & Fine Jewellery • Direct WhatsApp Enquiry Available</span>
                <span className="text-gold text-xs">✦</span>
            </div>

            {/* Main Navbar */}
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
                {/* Brand Logo */}
                <Link to="/" className="flex items-center shrink-0 group">
                    <img
                        src={Logo}
                        alt="Rangoli Jewellers"
                        className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
                    />
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-7 lg:gap-8">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `relative py-2 text-sm uppercase tracking-wider font-roboto font-medium transition-colors duration-200 group ${
                                isActive ? 'text-gold' : 'text-gray-200 hover:text-gold'
                            }`
                        }
                    >
                        Home
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full rounded-full" />
                    </NavLink>

                    <NavLink
                        to="/catalogue"
                        className={({ isActive }) =>
                            `relative py-2 text-sm uppercase tracking-wider font-roboto font-medium transition-colors duration-200 group ${
                                isActive && !location.search.includes('karat=') ? 'text-gold' : 'text-gray-200 hover:text-gold'
                            }`
                        }
                    >
                        Catalogue
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full rounded-full" />
                    </NavLink>

                    {/* Shop by Karat Dropdown */}
                    <div
                        ref={karatDropdownRef}
                        className="relative"
                        onMouseEnter={() => setIsKaratDropdownOpen(true)}
                        onMouseLeave={() => setIsKaratDropdownOpen(false)}
                    >
                        <button
                            type="button"
                            onClick={() => setIsKaratDropdownOpen((prev) => !prev)}
                            aria-expanded={isKaratDropdownOpen}
                            aria-haspopup="true"
                            className={`flex items-center gap-1.5 py-2 text-sm uppercase tracking-wider font-roboto font-medium transition-colors duration-200 cursor-pointer group ${
                                isKaratDropdownOpen || location.search.includes('karat=')
                                    ? 'text-gold'
                                    : 'text-gray-200 hover:text-gold'
                            }`}
                        >
                            <span>Shop by Karat</span>
                            <HiChevronDown
                                className={`text-sm transition-transform duration-300 ${
                                    isKaratDropdownOpen ? 'rotate-180 text-gold' : 'text-gray-400 group-hover:text-gold'
                                }`}
                            />
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full rounded-full" />
                        </button>

                        {/* Dropdown Panel */}
                        {isKaratDropdownOpen && (
                            <div
                                role="menu"
                                className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-80 z-50"
                            >
                                <div className="bg-[#24312a] border border-gold/40 rounded-2xl shadow-2xl p-3 backdrop-blur-md space-y-2">
                                    <div className="px-2 py-1 border-b border-[#3e5247] flex items-center justify-between text-[11px] text-gray-400 font-roboto">
                                        <span className="uppercase tracking-widest text-gold font-semibold">Gold Purity Grades</span>
                                        <span>BIS Certified</span>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        {karatCategories.map((item) => (
                                            <Link
                                                key={item.karat}
                                                to={item.path}
                                                onClick={() => setIsKaratDropdownOpen(false)}
                                                className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#304037] border border-transparent hover:border-gold/30 transition-all duration-200"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-[#1b2520] border border-gold/30 flex items-center justify-center text-gold font-mono font-bold text-xs shrink-0 group-hover/item:border-gold group-hover/item:bg-gold group-hover/item:text-[#1b2520] transition-colors">
                                                    {item.karat}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-1">
                                                        <span className="text-sm font-roboto font-medium text-white group-hover/item:text-gold transition-colors">
                                                            {item.title}
                                                        </span>
                                                        <span className="text-[10px] font-mono text-gold-light bg-gold/15 px-1.5 py-0.5 rounded">
                                                            {item.hallmark}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] text-gray-300 font-roboto leading-snug mt-0.5 line-clamp-1">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="pt-2 border-t border-[#3e5247] px-1">
                                        <Link
                                            to="/catalogue"
                                            onClick={() => setIsKaratDropdownOpen(false)}
                                            className="text-xs text-gold-light hover:text-gold flex items-center justify-between font-roboto font-medium py-1 px-2 rounded-lg hover:bg-[#304037]/60 transition-colors"
                                        >
                                            <span>View All Karats in Catalogue</span>
                                            <span>→</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <NavLink
                        to="/collections"
                        className={({ isActive }) =>
                            `relative py-2 text-sm uppercase tracking-wider font-roboto font-medium transition-colors duration-200 group ${
                                isActive ? 'text-gold' : 'text-gray-200 hover:text-gold'
                            }`
                        }
                    >
                        Collections
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full rounded-full" />
                    </NavLink>

                    {/* Dedicated 925 Silver Navigation Link */}
                    <NavLink
                        to="/catalogue?metal=silver"
                        className={({ isActive }) =>
                            `relative py-2 text-sm uppercase tracking-wider font-roboto font-medium transition-colors duration-200 group flex items-center gap-1.5 ${
                                location.search.includes('metal=silver')
                                    ? 'text-white'
                                    : 'text-gray-200 hover:text-white'
                            }`
                        }
                    >
                        <span>925 Silver</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/15 text-slate-100 border border-white/30 font-semibold">
                            925
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-300 transition-all duration-300 group-hover:w-full rounded-full" />
                    </NavLink>

                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            `relative py-2 text-sm uppercase tracking-wider font-roboto font-medium transition-colors duration-200 group ${
                                isActive ? 'text-gold' : 'text-gray-200 hover:text-gold'
                            }`
                        }
                    >
                        Visit Showroom
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full rounded-full" />
                    </NavLink>
                </div>

                {/* Right Action Icons */}
                <div className="flex items-center gap-2 sm:gap-4 text-white">
                    {/* Search Bar / Icon */}
                    <div className="relative flex items-center">
                        {isSearchOpen ? (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    if (searchQuery.trim()) {
                                        navigate(`/catalogue?search=${encodeURIComponent(searchQuery.trim())}`)
                                        setIsSearchOpen(false)
                                    }
                                }}
                                className="flex items-center bg-[#24312a] border border-gold/40 rounded-full px-3 py-1.5 transition-all duration-300"
                            >
                                <IoSearchOutline className="text-gold text-lg mr-2 shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Search jewellery..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    className="bg-transparent text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none w-32 sm:w-44 font-roboto"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsSearchOpen(false)
                                        setSearchQuery('')
                                    }}
                                    className="text-gray-400 hover:text-white ml-1 text-lg cursor-pointer"
                                >
                                    <IoCloseOutline />
                                </button>
                            </form>
                        ) : (
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                aria-label="Search"
                                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-gray-200 hover:text-gold transition-all duration-200 cursor-pointer"
                            >
                                <IoSearchOutline className="text-xl" />
                            </button>
                        )}
                    </div>

                    {/* Download / Install App Button */}
                    <button
                        onClick={openQrModal}
                        title="Download / Install Rangoli App (QR Code)"
                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/40 text-xs font-roboto text-gray-200 hover:text-gold transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                    >
                        <FiSmartphone className="text-sm text-gold shrink-0" />
                        <span className="font-medium tracking-wide">Install App</span>
                    </button>

                    {/* Enquiry Bag Icon */}
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        aria-label="Enquiry Bag"
                        title="Open Enquiry Bag"
                        className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-gray-200 hover:text-gold transition-all duration-200 cursor-pointer group"
                    >
                        <BsBagHeart className="text-xl transition-transform duration-200 group-hover:scale-110" />
                        <span
                            className={`absolute -top-0.5 -right-0.5 text-[#24312a] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md transition-all ${
                                enquiryItems.length > 0
                                    ? 'bg-gold scale-110 ring-2 ring-white/20'
                                    : 'bg-gray-400 text-white'
                            }`}
                        >
                            {enquiryItems.length}
                        </span>
                    </button>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                        className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-gray-200 hover:text-gold transition-all duration-200 ml-1 cursor-pointer"
                    >
                        {isMenuOpen ? <HiXMark className="text-2xl" /> : <HiOutlineBars3 className="text-2xl" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#24312a] border-t border-[#3e5247] px-6 py-5 transition-all duration-300 max-h-[80vh] overflow-y-auto">
                    <ul className="flex flex-col gap-3.5 text-white">
                        <li>
                            <NavLink
                                to="/"
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block py-2 text-base uppercase tracking-wider font-roboto font-medium transition-colors ${
                                        isActive ? 'text-gold' : 'text-gray-200 hover:text-gold'
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/catalogue"
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block py-2 text-base uppercase tracking-wider font-roboto font-medium transition-colors ${
                                        isActive ? 'text-gold' : 'text-gray-200 hover:text-gold'
                                    }`
                                }
                            >
                                Catalogue
                            </NavLink>
                        </li>

                        {/* Mobile Shop by Karat Accordion / List */}
                        <li className="py-2 border-y border-[#3e5247]/60 space-y-2.5">
                            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-gold font-semibold font-roboto">
                                <span>Shop By Karat (Gold Purity)</span>
                                <span>BIS Certified</span>
                            </div>
                            <div className="grid grid-cols-1 gap-2 pl-2 border-l-2 border-gold/40">
                                {karatCategories.map((opt) => (
                                    <Link
                                        key={opt.karat}
                                        to={opt.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-[#1e2923] text-sm text-gray-200 hover:text-gold transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-gold font-bold font-mono text-xs">{opt.karat}</span>
                                            <span>{opt.title}</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-gold-light bg-gold/15 px-1.5 py-0.5 rounded">
                                            {opt.hallmark}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </li>

                        <li>
                            <NavLink
                                to="/collections"
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block py-2 text-base uppercase tracking-wider font-roboto font-medium transition-colors ${
                                        isActive ? 'text-gold' : 'text-gray-200 hover:text-gold'
                                    }`
                                }
                            >
                                Collections
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/catalogue?metal=silver"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-between py-2 text-base uppercase tracking-wider font-roboto font-medium text-slate-200 hover:text-white transition-colors"
                            >
                                <span>925 Silver Collection</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/15 text-slate-100 border border-white/30">
                                    Hallmarked
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contact"
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block py-2 text-base uppercase tracking-wider font-roboto font-medium transition-colors ${
                                        isActive ? 'text-gold' : 'text-gray-200 hover:text-gold'
                                    }`
                                }
                            >
                                Visit Showroom
                            </NavLink>
                        </li>

                        <li className="pt-3 border-t border-[#3e5247]/60 flex items-center justify-between text-sm">
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false)
                                    setIsDrawerOpen(true)
                                }}
                                className="flex items-center gap-2 text-gold font-medium cursor-pointer"
                            >
                                <BsBagHeart className="text-lg" />
                                <span>Enquiry Bag ({enquiryItems.length} Items)</span>
                            </button>
                        </li>

                        <li className="pt-2">
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false)
                                    installApp()
                                }}
                                className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl bg-white/10 border border-[#d4af37]/40 text-gold text-sm font-roboto font-medium cursor-pointer active:scale-98 transition-transform"
                            >
                                <span className="flex items-center gap-2">
                                    <FiSmartphone className="text-lg" />
                                    <span>Download App on Phone</span>
                                </span>
                                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#d4af37] text-[#1F2B24] font-bold">
                                    Free PWA
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    )
}

export default Navbar