import React, { createContext, useContext, useState, useEffect } from 'react'

const EnquiryContext = createContext()

export const useEnquiry = () => {
    const context = useContext(EnquiryContext)
    if (!context) {
        throw new Error('useEnquiry must be used within an EnquiryProvider')
    }
    return context
}

// Helper to reliably extract the unique ID of any product (MongoDB _id, customId, or id)
export const getProductIdentifier = (item) => {
    if (!item) return ''
    if (typeof item === 'string' || typeof item === 'number') return String(item)
    return String(item._id || item.customId || item.id || '')
}

export const EnquiryProvider = ({ children }) => {
    // Phone number for WhatsApp enquiries
    const WHATSAPP_NUMBER = '917340681617'

    // Load saved items from localStorage with ID normalization
    const [enquiryItems, setEnquiryItems] = useState(() => {
        try {
            const saved = localStorage.getItem('rangoli_enquiry_bag')
            if (!saved) return []
            const parsed = JSON.parse(saved)
            if (!Array.isArray(parsed)) return []
            return parsed
                .filter(Boolean)
                .map((item) => {
                    const id = getProductIdentifier(item)
                    return {
                        ...item,
                        id: item.id || id,
                        _id: item._id || id,
                        img: item.img || item.images?.[0] || '',
                    }
                })
                .filter((item) => Boolean(getProductIdentifier(item)))
        } catch {
            return []
        }
    })

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState(null)

    // Sync to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('rangoli_enquiry_bag', JSON.stringify(enquiryItems))
        } catch {
            // ignore storage errors
        }
    }, [enquiryItems])

    // Auto-dismiss toast
    useEffect(() => {
        if (!toastMessage) return
        const timer = setTimeout(() => {
            setToastMessage(null)
        }, 3000)
        return () => clearTimeout(timer)
    }, [toastMessage])

    const showToast = (msg) => {
        setToastMessage(msg)
    }

    const addToEnquiry = (product) => {
        if (!product) return
        const prodId = getProductIdentifier(product)
        if (!prodId) return

        if (enquiryItems.some((item) => getProductIdentifier(item) === prodId)) {
            showToast(`"${product.name}" is already in your Enquiry Bag!`)
            return
        }

        const normalizedProduct = {
            ...product,
            id: prodId,
            _id: product._id || prodId,
            img: product.img || product.images?.[0] || '',
        }

        setEnquiryItems((prev) => [...prev, normalizedProduct])
        showToast(`Added "${product.name}" to Enquiry Bag`)
    }

    const removeFromEnquiry = (idOrProduct) => {
        if (!idOrProduct) return
        const targetId = getProductIdentifier(idOrProduct)
        setEnquiryItems((prev) => prev.filter((item) => getProductIdentifier(item) !== targetId))
        showToast('Item removed from Enquiry Bag')
    }

    const clearEnquiry = () => {
        setEnquiryItems([])
        showToast('Enquiry Bag cleared')
    }

    const isInEnquiry = (idOrProduct) => {
        if (!idOrProduct) return false
        const targetId = getProductIdentifier(idOrProduct)
        return enquiryItems.some((item) => getProductIdentifier(item) === targetId)
    }

    // Direct WhatsApp enquiry for a single product
    const sendSingleEnquiry = (product) => {
        const prodId = getProductIdentifier(product)
        const text = `*Rangoli Jewellers - Product Enquiry*

Namaste! I am interested in knowing more details about this design from your catalogue:

• *Design:* ${product.name}
• *Product Code:* ${product.code || 'RJ-' + prodId}
• *Category:* ${product.category}
• *Specifications:* ${product.specs || product.purity || 'Certified Fine Jewellery'}

Please share the pricing, weight, purity, and customisation options. Thank you!`

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
        window.open(url, '_blank')
    }

    // Bulk WhatsApp enquiry for multiple products
    const sendBulkEnquiry = () => {
        if (enquiryItems.length === 0) return

        let itemsList = enquiryItems
            .map(
                (item, index) =>
                    `${index + 1}. *${item.name}* (Code: ${item.code || 'RJ-' + getProductIdentifier(item)}, Category: ${item.category})`
            )
            .join('\n')

        const text = `*Rangoli Jewellers - Multi-Item Catalogue Enquiry*

Namaste! I have selected the following ${enquiryItems.length} piece(s) from your jewellery catalogue for enquiry:

${itemsList}

Please provide detailed information regarding pricing, purity (18K/22K), gold weight, diamond quality, and availability for these designs. Thank you!`

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
        window.open(url, '_blank')
    }

    return (
        <EnquiryContext.Provider
            value={{
                enquiryItems,
                addToEnquiry,
                removeFromEnquiry,
                clearEnquiry,
                isInEnquiry,
                isDrawerOpen,
                setIsDrawerOpen,
                sendSingleEnquiry,
                sendBulkEnquiry,
                toastMessage,
                whatsappNumber: WHATSAPP_NUMBER,
            }}
        >
            {children}
        </EnquiryContext.Provider>
    )
}
