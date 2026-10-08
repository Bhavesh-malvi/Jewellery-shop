import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { HiOutlineLockClosed, HiOutlineEnvelope, HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2'
import { BsPatchCheckFill } from 'react-icons/bs'
import { useAdminAuth } from '../../context/AdminAuthContext'

const AdminLogin = () => {
    const { login, isAuthenticated } = useAdminAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin', { replace: true })
        }
    }, [isAuthenticated, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('')
        setLoading(true)

        const result = await login(email, password)
        setLoading(false)

        if (result.success) {
            navigate('/admin')
        } else {
            setErrorMessage(result.message || 'Invalid admin credentials')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1E2922] via-[#2A3B31] to-[#16201A] flex items-center justify-center p-4 font-roboto">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-[#d4af37]/40 overflow-hidden">
                {/* Header Branding Banner */}
                <div className="bg-[#1F2B24] p-8 text-center border-b border-[#d4af37]/30 relative">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#d4af37] to-[#f3e5ab] p-0.5 shadow-lg mb-3 flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-[#1F2B24] flex items-center justify-center text-[#d4af37] font-playfair font-bold text-2xl">
                            RJ
                        </div>
                    </div>
                    <h1 className="font-playfair text-2xl text-white font-medium tracking-wide">
                        Rangoli Jewellers
                    </h1>
                    <p className="text-xs uppercase tracking-widest text-[#d4af37] font-mono mt-1 flex items-center justify-center gap-1.5">
                        <BsPatchCheckFill className="text-sm" />
                        <span>Showroom Admin Portal</span>
                    </p>
                </div>

                {/* Form Body */}
                <div className="p-8 space-y-6">
                    {errorMessage && (
                        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                            <span className="font-bold">Error:</span>
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                                Admin Email
                            </label>
                            <div className="relative">
                                <HiOutlineEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your admin email"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#304037] focus:ring-2 focus:ring-[#304037]/20 outline-none text-sm transition-all bg-gray-50/50 focus:bg-white"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-300 focus:border-[#304037] focus:ring-2 focus:ring-[#304037]/20 outline-none text-sm transition-all bg-gray-50/50 focus:bg-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-[#304037] hover:bg-[#222E27] text-white font-medium text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all duration-200 border border-[#d4af37]/50 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <span>Sign In to Dashboard</span>
                            )}
                        </button>
                    </form>

                    {/* Back to Home Link */}
                    <div className="text-center pt-2">
                        <Link
                            to="/"
                            className="text-xs text-gray-500 hover:text-[#304037] hover:underline"
                        >
                            ← Return to Customer Jewellery Store
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
