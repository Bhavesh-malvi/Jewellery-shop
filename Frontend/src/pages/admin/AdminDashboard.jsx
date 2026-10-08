import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    HiOutlineSquares2X2,
    HiOutlinePlusCircle,
    HiOutlineSparkles,
    HiOutlineArrowTopRightOnSquare,
    HiOutlineEye,
    HiOutlinePencilSquare,
} from 'react-icons/hi2'
import { BsPatchCheckFill } from 'react-icons/bs'
import api from '../../services/api'
import { useAdminAuth } from '../../context/AdminAuthContext'

const AdminDashboard = () => {
    const { adminUser } = useAdminAuth()
    const [stats, setStats] = useState(null)
    const [recentProducts, setRecentProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch stats from backend
                const [statsRes, productsRes] = await Promise.all([
                    api.get('/products/stats').catch(() => null),
                    api.get('/products?limit=6').catch(() => null),
                ])

                if (statsRes?.data?.success) {
                    setStats(statsRes.data.data)
                }

                if (productsRes?.data?.success) {
                    setRecentProducts(productsRes.data.data.slice(0, 6))
                }
            } catch (err) {
                console.error('Error fetching dashboard data:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    if (loading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-3 border-[#d4af37]/30 border-t-[#304037] rounded-full animate-spin mb-3"></div>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-mono">
                    Loading Showroom Analytics...
                </p>
            </div>
        )
    }

    const totalCount = stats?.totalProducts !== undefined ? stats.totalProducts : recentProducts.length
    const karatCounts = stats?.karatCounts || { '22K': 0, '20K': 0, '18K': 0, '14K': 0 }

    return (
        <div className="space-y-8">
            {/* Hero Welcome Banner */}
            <div className="bg-gradient-to-r from-[#222E27] via-[#2D3E35] to-[#1E2922] rounded-3xl p-6 sm:p-8 text-white border border-[#d4af37]/40 shadow-lg relative overflow-hidden">
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-[11px] font-mono text-[#f3e5ab] mb-2 border border-white/10">
                            <BsPatchCheckFill className="text-xs text-[#d4af37]" />
                            <span>Rangoli Jewellers Management Portal</span>
                        </div>
                        <h1 className="font-playfair text-2xl sm:text-3xl font-normal text-white">
                            Welcome back, {adminUser?.name || 'Showroom Admin'}
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-300 font-light mt-1 max-w-xl">
                            Manage jewellery collections, 22K/20K/18K/14K hallmarking specifications, and showroom catalog without prices directly from here.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <Link
                            to="/admin/products/new"
                            className="px-5 py-3 rounded-xl bg-[#d4af37] hover:bg-[#e0be53] text-[#1c2922] text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
                        >
                            <HiOutlinePlusCircle className="text-base" />
                            <span>Add New Jewellery</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Metrics Statistics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
                {/* Total Products */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:border-[#d4af37]/60 transition-all col-span-2 sm:col-span-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                        Total Designs
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-playfair font-normal text-[#304037]">
                            {totalCount}
                        </span>
                        <span className="text-xs text-green-600 font-medium">Pieces</span>
                    </div>
                    <span className="text-[11px] text-gray-400 mt-2 block">
                        Live in Store Catalogue
                    </span>
                </div>

                {/* 22K Count */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:border-[#d4af37]/60 transition-all">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">
                            22K Gold
                        </span>
                        <span className="text-[10px] bg-[#FAF7F2] border border-[#d4af37]/30 text-[#304037] font-mono px-1.5 py-0.5 rounded">
                            BIS 916
                        </span>
                    </div>
                    <span className="text-3xl font-playfair font-normal text-[#304037]">
                        {karatCounts['22K'] || 0}
                    </span>
                    <span className="text-[11px] text-gray-400 mt-2 block">
                        Bridal & Heritage
                    </span>
                </div>

                {/* 20K Count */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:border-[#d4af37]/60 transition-all">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">
                            20K Gold
                        </span>
                        <span className="text-[10px] bg-[#FAF7F2] border border-[#d4af37]/30 text-[#304037] font-mono px-1.5 py-0.5 rounded">
                            BIS 833
                        </span>
                    </div>
                    <span className="text-3xl font-playfair font-normal text-[#304037]">
                        {karatCounts['20K'] || 0}
                    </span>
                    <span className="text-[11px] text-gray-400 mt-2 block">
                        Antique & Traditional
                    </span>
                </div>

                {/* 18K Count */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:border-[#d4af37]/60 transition-all">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">
                            18K Gold
                        </span>
                        <span className="text-[10px] bg-[#FAF7F2] border border-[#d4af37]/30 text-[#304037] font-mono px-1.5 py-0.5 rounded">
                            BIS 750
                        </span>
                    </div>
                    <span className="text-3xl font-playfair font-normal text-[#304037]">
                        {karatCounts['18K'] || 0}
                    </span>
                    <span className="text-[11px] text-gray-400 mt-2 block">
                        Diamond & Solitaire
                    </span>
                </div>

                {/* 14K Count */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:border-[#d4af37]/60 transition-all">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">
                            14K Gold
                        </span>
                        <span className="text-[10px] bg-[#FAF7F2] border border-[#d4af37]/30 text-[#304037] font-mono px-1.5 py-0.5 rounded">
                            BIS 585
                        </span>
                    </div>
                    <span className="text-3xl font-playfair font-normal text-[#304037]">
                        {karatCounts['14K'] || 0}
                    </span>
                    <span className="text-[11px] text-gray-400 mt-2 block">
                        Daily Lightweight
                    </span>
                </div>
            </div>

            {/* Category Distribution Pills */}
            {stats?.categoryCounts && (
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">
                        Catalogue by Jewellery Categories
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                        {Object.entries(stats.categoryCounts).map(([cat, count]) => (
                            <Link
                                key={cat}
                                to={`/admin/products?category=${cat}`}
                                className="px-3.5 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#EDE8E0] text-xs font-medium text-[#304037] flex items-center gap-2 transition-colors"
                            >
                                <span>{cat}</span>
                                <span className="w-5 h-5 rounded-full bg-[#304037] text-white text-[10px] flex items-center justify-center font-mono">
                                    {count}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Recent Products Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="font-playfair text-lg text-[#304037] font-medium">
                            Recently Added Jewellery Pieces
                        </h2>
                        <p className="text-xs text-gray-500">
                            Showing latest designs in the database catalogue
                        </p>
                    </div>
                    <Link
                        to="/admin/products"
                        className="text-xs font-semibold text-[#d4af37] hover:underline"
                    >
                        View Full Catalogue →
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-roboto">
                        <thead className="bg-[#FAF7F2] text-gray-500 uppercase tracking-wider border-b border-gray-200">
                            <tr>
                                <th className="py-3.5 px-5">Design</th>
                                <th className="py-3.5 px-4">Code</th>
                                <th className="py-3.5 px-4">Category</th>
                                <th className="py-3.5 px-4">Primary Karat</th>
                                <th className="py-3.5 px-4">Available Karats</th>
                                <th className="py-3.5 px-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recentProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-12 text-center text-gray-500">
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-gray-700">No products in catalogue yet</p>
                                            <p className="text-xs text-gray-400">Database is connected. Click below to add your first real jewellery piece with image upload.</p>
                                            <div className="pt-2">
                                                <Link
                                                    to="/admin/products/new"
                                                    className="inline-block px-5 py-2 rounded-xl bg-[#304037] hover:bg-[#222E27] text-white text-xs font-semibold uppercase tracking-wider transition-all"
                                                >
                                                    + Add First Jewellery Design
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                recentProducts.map((p) => {
                                const id = p._id || p.customId || p.id
                                return (
                                    <tr key={id} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="py-3.5 px-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg bg-[#FAF7F2] border border-gray-200 p-1 shrink-0 flex items-center justify-center">
                                                    <img
                                                        src={p.img}
                                                        alt={p.name}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <div>
                                                    <span className="font-medium text-[#304037] text-sm block">
                                                        {p.name}
                                                    </span>
                                                    <span className="text-[11px] text-gray-400">
                                                        {p.specs}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4 font-mono font-semibold text-gray-700">
                                            {p.code}
                                        </td>
                                        <td className="py-3.5 px-4 text-gray-600">
                                            {p.category}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className="bg-[#304037] text-[#d4af37] px-2 py-0.5 rounded text-[11px] font-mono font-bold">
                                                {p.karat}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <div className="flex gap-1 flex-wrap">
                                                {(p.availableKarats || ['18KT', '20KT', '22KT']).map((kt) => (
                                                    <span
                                                        key={kt}
                                                        className="bg-gray-100 text-gray-700 px-1.5 py-0.2 rounded text-[10px] font-mono"
                                                    >
                                                        {kt}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <a
                                                    href={`/product/${p.customId || p.id || p._id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title="View Public Page"
                                                    className="p-1.5 text-gray-500 hover:text-[#304037] hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <HiOutlineEye className="text-base" />
                                                </a>
                                                <Link
                                                    to={`/admin/products/edit/${p._id || p.customId || p.id}`}
                                                    title="Edit Design"
                                                    className="p-1.5 text-[#304037] hover:bg-[#FAF7F2] border border-gray-200 rounded-lg transition-colors"
                                                >
                                                    <HiOutlinePencilSquare className="text-base" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
