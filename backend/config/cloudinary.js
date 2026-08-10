import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dr965c1ht',
  api_key: process.env.CLOUDINARY_API_KEY || '797861976786782',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'n6kGfUvKtiNN02nzcwWCDQonrF4'
});

export default cloudinary;
