import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({});

// Validate Cloudinary environment variables
const requiredCloudinaryVars = ['CLOUD_NAME', 'API_KEY', 'API_SECRET'];
const missingCloudinaryVars = requiredCloudinaryVars.filter(envVar => !process.env[envVar]);

if (missingCloudinaryVars.length > 0) {
    console.warn('⚠️ Missing Cloudinary environment variables:', missingCloudinaryVars);
    console.warn('📷 Image upload functionality will not work');
}

try {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
    console.log('✅ Cloudinary configured successfully');
} catch (error) {
    console.error('❌ Cloudinary configuration error:', error);
}
export default cloudinary;