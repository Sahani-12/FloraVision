import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/uploadController.js';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

const router = express.Router();

const uploadMiddleware = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    // Continue even if not a multipart request (e.g. base64 JSON payload)
    next();
  });
};

router.post('/', uploadMiddleware, uploadImage);

export default router;
