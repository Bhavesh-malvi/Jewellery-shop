import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { FiDownload } from 'react-icons/fi'
import { usePwa } from '../context/PwaContext'
import AppIcon from '../../public/favicon.png'

const InstallAppBanner = () => {
    const { isInstalled, isBannerDismissed, dismissBanner, installApp } = usePwa()

    // Do not show if already installed in standalone mode or dismissed in this session
    if (isInstalled || isBannerDismissed) return null

    return (
        <aside
            aria-label="App download prompt"
            className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-40 bg-gradient-to-r from-[#24312A] to-[#304037] text-white rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-[#d4af37]/40 flex items-center justify-between gap-3 animate-slideUp backdrop-blur-md"
        >
            {/* Logo & Text */}
            <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-white/10 p-1 shrink-0 border border-[#d4af37]/50 flex items-center justify-center overflow-hidden">
                    <img src={AppIcon} alt="Rangoli App Icon" className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-playfair font-semibold text-white truncate">
                        Rangoli Jewellers App
                    </h4>
                    <p className="text-[11px] text-gray-300 font-roboto truncate">
                        Install on your phone for 1-tap catalogue access
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
                <button
                    onClick={installApp}
                    className="py-1.5 px-3 sm:px-3.5 rounded-xl bg-[#d4af37] hover:bg-[#bfa030] text-[#1F2B24] text-xs font-roboto font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all duration-200 cursor-pointer active:scale-95"
                >
                    <FiDownload className="text-sm shrink-0" />
                    <span>Install</span>
                </button>
                <button
                    onClick={dismissBanner}
                    aria-label="Dismiss banner"
                    className="w-7 h-7 rounded-full text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                >
                    <IoCloseOutline className="text-lg" />
                </button>
            </div>
        </aside>
    )
}

export default InstallAppBanner
