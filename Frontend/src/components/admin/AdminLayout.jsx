import React, { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
    HiOutlineSquares2X2,
    HiOutlineSparkles,
    HiOutlinePlusCircle,
    HiOutlineArrowRightOnRectangle,
    HiOutlineArrowTopRightOnSquare,
    HiOutlineBars3,
    HiOutlineXMark,
    HiOutlineShieldCheck,
} from 'react-icons/hi2'
import { BsPatchCheckFill } from 'react-icons/bs'
import { useAdminAuth } from '../../context/AdminAuthContext'

const AdminLayout = () => {
    const { adminUser, logout } = useAdminAuth()
    const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/admin/login')
    }

    const navItems = [
        {
            path: '/admin',
            label: 'Dashboard',
            icon: HiOutlineSquares2X2,
            end: true,
        },
        {
            path: '/admin/products',
            label: 'Jewellery Catalogue',
            icon: HiOutlineSparkles,
        },
        {
            path: '/admin/products/new',
            label: 'Add New Design',
            icon: HiOutlinePlusCircle,
        },
    ]

    return (
        <div className="min-h-screen bg-[#F8F6F0] font-roboto text-gray-800">
            {/* Desktop Fixed Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 z-30 bg-[#1F2B24] text-white border-r border-[#d4af37]/20 select-none shadow-xl">
                {/* Brand Logo Box */}
                <div className="p-6 border-b border-[#304037] flex flex-col items-center text-center shrink-0">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#f3e5ab] p-0.5 flex items-center justify-center shadow-md mb-2">
                        <div className="w-full h-full rounded-full bg-[#1F2B24] flex items-center justify-center text-[#d4af37] font-playfair font-bold text-lg">
                            RJ
                        </div>
                    </div>
                    <span className="font-playfair text-lg font-medium tracking-wide text-[#FAF7F2]">
                        Rangoli Jewellers
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-mono mt-0.5">
                        Admin Portal
                    </span>
                </div>

                {/* Navigation Links (Scrollable if height is constrained) */}
                <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
                    <p className="px-3 text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-2">
                        Showroom Management
                    </p>
                    {navItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.end}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all duration-200 ${
                                        isActive
                                            ? 'bg-[#304037] text-[#d4af37] border border-[#d4af37]/50 shadow-sm font-semibold'
                                            : 'text-gray-300 hover:text-white hover:bg-[#2A3B31]'
                                    }`
                                }
                            >
                                <Icon className="text-lg shrink-0" />
                                <span>{item.label}</span>
                            </NavLink>
                        )
                    })}

                    <div className="pt-6">
                        <p className="px-3 text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-2">
                            Quick Links
                        </p>
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-[#2A3B31] transition-colors"
                        >
                            <span className="flex items-center gap-3">
                                <HiOutlineArrowTopRightOnSquare className="text-lg" />
                                <span>View Public Store</span>
                            </span>
                            <span className="text-[10px] text-[#d4af37] bg-[#304037] px-1.5 py-0.5 rounded font-mono">
                                Live
                            </span>
                        </a>
                        <Link
                            to="/catalogue"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-[#2A3B31] transition-colors mt-1"
                        >
                            <span className="flex items-center gap-3">
                                <HiOutlineSparkles className="text-lg text-[#d4af37]" />
                                <span>Public Catalogue</span>
                            </span>
                            <span className="text-[10px] text-gray-400">
                                ↗
                            </span>
                        </Link>
                    </div>
                </nav>

                {/* Admin Profile & Logout Box - Pinned to Bottom */}
                <div className="p-4 border-t border-[#304037] bg-[#1A251F] shrink-0">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-full bg-[#304037] border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] font-semibold text-xs shrink-0">
                            {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-medium text-white truncate">
                                {adminUser?.name || 'Administrator'}
                            </p>
                            <p className="text-[11px] text-gray-400 truncate font-mono">
                                {adminUser?.email || 'admin@rangoli.com'}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full py-2 px-3 rounded-lg text-xs font-medium text-red-300 hover:text-red-200 hover:bg-red-950/40 border border-red-900/30 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                        <HiOutlineArrowRightOnRectangle className="text-base" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Fixed Slide-Over Drawer with Backdrop */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Drawer Panel */}
                    <aside className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-[#1F2B24] text-white flex flex-col z-50 shadow-2xl border-r border-[#d4af37]/30 select-none">
                        {/* Drawer Header */}
                        <div className="p-5 border-b border-[#304037] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#304037] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-playfair font-bold text-base">
                                    RJ
                                </div>
                                <div>
                                    <h2 className="font-playfair text-base font-medium text-white leading-tight">
                                        Rangoli Jewellers
                                    </h2>
                                    <span className="text-[10px] text-[#d4af37] font-mono uppercase tracking-wider block">
                                        Admin Portal
                                    </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
                                aria-label="Close menu"
                            >
                                <HiOutlineXMark className="text-xl" />
                            </button>
                        </div>

                        {/* Drawer Nav */}
                        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
                            <p className="px-3 text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-2">
                                Navigation
                            </p>
                            {navItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        end={item.end}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-colors ${
                                                isActive
                                                    ? 'bg-[#304037] text-[#d4af37] border border-[#d4af37]/50 font-semibold'
                                                    : 'text-gray-300 hover:text-white hover:bg-[#2A3B31]'
                                            }`
                                        }
                                    >
                                        <Icon className="text-lg shrink-0" />
                                        <span>{item.label}</span>
                                    </NavLink>
                                )
                            })}

                            <div className="pt-6">
                                <p className="px-3 text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-2">
                                    Quick Links
                                </p>
                                <a
                                    href="/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-[#2A3B31]"
                                >
                                    <span className="flex items-center gap-3">
                                        <HiOutlineArrowTopRightOnSquare className="text-lg" />
                                        <span>Live Store</span>
                                    </span>
                                    <span className="text-[10px] text-[#d4af37] bg-[#304037] px-1.5 py-0.5 rounded font-mono">
                                        Live
                                    </span>
                                </a>
                            </div>
                        </nav>

                        {/* Drawer Profile & Logout */}
                        <div className="p-4 border-t border-[#304037] bg-[#1A251F]">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-[#304037] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-semibold text-xs">
                                    {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : 'A'}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs font-medium text-white truncate">
                                        {adminUser?.name || 'Administrator'}
                                    </p>
                                    <p className="text-[10px] text-gray-400 truncate font-mono">
                                        {adminUser?.email || 'admin@rangoli.com'}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="w-full py-2 px-3 rounded-lg text-xs font-medium text-red-300 hover:bg-red-950/40 border border-red-900/30 flex items-center justify-center gap-2"
                            >
                                <HiOutlineArrowRightOnRectangle className="text-base" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </aside>
                </div>
            )}

            {/* Main Content Area (Offset by lg:pl-64 on desktop so fixed sidebar never overlaps) */}
            <div className="lg:pl-64 flex flex-col min-w-0 min-h-screen">
                {/* Sticky Top Navigation Bar */}
                <header className="bg-white/95 backdrop-blur-md border-b border-[#EDE8E0] px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-xs">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
                            aria-label="Open Navigation"
                        >
                            <HiOutlineBars3 className="text-2xl" />
                        </button>
                        <div className="flex items-center gap-2">
                            <BsPatchCheckFill className="text-[#d4af37] text-sm" />
                            <span className="text-xs font-bold uppercase tracking-wider text-[#304037]">
                                Authorized Showroom Admin
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/admin/products/new"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#304037] hover:bg-[#222E27] text-white text-xs font-medium tracking-wide shadow-xs transition-colors"
                        >
                            <HiOutlinePlusCircle className="text-base text-[#d4af37]" />
                            <span>Add Product</span>
                        </Link>
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex text-xs text-gray-600 hover:text-[#304037] items-center gap-1 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                        >
                            <span>Live Store</span>
                            <HiOutlineArrowTopRightOnSquare className="text-sm" />
                        </a>
                    </div>
                </header>

                {/* Page Content Viewport */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
