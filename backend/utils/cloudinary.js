import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({});

try {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
} catch (error) {
    console.error('Cloudinary configuration error:', error);
}
export default cloudinary;