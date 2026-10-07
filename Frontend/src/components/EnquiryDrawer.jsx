import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { FaWhatsapp } from 'react-icons/fa6'
import { HiOutlineTrash } from 'react-icons/hi2'
import { BsBagHeart } from 'react-icons/bs'
import { useEnquiry } from '../context/EnquiryContext'

const EnquiryDrawer = () => {
    const {
        enquiryItems,
        removeFromEnquiry,
        clearEnquiry,
        isDrawerOpen,
        setIsDrawerOpen,
        sendBulkEnquiry,
        toastMessage,
    } = useEnquiry()

    return (
        <>
            {/* Global Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-[100] bg-[#304037] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#d4af37]/40 flex items-center gap-3 animate-bounce">
                    <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                    <span className="text-sm font-roboto">{toastMessage}</span>
                </div>
            )}

            {/* Backdrop */}
            {isDrawerOpen && (
                <div
                    onClick={() => setIsDrawerOpen(false)}
                    className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                />
            )}

            {/* Slide-over Drawer Panel */}
            <aside
                className={`fixed top-0 right-0 h-full w-full sm:w-[460px] bg-white z-[70] shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out ${
                    isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Drawer Header */}
                <div className="p-5 sm:p-6 bg-[#304037] text-white flex items-center justify-between border-b border-[#3e5247]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#24312a] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                            <BsBagHeart className="text-xl" />
                        </div>
                        <div>
                            <h2 className="text-lg font-playfair font-medium tracking-wide">
                                Enquiry Bag
                            </h2>
                            <p className="text-xs text-gray-300 font-roboto">
                                {enquiryItems.length} {enquiryItems.length === 1 ? 'Design' : 'Designs'} Selected
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsDrawerOpen(false)}
                        aria-label="Close"
                        className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 text-gray-200 hover:text-white transition-colors cursor-pointer text-2xl"
                    >
                        <IoCloseOutline />
                    </button>
                </div>

                {/* Drawer Body (Items List) */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                    {enquiryItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                <BsBagHeart className="text-3xl" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-playfair text-gray-800">
                                    Your Enquiry Bag is Empty
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-500 font-roboto max-w-xs">
                                    Browse our signature jewellery catalogue and add pieces you would like to enquire about.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="mt-2 px-6 py-2.5 rounded-full bg-[#304037] text-white text-xs font-roboto uppercase tracking-wider hover:bg-[#d4af37] hover:text-[#1c2922] transition-colors cursor-pointer"
                            >
                                Explore Catalogue
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between text-xs text-gray-500 pb-2 border-b border-gray-100 font-roboto">
                                <span>Selected Items for WhatsApp Enquiry</span>
                                <button
                                    onClick={clearEnquiry}
                                    className="text-red-500 hover:underline cursor-pointer"
                                >
                                    Clear All
                                </button>
                            </div>

                            <div className="space-y-3">
                                {enquiryItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 p-3 rounded-xl border border-gray-200 hover:border-[#d4af37]/50 bg-[#FAF9F6] transition-all"
                                    >
                                        <div className="w-16 h-16 rounded-lg bg-white p-1 shrink-0 border border-gray-200 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold font-roboto">
                                                    {item.category}
                                                </span>
                                                <span className="text-[10px] text-gray-400 font-roboto">
                                                    • Code: {item.code || 'RJ-' + item.id}
                                                </span>
                                            </div>
                                            <h4 className="text-sm font-playfair text-[#304037] font-medium truncate">
                                                {item.name}
                                            </h4>
                                            {item.specs && (
                                                <p className="text-[11px] text-gray-500 font-roboto truncate">
                                                    {item.specs}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => removeFromEnquiry(item.id)}
                                            aria-label="Remove item"
                                            className="text-gray-400 hover:text-red-500 p-2 transition-colors cursor-pointer"
                                        >
                                            <HiOutlineTrash className="text-lg" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Drawer Footer (WhatsApp Send Button) */}
                {enquiryItems.length > 0 && (
                    <div className="p-5 sm:p-6 bg-[#FAF9F6] border-t border-gray-200 space-y-3">
                        <button
                            onClick={sendBulkEnquiry}
                            className="group/btn w-full py-3.5 px-4 rounded-xl bg-[#304037] hover:bg-[#233029] text-white border border-[#304037] hover:border-[#d4af37] font-roboto font-medium text-sm tracking-wide shadow-lg hover:shadow-[#304037]/30 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                        >
                            <FaWhatsapp className="text-2xl text-[#d4af37] group-hover/btn:scale-110 transition-transform duration-200" />
                            <span>
                                Send Enquiry on WhatsApp ({enquiryItems.length} {enquiryItems.length === 1 ? 'Item' : 'Items'})
                            </span>
                        </button>

                        <p className="text-[11px] text-gray-500 text-center font-roboto leading-relaxed">
                            ✦ Our jewellery expert will share real-time gold rates, custom weight, and certification on WhatsApp.
                        </p>
                    </div>
                )}
            </aside>
        </>
    )
}

export default EnquiryDrawer
