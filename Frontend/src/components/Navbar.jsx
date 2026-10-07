import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BsBagHeart } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa6'
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5'
import { HiOutlineUser, HiOutlineBars3, HiXMark } from 'react-icons/hi2'
import Logo from '../../public/logo.png'
import { useEnquiry } from '../context/EnquiryContext'

const Navbar = () => {
    const navigate = useNavigate()
    const { enquiryItems, setIsDrawerOpen } = useEnquiry()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Catalogue', path: '/catalogue' },
        { name: 'Collections', path: '/collections' },
        { name: 'Our Story', path: '/about' },
        { name: 'Visit Showroom ', path: '/contact' },
    ]

    return (
        <header className="w-full sticky top-0 z-50 bg-[#304037] shadow-md border-b border-[#3e5247]">
            {/* Top Announcement Bar */}
            <div className="w-full bg-[#24312a] text-[#f3e5ab] text-xs sm:text-sm py-2 px-4 text-center tracking-widest font-roboto border-b border-[#34463c] flex items-center justify-center gap-2">
                <span className="text-[#d4af37] text-xs">✦</span>
                <span className="font-light">Exclusive Engagement Rings & Fine Jewellery • Direct WhatsApp Enquiry Available</span>
                <span className="text-[#d4af37] text-xs">✦</span>
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
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `relative py-2 text-sm uppercase tracking-wider font-roboto font-medium transition-colors duration-200 group ${
                                    isActive ? 'text-[#d4af37]' : 'text-gray-200 hover:text-[#d4af37]'
                                }`
                            }
                        >
                            {link.name}
                            {/* Animated gold underline */}
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#d4af37] transition-all duration-300 group-hover:w-full rounded-full" />
                        </NavLink>
                    ))}
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
                                className="flex items-center bg-[#24312a] border border-[#d4af37]/40 rounded-full px-3 py-1.5 transition-all duration-300"
                            >
                                <IoSearchOutline className="text-[#d4af37] text-lg mr-2 shrink-0" />
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
                                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-gray-200 hover:text-[#d4af37] transition-all duration-200 cursor-pointer"
                            >
                                <IoSearchOutline className="text-xl" />
                            </button>
                        )}
                    </div>

                    {/* Wishlist Icon */}
                    <button
                        aria-label="Wishlist"
                        className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-gray-200 hover:text-[#d4af37] transition-all duration-200 cursor-pointer"
                    >
                        <FaRegHeart className="text-lg" />
                    </button>

                    {/* Enquiry Bag Icon */}
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        aria-label="Enquiry Bag"
                        title="Open Enquiry Bag"
                        className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-gray-200 hover:text-[#d4af37] transition-all duration-200 cursor-pointer group"
                    >
                        <BsBagHeart className="text-xl transition-transform duration-200 group-hover:scale-110" />
                        <span
                            className={`absolute -top-0.5 -right-0.5 text-[#24312a] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md transition-all ${
                                enquiryItems.length > 0
                                    ? 'bg-[#d4af37] scale-110 ring-2 ring-white/20'
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
                        className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-gray-200 hover:text-[#d4af37] transition-all duration-200 ml-1 cursor-pointer"
                    >
                        {isMenuOpen ? <HiXMark className="text-2xl" /> : <HiOutlineBars3 className="text-2xl" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#24312a] border-t border-[#3e5247] px-6 py-5 transition-all duration-300">
                    <ul className="flex flex-col gap-4 text-white">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <NavLink
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block py-2 text-base uppercase tracking-wider font-roboto font-medium transition-colors ${
                                            isActive ? 'text-[#d4af37]' : 'text-gray-200 hover:text-[#d4af37]'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                        <li className="pt-3 border-t border-[#3e5247]/60 flex items-center justify-between text-sm">
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false)
                                    setIsDrawerOpen(true)
                                }}
                                className="flex items-center gap-2 text-[#d4af37] font-medium"
                            >
                                <BsBagHeart className="text-lg" />
                                <span>Enquiry Bag ({enquiryItems.length} Items)</span>
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    )
}

export default Navbar