import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  trackOrder
} from '../controllers/orderController.js';
import { protect, adminOnly, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(optionalAuth, createOrder)
  .get(protect, adminOnly, getAllOrders);

router.get('/track/:query', trackOrder);
router.get('/myorders', protect, getMyOrders);

router.route('/:id')
  .get(getOrderById)
  .delete(protect, adminOnly, deleteOrder);

router.put('/:id/status', protect, adminOnly, updateOrderStatus);

export default router;
