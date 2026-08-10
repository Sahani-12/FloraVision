import express from 'express';
import {
  applyCoupon,
  getCoupons,
  createCoupon,
  deleteCoupon
} from '../controllers/couponController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/apply', applyCoupon);

router.route('/')
  .get(protect, adminOnly, getCoupons)
  .post(protect, adminOnly, createCoupon);

router.delete('/:id', protect, adminOnly, deleteCoupon);

export default router;
