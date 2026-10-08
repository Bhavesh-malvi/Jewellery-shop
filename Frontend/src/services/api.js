import axios from 'axios'

// API Base URL - Backend runs on port 5001
const API_BASE_URL =
    import.meta.env.VITE_API_URL || 'https://jewellery-shop-el20.onrender.com/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor to attach JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('rangoli_admin_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // If unauthorized on admin endpoint, clear token
            if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
                localStorage.removeItem('rangoli_admin_token')
                localStorage.removeItem('rangoli_admin_user')
                window.location.href = '/admin/login'
            }
        }
        return Promise.reject(error)
    }
)

export default api
export { API_BASE_URL }
