import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name:
        process.env.CLOUDINARY_CLOUD_NAME ||
        process.env.Cloud_name ||
        process.env.CLOUD_NAME ||
        'do98lw5ja',
    api_key:
        process.env.CLOUDINARY_API_KEY ||
        process.env.api_key ||
        process.env.API_KEY ||
        '583527923455373',
    api_secret:
        process.env.CLOUDINARY_API_SECRET ||
        process.env.api_secret ||
        process.env.API_SECRET ||
        '5WethyQUAWCmaTMOu6OBCTFN17E',
    secure: true,
})

export default cloudinary
