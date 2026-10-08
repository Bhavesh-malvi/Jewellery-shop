import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AdminAuthContext = createContext()

export const useAdminAuth = () => {
    const context = useContext(AdminAuthContext)
    if (!context) {
        throw new Error('useAdminAuth must be used within an AdminAuthProvider')
    }
    return context
}

export const AdminAuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('rangoli_admin_token') || null)
    const [adminUser, setAdminUser] = useState(() => {
        try {
            const saved = localStorage.getItem('rangoli_admin_user')
            return saved ? JSON.parse(saved) : null
        } catch {
            return null
        }
    })
    const [loading, setLoading] = useState(true)
    const [authError, setAuthError] = useState(null)

    // Verify token on initial load
    useEffect(() => {
        const verifyAuth = async () => {
            const savedToken = localStorage.getItem('rangoli_admin_token')
            if (savedToken) {
                try {
                    const res = await api.get('/auth/me')
                    if (res.data.success && res.data.user) {
                        setAdminUser(res.data.user)
                    }
                } catch (err) {
                    console.warn('Session expired or invalid token:', err.message)
                    logout()
                }
            }
            setLoading(false)
        }

        verifyAuth()
    }, [])

    const login = async (email, password) => {
        setAuthError(null)
        try {
            const res = await api.post('/auth/login', { email, password })
            if (res.data.success && res.data.token) {
                const authToken = res.data.token
                const userData = res.data.user

                localStorage.setItem('rangoli_admin_token', authToken)
                localStorage.setItem('rangoli_admin_user', JSON.stringify(userData))

                setToken(authToken)
                setAdminUser(userData)
                return { success: true }
            } else {
                setAuthError(res.data.message || 'Login failed')
                return { success: false, message: res.data.message || 'Login failed' }
            }
        } catch (error) {
            const msg =
                error.response?.data?.message || error.message || 'Failed to login to admin panel'
            setAuthError(msg)
            return { success: false, message: msg }
        }
    }

    const logout = () => {
        localStorage.removeItem('rangoli_admin_token')
        localStorage.removeItem('rangoli_admin_user')
        setToken(null)
        setAdminUser(null)
        setAuthError(null)
    }

    return (
        <AdminAuthContext.Provider
            value={{
                token,
                adminUser,
                isAuthenticated: Boolean(token),
                loading,
                authError,
                login,
                logout,
            }}
        >
            {children}
        </AdminAuthContext.Provider>
    )
}
