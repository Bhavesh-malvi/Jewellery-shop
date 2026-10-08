import React, { useState } from 'react'
import { IoCloseOutline, IoQrCodeOutline, IoShareOutline, IoCheckmarkCircle, IoCopyOutline } from 'react-icons/io5'
import { FiDownload, FiSmartphone } from 'react-icons/fi'
import { BsPatchCheckFill } from 'react-icons/bs'
import { QRCodeSVG } from 'qrcode.react'
import { usePwa } from '../context/PwaContext'
import AppIcon from '../../public/app-icon.png'

const InstallAppModal = () => {
    const {
        isQrModalOpen,
        closeQrModal,
        isIosModalOpen,
        closeIosModal,
        isIOS,
        installApp,
        isInstallable,
    } = usePwa()

    const [copied, setCopied] = useState(false)

    // Current website URL for the QR code
    const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://rangolijewellers.com'

    const handleCopyLink = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(currentUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2500)
        }
    }

    if (!isQrModalOpen && !isIosModalOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            {/* 1. iOS Safari Instruction Modal */}
            {isIosModalOpen && (
                <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#EDE8E0] overflow-hidden p-6 sm:p-7 space-y-6 text-center">
                    <button
                        onClick={closeIosModal}
                        aria-label="Close"
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                    >
                        <IoCloseOutline className="text-xl" />
                    </button>

                    <div className="flex flex-col items-center space-y-3">
                        <div className="w-18 h-18 rounded-2xl bg-[#24312A] shadow-xl border border-[#d4af37]/50 overflow-hidden flex items-center justify-center">
                            <img src={AppIcon} alt="Rangoli Jewellers App" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-playfair font-semibold text-[#1F2B24]">
                            Install on iPhone / iPad
                        </h3>
                        <p className="text-xs text-gray-500 font-roboto">
                            Follow these simple 3 steps in Safari to add Rangoli Jewellers to your Home Screen:
                        </p>
                    </div>

                    <div className="space-y-3 text-left font-roboto text-xs sm:text-sm">
                        <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#F9F7F3] border border-gray-200">
                            <span className="w-6 h-6 rounded-full bg-[#304037] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                1
                            </span>
                            <div className="space-y-0.5">
                                <p className="font-semibold text-gray-800">
                                    Tap the <span className="inline-flex items-center gap-1 text-[#304037] font-bold"><IoShareOutline className="text-base inline" /> Share</span> button
                                </p>
                                <p className="text-gray-500 text-xs">
                                    Located in Safari's bottom toolbar on your iPhone.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#F9F7F3] border border-gray-200">
                            <span className="w-6 h-6 rounded-full bg-[#304037] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                2
                            </span>
                            <div className="space-y-0.5">
                                <p className="font-semibold text-gray-800">
                                    Select <span className="font-bold text-[#304037]">"Add to Home Screen"</span>
                                </p>
                                <p className="text-gray-500 text-xs">
                                    Scroll down in the share menu until you see the plus ⊞ icon.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#F9F7F3] border border-gray-200">
                            <span className="w-6 h-6 rounded-full bg-[#304037] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                3
                            </span>
                            <div className="space-y-0.5">
                                <p className="font-semibold text-gray-800">
                                    Tap <span className="font-bold text-[#304037]">"Add"</span> (Top Right)
                                </p>
                                <p className="text-gray-500 text-xs">
                                    The Rangoli Jewellers app icon will now appear on your phone's home screen!
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={closeIosModal}
                        className="w-full py-3 rounded-xl bg-[#304037] hover:bg-[#233029] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                        Got It, Done!
                    </button>
                </div>
            )}

            {/* 2. QR Code & App Download Modal (Desktop / Android / Showroom Counter) */}
            {isQrModalOpen && (
                <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#EDE8E0] overflow-hidden p-6 sm:p-8 space-y-6 text-center">
                    <button
                        onClick={closeQrModal}
                        aria-label="Close"
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                    >
                        <IoCloseOutline className="text-xl" />
                    </button>

                    {/* Header */}
                    <div className="flex flex-col items-center space-y-2.5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#304037]/10 text-[#304037] text-xs font-roboto font-semibold uppercase tracking-wider">
                            <BsPatchCheckFill className="text-[#d4af37]" />
                            <span>Official Mobile App</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-playfair font-semibold text-[#1F2B24]">
                            Download Rangoli Jewellers App
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 font-roboto max-w-sm">
                            Scan this QR code with any phone camera to install our jewellery app directly on your home screen.
                        </p>
                    </div>

                    {/* QR Code Container with Gold Border */}
                    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#F9F7F3] to-[#FAF9F6] rounded-2xl border-2 border-[#d4af37]/40 shadow-inner max-w-xs mx-auto space-y-3">
                        <div className="p-3 bg-white rounded-xl shadow-md border border-gray-200">
                            <QRCodeSVG
                                value={currentUrl}
                                size={190}
                                level="H"
                                fgColor="#304037"
                                bgColor="#ffffff"
                                imageSettings={{
                                    src: AppIcon,
                                    height: 38,
                                    width: 38,
                                    excavate: true,
                                }}
                            />
                        </div>
                        <span className="text-[11px] font-mono font-medium text-gray-500 flex items-center gap-1.5">
                            <IoQrCodeOutline className="text-sm text-[#d4af37]" />
                            <span>Scan with Phone Camera</span>
                        </span>
                    </div>

                    {/* If user is currently on an installable browser, show direct 1-click install button */}
                    {isInstallable && (
                        <div className="pt-1">
                            <button
                                onClick={installApp}
                                className="w-full py-3.5 px-5 rounded-xl bg-[#304037] hover:bg-[#233029] text-white text-xs sm:text-sm font-roboto font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all duration-300 cursor-pointer border border-[#d4af37]/50"
                            >
                                <FiDownload className="text-base text-[#d4af37]" />
                                <span>Install Directly on this Device</span>
                            </button>
                        </div>
                    )}

                    {/* Actions: Copy Link & Info */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-gray-100 text-xs text-gray-500 font-roboto">
                        <div className="flex items-center gap-2 text-left">
                            <FiSmartphone className="text-base text-[#304037] shrink-0" />
                            <span>Works on all Android & iPhones without Play Store download.</span>
                        </div>
                        <button
                            onClick={handleCopyLink}
                            className="inline-flex items-center gap-1.5 text-xs text-[#304037] hover:text-[#d4af37] font-medium py-1 px-2.5 rounded-lg border border-gray-200 hover:border-[#304037] transition-all cursor-pointer shrink-0"
                        >
                            {copied ? (
                                <>
                                    <IoCheckmarkCircle className="text-sm text-emerald-600" />
                                    <span className="text-emerald-700">Link Copied!</span>
                                </>
                            ) : (
                                <>
                                    <IoCopyOutline className="text-sm" />
                                    <span>Copy Link</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default InstallAppModal
