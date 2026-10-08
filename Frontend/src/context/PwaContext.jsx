import React, { createContext, useContext, useState, useEffect } from 'react'

const PwaContext = createContext()

export const usePwa = () => {
    const context = useContext(PwaContext)
    if (!context) {
        throw new Error('usePwa must be used within a PwaProvider')
    }
    return context
}

export const PwaProvider = ({ children }) => {
    const [deferredPrompt, setDeferredPrompt] = useState(null)
    const [isInstallable, setIsInstallable] = useState(false)
    const [isInstalled, setIsInstalled] = useState(false)
    const [isQrModalOpen, setIsQrModalOpen] = useState(false)
    const [isIosModalOpen, setIsIosModalOpen] = useState(false)
    const [isBannerDismissed, setIsBannerDismissed] = useState(() => {
        try {
            return sessionStorage.getItem('rangoli_pwa_banner_dismissed') === 'true'
        } catch {
            return false
        }
    })

    const isIOS =
        typeof navigator !== 'undefined' &&
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !window.MSStream

    useEffect(() => {
        // Check if already running in standalone app mode
        const isStandalone =
            window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true

        if (isStandalone) {
            setIsInstalled(true)
        }

        // Listen for browser install prompt
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault()
            setDeferredPrompt(e)
            setIsInstallable(true)
        }

        // Listen for successful install
        const handleAppInstalled = () => {
            setIsInstalled(true)
            setIsInstallable(false)
            setDeferredPrompt(null)
            setIsQrModalOpen(false)
            setIsIosModalOpen(false)
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        window.addEventListener('appinstalled', handleAppInstalled)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
            window.removeEventListener('appinstalled', handleAppInstalled)
        }
    }, [])

    const installApp = async () => {
        // If on iOS Safari, show the iOS Add to Home Screen guide
        if (isIOS) {
            setIsIosModalOpen(true)
            return
        }

        // If native prompt is available (Android Chrome, Edge, etc.)
        if (deferredPrompt) {
            try {
                deferredPrompt.prompt()
                const { outcome } = await deferredPrompt.userChoice
                if (outcome === 'accepted') {
                    setIsInstalled(true)
                    setIsInstallable(false)
                }
                setDeferredPrompt(null)
            } catch (err) {
                console.error('Error prompting install:', err)
                setIsQrModalOpen(true)
            }
            return
        }

        // If on desktop or browser doesn't expose prompt, open QR Code modal
        setIsQrModalOpen(true)
    }

    const dismissBanner = () => {
        setIsBannerDismissed(true)
        try {
            sessionStorage.setItem('rangoli_pwa_banner_dismissed', 'true')
        } catch {
            // ignore
        }
    }

    const openQrModal = () => {
        setIsQrModalOpen(true)
    }

    const closeQrModal = () => {
        setIsQrModalOpen(false)
    }

    const closeIosModal = () => {
        setIsIosModalOpen(false)
    }

    return (
        <PwaContext.Provider
            value={{
                isInstallable,
                isInstalled,
                isIOS,
                installApp,
                openQrModal,
                closeQrModal,
                isQrModalOpen,
                isIosModalOpen,
                closeIosModal,
                isBannerDismissed,
                dismissBanner,
            }}
        >
            {children}
        </PwaContext.Provider>
    )
}
