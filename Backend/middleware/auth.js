import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET || 'rangoli_jewellers_super_secret_jwt_key_2026_xyz'
            )

            // Find user from DB or handle memory fallback
            let user = await User.findById(decoded.id).select('-password')
            if (!user) {
                // If DB is offline or mock admin was used
                if (decoded.email === (process.env.ADMIN_EMAIL || 'admin@rangoli.com')) {
                    user = {
                        _id: decoded.id,
                        name: decoded.name || 'Rangoli Admin',
                        email: decoded.email,
                        role: 'admin',
                    }
                } else {
                    return res
                        .status(401)
                        .json({ success: false, message: 'User no longer exists' })
                }
            }

            req.user = user
            next()
        } catch (error) {
            console.error('Auth verification error:', error.message)
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token. Please log in again.',
            })
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No authorization token provided.',
        })
    }
}

export const adminOnly = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
        next()
    } else {
        return res.status(403).json({
            success: false,
            message: 'Forbidden. Admin privileges required.',
        })
    }
}

export default { protect, adminOnly }
