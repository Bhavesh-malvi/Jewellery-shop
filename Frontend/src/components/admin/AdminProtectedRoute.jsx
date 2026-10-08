import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'

const AdminProtectedRoute = () => {
    const { isAuthenticated, loading } = useAdminAuth()

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center font-roboto">
                <div className="w-12 h-12 border-3 border-[#d4af37]/30 border-t-[#304037] rounded-full animate-spin mb-4"></div>
                <p className="text-sm font-playfair text-[#304037] tracking-wider uppercase">
                    Verifying Rangoli Admin Session...
                </p>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />
    }

    return <Outlet />
}

export default AdminProtectedRoute
