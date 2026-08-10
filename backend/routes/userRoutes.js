import express from 'express';
import {
  getUsers,
  updateUserProfile,
  toggleWishlist
} from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, adminOnly, getUsers);
router.put('/profile', protect, updateUserProfile);
router.post('/wishlist/:productId', protect, toggleWishlist);

export default router;
