import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
    HiOutlinePlusCircle,
    HiOutlineMagnifyingGlass,
    HiOutlineEye,
    HiOutlinePencilSquare,
    HiOutlineTrash,
    HiOutlineFunnel,
    HiOutlineCheck,
} from 'react-icons/hi2'
import api from '../../services/api'

const AdminProductList = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(
        searchParams.get('category') || 'All'
    )
    const [selectedKarat, setSelectedKarat] = useState('All')
    const [deleteModalProduct, setDeleteModalProduct] = useState(null)
    const [deleting, setDeleting] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    const categories = [
        'All',
        'Rings',
        'Earrings',
        'Necklaces',
        'Bracelets',
        'Bangles',
        'Pendants',
        'Chains',
    ]

    const karats = ['All', '22K', '20K', '18K', '14K']

    const showToast = (msg) => {
        setToastMessage(msg)
        setTimeout(() => setToastMessage(''), 3000)
    }

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const params = {}
            if (selectedCategory !== 'All') params.category = selectedCategory
            if (selectedKarat !== 'All') params.karat = selectedKarat
            if (searchQuery.trim()) params.search = searchQuery.trim()

            const res = await api.get('/products', { params })
            if (res.data?.success) {
                setProducts(res.data.data)
            }
        } catch (error) {
            console.error('Error fetching products:', error)
            showToast('Failed to load products from server')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [selectedCategory, selectedKarat])

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        fetchProducts()
    }

    const handleDeleteConfirm = async () => {
        if (!deleteModalProduct) return
        setDeleting(true)
        try {
            const targetId =
                deleteModalProduct._id ||
                deleteModalProduct.customId ||
                deleteModalProduct.id

            const res = await api.delete(`/products/${targetId}`)
            if (res.data?.success) {
                showToast(`"${deleteModalProduct.name}" removed successfully`)
                setDeleteModalProduct(null)
                fetchProducts()
            }
        } catch (error) {
            console.error('Delete error:', error)
            showToast('Failed to delete product')
        } finally {
            setDeleting(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 bg-[#304037] text-white px-5 py-3 rounded-xl shadow-xl border border-[#d4af37] text-xs font-medium flex items-center gap-2">
                    <HiOutlineCheck className="text-base text-[#d4af37]" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Header Title & Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-playfair text-2xl sm:text-3xl font-medium text-[#304037]">
                        Jewellery Catalogue Management
                    </h1>
                    <p className="text-xs text-gray-500 font-light mt-0.5">
                        Browse, search, edit, and add jewellery designs for Rangoli Jewellers.
                    </p>
                </div>

                <Link
                    to="/admin/products/new"
                    className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-[#304037] hover:bg-[#222E27] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2 border border-[#304037] hover:border-[#d4af37]"
                >
                    <HiOutlinePlusCircle className="text-base text-[#d4af37]" />
                    <span>Add New Jewellery</span>
                </Link>
            </div>

            {/* Filter and Search Bar Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <form
                    onSubmit={handleSearchSubmit}
                    className="flex flex-col md:flex-row items-center gap-3"
                >
                    {/* Search Input */}
                    <div className="relative flex-1 w-full">
                        <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by product name, code (e.g. RJ-RNG-101), tag..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#304037] focus:ring-1 focus:ring-[#304037] outline-none text-xs"
                        />
                    </div>

                    {/* Category Select */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full md:w-44 py-2.5 px-3 rounded-xl border border-gray-300 bg-white text-xs text-gray-700 outline-none focus:border-[#304037]"
                    >
                        {categories.map((c) => (
                            <option key={c} value={c}>
                                {c === 'All' ? 'All Categories' : c}
                            </option>
                        ))}
                    </select>

                    {/* Karat Select */}
                    <select
                        value={selectedKarat}
                        onChange={(e) => setSelectedKarat(e.target.value)}
                        className="w-full md:w-36 py-2.5 px-3 rounded-xl border border-gray-300 bg-white text-xs text-gray-700 outline-none focus:border-[#304037]"
                    >
                        {karats.map((k) => (
                            <option key={k} value={k}>
                                {k === 'All' ? 'All Karats' : `${k} Gold`}
                            </option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="w-full md:w-auto px-5 py-2.5 bg-[#304037] text-white rounded-xl text-xs font-medium uppercase tracking-wider hover:bg-[#222E27] cursor-pointer"
                    >
                        Search
                    </button>
                </form>

                {/* Quick Results Summary */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-gray-100">
                    <span>
                        Showing <strong className="text-gray-800">{products.length}</strong> jewellery designs
                    </span>
                    {(selectedCategory !== 'All' || selectedKarat !== 'All' || searchQuery) && (
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedCategory('All')
                                setSelectedKarat('All')
                                setSearchQuery('')
                            }}
                            className="text-[#d4af37] font-medium hover:underline cursor-pointer"
                        >
                            Reset Filters
                        </button>
                    )}
                </div>
            </div>

            {/* Products Table Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                {loading ? (
                    <div className="py-20 text-center">
                        <div className="w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <span className="text-xs text-gray-500">Loading catalogue...</span>
                    </div>
                ) : products.length === 0 ? (
                    <div className="py-16 text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-[#FAF7F2] text-[#d4af37] flex items-center justify-center mx-auto text-xl font-bold">
                            ✦
                        </div>
                        <h3 className="font-playfair text-lg text-gray-700">
                            No jewellery products match your search
                        </h3>
                        <p className="text-xs text-gray-500 max-w-sm mx-auto">
                            Try resetting your filters or add a new jewellery design to the catalogue.
                        </p>
                        <Link
                            to="/admin/products/new"
                            className="inline-block px-4 py-2 bg-[#304037] text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
                        >
                            Add New Design
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs font-roboto">
                            <thead className="bg-[#FAF7F2] text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                <tr>
                                    <th className="py-3.5 px-5">Design</th>
                                    <th className="py-3.5 px-4">Code</th>
                                    <th className="py-3.5 px-4">Category</th>
                                    <th className="py-3.5 px-4">Primary Karat</th>
                                    <th className="py-3.5 px-4">Available Karats</th>
                                    <th className="py-3.5 px-4">Net Gold Weight</th>
                                    <th className="py-3.5 px-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map((item) => {
                                    const id = item._id || item.customId || item.id
                                    return (
                                        <tr
                                            key={id}
                                            className="hover:bg-gray-50/80 transition-colors"
                                        >
                                            <td className="py-3.5 px-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-gray-200 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                                                        <img
                                                            src={item.img}
                                                            alt={item.name}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-[#304037] text-sm block">
                                                            {item.name}
                                                        </span>
                                                        <span className="text-[11px] text-gray-400 line-clamp-1">
                                                            {item.specs || item.tag}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-4 font-mono font-semibold text-gray-700">
                                                {item.code}
                                            </td>
                                            <td className="py-3.5 px-4 text-gray-600">
                                                <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px]">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <span className="bg-[#304037] text-[#d4af37] px-2 py-0.5 rounded text-[11px] font-mono font-bold">
                                                    {item.karat}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <div className="flex gap-1 flex-wrap">
                                                    {(item.availableKarats || ['18KT', '20KT', '22KT']).map(
                                                        (kt) => (
                                                            <span
                                                                key={kt}
                                                                className="bg-[#FAF7F2] border border-[#EDE8E0] text-gray-700 px-1.5 py-0.2 rounded text-[10px] font-mono"
                                                            >
                                                                {kt}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-4 font-mono text-gray-600">
                                                {item.specifications?.netGoldWeight || '4.550 gm'}
                                            </td>
                                            <td className="py-3.5 px-5 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    {/* Public View */}
                                                    <a
                                                        href={`/product/${id}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        title="View on Live Store"
                                                        className="p-2 text-gray-500 hover:text-[#304037] hover:bg-gray-100 rounded-lg transition-colors"
                                                    >
                                                        <HiOutlineEye className="text-base" />
                                                    </a>

                                                    {/* Edit Button */}
                                                    <Link
                                                        to={`/admin/products/edit/${id}`}
                                                        title="Edit Product"
                                                        className="p-2 text-[#304037] hover:bg-[#FAF7F2] border border-gray-200 rounded-lg transition-colors"
                                                    >
                                                        <HiOutlinePencilSquare className="text-base" />
                                                    </Link>

                                                    {/* Delete Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => setDeleteModalProduct(item)}
                                                        title="Delete Product"
                                                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                    >
                                                        <HiOutlineTrash className="text-base" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModalProduct && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-gray-200 text-center animate-in fade-in zoom-in-95 duration-150">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-xl">
                            <HiOutlineTrash />
                        </div>
                        <div>
                            <h3 className="font-playfair text-lg text-gray-900 font-medium">
                                Delete Jewellery Piece?
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                                Are you sure you want to remove{' '}
                                <strong className="text-gray-800">
                                    "{deleteModalProduct.name}"
                                </strong>{' '}
                                ({deleteModalProduct.code}) from the catalogue? This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setDeleteModalProduct(null)}
                                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold uppercase tracking-wider text-gray-700 hover:bg-gray-50 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                disabled={deleting}
                                onClick={handleDeleteConfirm}
                                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-sm disabled:opacity-50"
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminProductList
