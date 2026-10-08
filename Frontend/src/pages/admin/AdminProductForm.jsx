import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
    HiOutlineArrowLeft,
    HiOutlineCheck,
    HiOutlinePlus,
    HiOutlineTrash,
    HiOutlinePhoto,
    HiOutlineSparkles,
    HiOutlineArrowUpTray,
    HiOutlineCloudArrowUp,
    HiOutlineLink,
    HiOutlineXMark,
} from 'react-icons/hi2'
import api from '../../services/api'

const AdminProductForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEditMode = Boolean(id)

    const [loading, setLoading] = useState(isEditMode)
    const [submitting, setSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [uploadNotice, setUploadNotice] = useState('')
    const [uploadingSlot, setUploadingSlot] = useState(null) // 'img', 'image2', 'image3', 'bulk'

    // Slot URL mode toggle (file upload vs URL input)
    const [urlInputMode, setUrlInputMode] = useState({
        img: false,
        image2: false,
        image3: false,
    })

    const fileInputRefs = {
        img: useRef(null),
        image2: useRef(null),
        image3: useRef(null),
        bulk: useRef(null),
    }

    // Form State - Starts empty with real fields, NO dummy seed data
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        category: 'Rings',
        karat: '22K',
        availableKarats: ['18KT', '20KT', '22KT'],
        purity: '22K Hallmarked Gold',
        tag: 'New Design',
        shortDescription: '',
        description: '',
        specs: '22K BIS Hallmarked Yellow Gold',
        specifications: {
            goldPurity: '22K (916 BIS Hallmark)',
            grossWeight: '',
            netGoldWeight: '',
            diamondDetails: '100% Solid Pure Gold Casting',
            hallmarkCertification: 'BIS 916 Hallmark with Unique Laser HUID Stamp',
            metalColor: 'Traditional Warm Yellow Gold',
            sizeFit: 'Standard Indian Sizes (Custom resizing available in showroom)',
            makingTime: 'Ready in stock at Narolgam Showroom',
        },
        highlights: [
            'Crafted with high purity BIS hallmarked gold.',
            'Comfort-fit finish suitable for daily & celebration wear.',
            'Laser HUID stamped with verifiable purity certification.',
        ],
        img: '',
        image2: '',
        image3: '',
        isFeatured: false,
        inStock: true,
    })

    const categories = [
        'Rings',
        'Earrings',
        'Necklaces',
        'Bracelets',
        'Bangles',
        'Pendants',
        'Chains',
    ]

    const karatOptions = ['22K', '20K', '18K', '14K']
    const selectableKarats = ['14KT', '18KT', '20KT', '22KT'] // 24KT strictly excluded

    useEffect(() => {
        if (!isEditMode) return

        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`)
                if (res.data?.success && res.data.data) {
                    const p = res.data.data
                    setFormData({
                        name: p.name || '',
                        code: p.code || '',
                        category: p.category || 'Rings',
                        karat: p.karat || '22K',
                        availableKarats: (p.availableKarats || ['18KT', '20KT', '22KT']).filter(
                            (k) => k !== '24KT' && k !== '24K'
                        ),
                        purity: p.purity || `${p.karat || '22K'} Hallmarked Gold`,
                        tag: p.tag || '',
                        shortDescription: p.shortDescription || '',
                        description: p.description || '',
                        specs: p.specs || '',
                        specifications: {
                            goldPurity: p.specifications?.goldPurity || '22K (916 BIS Hallmark)',
                            grossWeight: p.specifications?.grossWeight || '',
                            netGoldWeight: p.specifications?.netGoldWeight || '',
                            diamondDetails:
                                p.specifications?.diamondDetails || '100% Solid Gold Casting',
                            hallmarkCertification:
                                p.specifications?.hallmarkCertification ||
                                'BIS 916 Hallmark with Unique Laser HUID Stamp',
                            metalColor:
                                p.specifications?.metalColor || 'Traditional Warm Yellow Gold',
                            sizeFit:
                                p.specifications?.sizeFit ||
                                'Standard Indian Sizes (Custom resizing available)',
                            makingTime:
                                p.specifications?.makingTime ||
                                'Ready in stock at Narolgam Showroom',
                        },
                        highlights:
                            p.highlights && p.highlights.length > 0
                                ? p.highlights
                                : ['BIS Hallmarked piece with Laser HUID.'],
                        img: p.img || '',
                        image2: p.images?.[1] || '',
                        image3: p.images?.[2] || '',
                        isFeatured: Boolean(p.isFeatured),
                        inStock: p.inStock !== false,
                    })
                }
            } catch (error) {
                console.error('Error fetching product for edit:', error)
                setErrorMessage('Failed to load product details for editing')
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id, isEditMode])

    const handleKaratToggle = (kt) => {
        setFormData((prev) => {
            const exists = prev.availableKarats.includes(kt)
            const updated = exists
                ? prev.availableKarats.filter((k) => k !== kt)
                : [...prev.availableKarats, kt]
            return {
                ...prev,
                availableKarats: updated.length > 0 ? updated : [kt],
            }
        })
    }

    const handleHighlightChange = (index, value) => {
        const updated = [...formData.highlights]
        updated[index] = value
        setFormData((prev) => ({ ...prev, highlights: updated }))
    }

    const addHighlight = () => {
        setFormData((prev) => ({
            ...prev,
            highlights: [...prev.highlights, ''],
        }))
    }

    const removeHighlight = (index) => {
        setFormData((prev) => ({
            ...prev,
            highlights: prev.highlights.filter((_, i) => i !== index),
        }))
    }

    // Single File Upload Handler (Cloudinary with server storage fallback)
    const handleFileUpload = async (file, slotName) => {
        if (!file) return
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file (JPG, PNG, WEBP, AVIF)')
            return
        }

        setUploadingSlot(slotName)
        setErrorMessage('')
        setUploadNotice('')

        const data = new FormData()
        data.append('image', file)

        try {
            const res = await api.post('/upload', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            if (res.data?.success && res.data.url) {
                setFormData((prev) => ({
                    ...prev,
                    [slotName]: res.data.url,
                }))
                if (res.data.notice) {
                    setUploadNotice(res.data.notice)
                }
            } else {
                setErrorMessage(res.data?.message || 'Failed to upload image')
            }
        } catch (err) {
            console.error('Upload failed:', err)
            setErrorMessage(
                err.response?.data?.message || 'Network error while uploading image'
            )
        } finally {
            setUploadingSlot(null)
            if (fileInputRefs[slotName]?.current) {
                fileInputRefs[slotName].current.value = ''
            }
        }
    }

    // Bulk File Upload Handler (upload up to 3 images at once)
    const handleBulkUpload = async (files) => {
        if (!files || files.length === 0) return
        const selected = Array.from(files).slice(0, 3)

        setUploadingSlot('bulk')
        setErrorMessage('')
        setUploadNotice('')

        const data = new FormData()
        selected.forEach((f) => data.append('images', f))

        try {
            const res = await api.post('/upload/multiple', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            if (res.data?.success && res.data.urls && res.data.urls.length > 0) {
                const urls = res.data.urls
                setFormData((prev) => ({
                    ...prev,
                    img: urls[0] || prev.img,
                    image2: urls[1] || prev.image2,
                    image3: urls[2] || prev.image3,
                }))
            } else {
                setErrorMessage('No images were uploaded')
            }
        } catch (err) {
            console.error('Bulk upload error:', err)
            setErrorMessage(
                err.response?.data?.message || 'Failed to upload gallery images'
            )
        } finally {
            setUploadingSlot(null)
            if (fileInputRefs.bulk?.current) {
                fileInputRefs.bulk.current.value = ''
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setErrorMessage('')

        if (!formData.img || formData.img.trim() === '') {
            setErrorMessage('Please upload or specify at least the Primary Image (Photo 1)')
            setSubmitting(false)
            return
        }

        // Format images array (at least 3 images for the gallery)
        const finalImages = [
            formData.img.trim(),
            formData.image2.trim() || formData.img.trim(),
            formData.image3.trim() || formData.img.trim(),
        ]

        const payload = {
            ...formData,
            code: formData.code.toUpperCase().trim(),
            images: finalImages,
            highlights: formData.highlights.filter((h) => h.trim() !== ''),
        }

        try {
            if (isEditMode) {
                const res = await api.put(`/products/${id}`, payload)
                if (res.data?.success) {
                    navigate('/admin/products')
                }
            } else {
                const res = await api.post('/products', payload)
                if (res.data?.success) {
                    navigate('/admin/products')
                }
            }
        } catch (error) {
            console.error('Submit error:', error)
            setErrorMessage(
                error.response?.data?.message || 'Failed to save product in database'
            )
        } finally {
            setSubmitting(false)
        }
    }

    // Helper component for Image Upload Card Slot
    const renderImageSlot = (slotKey, label, isRequired = false, badgeText = '') => {
        const imageUrl = formData[slotKey]
        const isUploading = uploadingSlot === slotKey
        const isUrlMode = urlInputMode[slotKey]

        return (
            <div className="flex flex-col rounded-2xl border border-gray-200 bg-[#FAF7F2]/40 p-4 space-y-3">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-[#304037]">{label}</span>
                            {isRequired && <span className="text-red-500 text-xs font-bold">*</span>}
                        </div>
                        {badgeText && <span className="text-[10px] text-gray-500">{badgeText}</span>}
                    </div>
                    <button
                        type="button"
                        onClick={() =>
                            setUrlInputMode((prev) => ({
                                ...prev,
                                [slotKey]: !prev[slotKey],
                            }))
                        }
                        className="text-[11px] text-[#304037] hover:text-[#d4af37] font-medium flex items-center gap-1 cursor-pointer"
                    >
                        {isUrlMode ? (
                            <>
                                <HiOutlineArrowUpTray className="text-xs" />
                                <span>Upload File</span>
                            </>
                        ) : (
                            <>
                                <HiOutlineLink className="text-xs" />
                                <span>Paste URL</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Preview Box or Upload Dropzone */}
                <div className="relative h-44 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#d4af37] bg-white transition-all overflow-hidden flex items-center justify-center group">
                    {isUploading ? (
                        <div className="flex flex-col items-center gap-2 p-4 text-center">
                            <div className="w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs font-semibold text-[#304037]">
                                Uploading image...
                            </span>
                            <span className="text-[10px] text-gray-500">Processing Cloudinary CDN</span>
                        </div>
                    ) : imageUrl ? (
                        <>
                            <img
                                src={imageUrl}
                                alt={label}
                                className="w-full h-full object-contain p-2"
                                onError={(e) => {
                                    e.target.onerror = null
                                    e.target.src = ''
                                }}
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-[#304037]/75 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                                <button
                                    type="button"
                                    onClick={() => fileInputRefs[slotKey].current?.click()}
                                    className="px-3 py-1.5 rounded-lg bg-[#d4af37] text-[#1a251f] text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-[#c39f2f] cursor-pointer"
                                >
                                    <HiOutlineArrowUpTray />
                                    <span>Replace Photo</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [slotKey]: '',
                                        }))
                                    }
                                    className="px-3 py-1.5 rounded-lg bg-white/20 text-white text-xs font-medium flex items-center gap-1.5 hover:bg-red-600/80 cursor-pointer"
                                >
                                    <HiOutlineXMark />
                                    <span>Remove</span>
                                </button>
                            </div>
                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-bold tracking-wider uppercase shadow-xs">
                                ✓ Uploaded
                            </div>
                        </>
                    ) : (
                        <div
                            onClick={() => fileInputRefs[slotKey].current?.click()}
                            className="w-full h-full flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-[#FAF7F2]/50 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-gray-200 flex items-center justify-center text-[#304037] mb-2 group-hover:scale-110 group-hover:text-[#d4af37] transition-all">
                                <HiOutlineCloudArrowUp className="text-xl" />
                            </div>
                            <span className="text-xs font-bold text-[#304037]">
                                Click to browse photo
                            </span>
                            <span className="text-[10px] text-gray-500 mt-0.5">
                                JPG, PNG, WEBP (Max 15MB)
                            </span>
                        </div>
                    )}
                </div>

                {/* Hidden File Input */}
                <input
                    ref={fileInputRefs[slotKey]}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files?.[0], slotKey)}
                    className="hidden"
                />

                {/* URL Input (if toggled) */}
                {isUrlMode ? (
                    <div className="space-y-1">
                        <input
                            type="url"
                            value={imageUrl}
                            onChange={(e) =>
                                setFormData({ ...formData, [slotKey]: e.target.value })
                            }
                            placeholder="https://..."
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none focus:border-[#304037]"
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-between text-[11px] text-gray-500">
                        <button
                            type="button"
                            onClick={() => fileInputRefs[slotKey].current?.click()}
                            className="text-[#304037] font-semibold hover:text-[#d4af37] flex items-center gap-1 cursor-pointer"
                        >
                            <HiOutlinePhoto />
                            <span>{imageUrl ? 'Change file' : 'Choose local image'}</span>
                        </button>
                        {imageUrl && (
                            <span className="text-[10px] font-mono text-gray-400 truncate max-w-[120px]">
                                {imageUrl.split('/').pop()}
                            </span>
                        )}
                    </div>
                )}
            </div>
        )
    }

    if (loading) {
        return (
            <div className="py-20 text-center">
                <div className="w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <span className="text-xs text-gray-500">Loading design details...</span>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header with Back button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link
                        to="/admin/products"
                        className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[#304037] hover:border-[#304037] transition-colors"
                        title="Back to Catalogue"
                    >
                        <HiOutlineArrowLeft className="text-lg" />
                    </Link>
                    <div>
                        <h1 className="font-playfair text-2xl font-medium text-[#304037]">
                            {isEditMode ? 'Edit Jewellery Design' : 'Add New Jewellery Design'}
                        </h1>
                        <p className="text-xs text-gray-500">
                            Upload real jewellery photos directly from your device to Cloudinary. Configure gold purity, hallmarking, and weights.
                        </p>
                    </div>
                </div>
            </div>

            {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center justify-between">
                    <span>⚠️ {errorMessage}</span>
                    <button
                        type="button"
                        onClick={() => setErrorMessage('')}
                        className="text-red-500 hover:text-red-800"
                    >
                        ✕
                    </button>
                </div>
            )}

            {uploadNotice && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                    ℹ️ {uploadNotice}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. BASIC INFORMATION CARD */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]"></span>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-[#304037]">
                            1. Basic Jewellery Details
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Design Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                placeholder="e.g. Royal Solitaire Diamond Ring"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#304037] focus:ring-1 focus:ring-[#304037] outline-none text-xs"
                            />
                        </div>

                        {/* Product Code */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Product Code * (Unique)
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.code}
                                onChange={(e) =>
                                    setFormData({ ...formData, code: e.target.value })
                                }
                                placeholder="e.g. RJ-RNG-101"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#304037] focus:ring-1 focus:ring-[#304037] outline-none text-xs font-mono uppercase"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Category *
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({ ...formData, category: e.target.value })
                                }
                                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-xs outline-none focus:border-[#304037]"
                            >
                                {categories.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Primary Karat */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Primary Gold Karat *
                            </label>
                            <select
                                value={formData.karat}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        karat: e.target.value,
                                        purity: `${e.target.value} Hallmarked Gold`,
                                    })
                                }
                                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-xs outline-none focus:border-[#304037] font-mono font-semibold"
                            >
                                {karatOptions.map((k) => (
                                    <option key={k} value={k}>
                                        {k} Gold
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Tag */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Tag / Badge
                            </label>
                            <input
                                type="text"
                                value={formData.tag}
                                onChange={(e) =>
                                    setFormData({ ...formData, tag: e.target.value })
                                }
                                placeholder="e.g. Best Seller, New Design, Heritage"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#304037] outline-none text-xs"
                            />
                        </div>

                        {/* Available Karats (Checkboxes) */}
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                Available Karats for this Design (Customer can switch between these)
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {selectableKarats.map((kt) => {
                                    const isChecked = formData.availableKarats.includes(kt)
                                    return (
                                        <button
                                            key={kt}
                                            type="button"
                                            onClick={() => handleKaratToggle(kt)}
                                            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border flex items-center gap-2 ${
                                                isChecked
                                                    ? 'bg-[#304037] text-white border-[#304037] shadow-xs'
                                                    : 'bg-gray-50 text-gray-600 border-gray-300 hover:border-gray-400'
                                            }`}
                                        >
                                            <span
                                                className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${
                                                    isChecked
                                                        ? 'bg-[#d4af37] text-[#1a251f]'
                                                        : 'border border-gray-400'
                                                }`}
                                            >
                                                {isChecked && '✓'}
                                            </span>
                                            <span>{kt}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. DESCRIPTION & HIGHLIGHTS CARD */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]"></span>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-[#304037]">
                            2. Descriptions & Story
                        </h2>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Short Summary Paragraph
                        </label>
                        <textarea
                            rows={2}
                            value={formData.shortDescription}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    shortDescription: e.target.value,
                                })
                            }
                            placeholder="Brief description shown under the title on the detail page..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#304037] outline-none text-xs leading-relaxed"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Full Product Description *
                        </label>
                        <textarea
                            rows={4}
                            required
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            placeholder="Detailed description of craftsmanship, texture, comfort, and heritage..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#304037] outline-none text-xs leading-relaxed"
                        />
                    </div>

                    {/* Bullet Highlights */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-medium text-gray-700">
                                Product Bullet Highlights (shown on detail page tabs)
                            </label>
                            <button
                                type="button"
                                onClick={addHighlight}
                                className="text-xs text-[#304037] font-semibold flex items-center gap-1 hover:text-[#d4af37] cursor-pointer"
                            >
                                <HiOutlinePlus />
                                <span>Add Bullet Point</span>
                            </button>
                        </div>
                        <div className="space-y-2">
                            {formData.highlights.map((point, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span className="text-[#d4af37] text-base">•</span>
                                    <input
                                        type="text"
                                        value={point}
                                        onChange={(e) =>
                                            handleHighlightChange(index, e.target.value)
                                        }
                                        placeholder={`Highlight point ${index + 1}`}
                                        className="flex-1 px-3 py-2 rounded-xl border border-gray-300 focus:border-[#304037] outline-none text-xs"
                                    />
                                    {formData.highlights.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeHighlight(index)}
                                            className="p-2 text-gray-400 hover:text-red-500 cursor-pointer"
                                        >
                                            <HiOutlineTrash className="text-sm" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. GOLD & STONE SPECIFICATIONS TABLE */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]"></span>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-[#304037]">
                            3. Gold & Stone Specifications (Additional Information Tab)
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Gold Purity Grade
                            </label>
                            <input
                                type="text"
                                value={formData.specifications.goldPurity}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        specifications: {
                                            ...formData.specifications,
                                            goldPurity: e.target.value,
                                        },
                                    })
                                }
                                placeholder="e.g. 22K (916 BIS Hallmark)"
                                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#304037] outline-none text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Hallmark Standard & Laser HUID
                            </label>
                            <input
                                type="text"
                                value={formData.specifications.hallmarkCertification}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        specifications: {
                                            ...formData.specifications,
                                            hallmarkCertification: e.target.value,
                                        },
                                    })
                                }
                                placeholder="e.g. BIS 916 Hallmark with Unique Laser HUID Stamp"
                                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#304037] outline-none text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Net Gold Weight
                            </label>
                            <input
                                type="text"
                                value={formData.specifications.netGoldWeight}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        specifications: {
                                            ...formData.specifications,
                                            netGoldWeight: e.target.value,
                                        },
                                    })
                                }
                                placeholder="e.g. 5.500 gm solid gold"
                                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#304037] outline-none text-xs font-mono"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Approximate Gross Weight
                            </label>
                            <input
                                type="text"
                                value={formData.specifications.grossWeight}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        specifications: {
                                            ...formData.specifications,
                                            grossWeight: e.target.value,
                                        },
                                    })
                                }
                                placeholder="e.g. 5.800 gm (Approx.)"
                                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#304037] outline-none text-xs font-mono"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Diamond / Stone Details
                            </label>
                            <input
                                type="text"
                                value={formData.specifications.diamondDetails}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        specifications: {
                                            ...formData.specifications,
                                            diamondDetails: e.target.value,
                                        },
                                    })
                                }
                                placeholder="e.g. 100% Solid Gold Casting or 0.45 ct VVS"
                                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#304037] outline-none text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Metal Color / Finish
                            </label>
                            <input
                                type="text"
                                value={formData.specifications.metalColor}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        specifications: {
                                            ...formData.specifications,
                                            metalColor: e.target.value,
                                        },
                                    })
                                }
                                placeholder="e.g. Traditional Warm Yellow Gold / Rose Gold"
                                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#304037] outline-none text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Sizing & Custom Fit
                            </label>
                            <input
                                type="text"
                                value={formData.specifications.sizeFit}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        specifications: {
                                            ...formData.specifications,
                                            sizeFit: e.target.value,
                                        },
                                    })
                                }
                                placeholder="e.g. Standard Indian Sizes 12 - 20 (Custom fitting available)"
                                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#304037] outline-none text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Showroom Availability
                            </label>
                            <input
                                type="text"
                                value={formData.specifications.makingTime}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        specifications: {
                                            ...formData.specifications,
                                            makingTime: e.target.value,
                                        },
                                    })
                                }
                                placeholder="e.g. Ready in stock at Narolgam Showroom"
                                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#304037] outline-none text-xs"
                            />
                        </div>
                    </div>
                </div>

                {/* 4. REAL IMAGE UPLOAD & GALLERY (CLOUDINARY + MULTER) */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]"></span>
                            <div>
                                <h2 className="text-sm font-bold uppercase tracking-wider text-[#304037]">
                                    4. Jewellery Photo Gallery (Upload Real Images)
                                </h2>
                                <p className="text-[11px] text-gray-500">
                                    Direct upload to Cloudinary CDN with Multer streaming. No dummy images required.
                                </p>
                            </div>
                        </div>

                        {/* Quick Batch Upload Button */}
                        <div className="flex items-center gap-2">
                            <input
                                ref={fileInputRefs.bulk}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => handleBulkUpload(e.target.files)}
                                className="hidden"
                            />
                            <button
                                type="button"
                                disabled={uploadingSlot !== null}
                                onClick={() => fileInputRefs.bulk.current?.click()}
                                className="px-3.5 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#d4af37]/60 text-[#304037] hover:bg-[#d4af37] hover:text-[#1a251f] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                            >
                                <HiOutlineCloudArrowUp className="text-base" />
                                <span>Batch Upload (Up to 3 Photos)</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {renderImageSlot(
                            'img',
                            '1. Primary Photo (Main View)',
                            true,
                            'Hero card display on catalogue & search'
                        )}
                        {renderImageSlot(
                            'image2',
                            '2. Angle View Photo',
                            false,
                            'Side angle or wearing perspective'
                        )}
                        {renderImageSlot(
                            'image3',
                            '3. Close-up Detail Photo',
                            false,
                            'Hallmark HUID stamp or gemstone texture'
                        )}
                    </div>
                </div>

                {/* 5. TOGGLES & SUBMIT */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-gray-700">
                            <input
                                type="checkbox"
                                checked={formData.isFeatured}
                                onChange={(e) =>
                                    setFormData({ ...formData, isFeatured: e.target.checked })
                                }
                                className="w-4 h-4 rounded text-[#304037] focus:ring-[#304037] cursor-pointer"
                            />
                            <span>Feature on Homepage Signature Collection</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-gray-700">
                            <input
                                type="checkbox"
                                checked={formData.inStock}
                                onChange={(e) =>
                                    setFormData({ ...formData, inStock: e.target.checked })
                                }
                                className="w-4 h-4 rounded text-[#304037] focus:ring-[#304037] cursor-pointer"
                            />
                            <span>Ready in Stock at Showroom</span>
                        </label>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/admin/products"
                            className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold uppercase tracking-wider text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={submitting || uploadingSlot !== null}
                            className="px-6 py-2.5 rounded-xl bg-[#304037] hover:bg-[#222E27] text-white text-xs font-semibold uppercase tracking-wider border border-[#304037] hover:border-[#d4af37] shadow-sm transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
                        >
                            {submitting ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <HiOutlineCheck className="text-base text-[#d4af37]" />
                            )}
                            <span>{isEditMode ? 'Update Design' : 'Publish to Catalogue'}</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AdminProductForm
