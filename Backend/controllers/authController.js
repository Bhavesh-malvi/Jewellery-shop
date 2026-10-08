import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

// Helper to generate JWT
export const generateToken = (id, email, name, role) => {
    return jwt.sign(
        { id, email, name, role },
        process.env.JWT_SECRET || 'rangoli_jewellers_super_secret_jwt_key_2026_xyz',
        { expiresIn: '7d' }
    )
}

// @desc    Login Admin
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both email and password',
            })
        }

        const normalizedEmail = email.toLowerCase().trim()

        // 1. Try finding in Database
        let user = null
        try {
            user = await User.findOne({ email: normalizedEmail }).select('+password')
        } catch (dbErr) {
            console.warn('DB lookup note in login:', dbErr.message)
        }

        // If user found in DB, verify password
        if (user) {
            const isMatch = await user.matchPassword(password)
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials. Incorrect password.',
                })
            }

            const token = generateToken(user._id, user.email, user.name, user.role)

            return res.json({
                success: true,
                message: 'Admin login successful',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            })
        }

        // 2. Fallback check for Default Configured Admin credentials (for quick setup)
        const defaultAdminEmail = (process.env.ADMIN_EMAIL || 'admin@rangoli.com').toLowerCase()
        const defaultAdminPassword = process.env.ADMIN_PASSWORD || 'admin123'

        if (normalizedEmail === defaultAdminEmail && password === defaultAdminPassword) {
            // Also attempt to persist this admin in DB if DB is accessible
            let createdId = '6ac738831a246fccd4c62685'
            try {
                const newAdmin = await User.create({
                    name: 'Rangoli Admin',
                    email: defaultAdminEmail,
                    password: defaultAdminPassword,
                    role: 'admin',
                })
                createdId = newAdmin._id
            } catch (createErr) {
                // Ignore if DB is offline or duplicate
            }

            const token = generateToken(
                createdId,
                defaultAdminEmail,
                'Rangoli Admin',
                'admin'
            )

            return res.json({
                success: true,
                message: 'Admin login successful (Default Admin)',
                token,
                user: {
                    id: createdId,
                    name: 'Rangoli Admin',
                    email: defaultAdminEmail,
                    role: 'admin',
                },
            })
        }

        return res.status(401).json({
            success: false,
            message: 'Invalid email or password. Use registered admin credentials.',
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error during authentication',
            error: error.message,
        })
    }
}

// @desc    Get current logged in admin
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        res.json({
            success: true,
            user: req.user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message,
        })
    }
}

export default { login, getMe, generateToken }
