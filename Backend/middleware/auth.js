import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
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

            // Find user from DB if valid ObjectId, or handle fallback admin
            let user = null
            if (decoded.id && mongoose.isValidObjectId(decoded.id)) {
                try {
                    user = await User.findById(decoded.id).select('-password')
                } catch {
                    user = null
                }
            }

            if (!user) {
                // If DB is offline or fallback admin token was used
                const defaultEmail = (process.env.ADMIN_EMAIL || 'admin@rangoli.com').toLowerCase()
                if (decoded.email && decoded.email.toLowerCase() === defaultEmail) {
                    user = {
                        _id: decoded.id || '6ac738831a246fccd4c62685',
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
            return next()
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
