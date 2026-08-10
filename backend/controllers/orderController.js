import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public / Private
export const createOrder = async (req, res, next) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingFee,
      discountAmount,
      couponCode,
      totalAmount
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items provided' });
    }

    const orderNum = `FV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const trkNum = `TRK-FLORA-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Estimated delivery in 3 business days
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 3);

    const userId = req.user ? req.user._id : null;

    const order = await Order.create({
      orderNumber: orderNum,
      user: userId,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || 'COD',
      paymentStatus: paymentMethod === 'COD' ? 'pending' : 'completed',
      orderStatus: 'placed',
      courierPartner: 'FloraVision Express Nursery Logistics',
      trackingNumber: trkNum,
      estimatedDeliveryDate: estDate,
      subtotal,
      shippingFee: shippingFee || 0,
      discountAmount: discountAmount || 0,
      couponCode: couponCode || '',
      totalAmount,
      trackingHistory: [
        {
          status: 'placed',
          comment: 'Order placed & confirmed at FloraVision Nursery',
          location: 'Central Botanical Warehouse, Mumbai'
        }
      ]
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Public Track Order by Order ID or Number or Phone
// @route   GET /api/orders/track/:query
// @access  Public
export const trackOrder = async (req, res, next) => {
  try {
    const { query } = req.params;
    const cleanQuery = query.trim();

    let order = null;
    if (cleanQuery.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(cleanQuery);
    }

    if (!order) {
      order = await Order.findOne({
        $or: [
          { orderNumber: { $regex: cleanQuery, $options: 'i' } },
          { trackingNumber: { $regex: cleanQuery, $options: 'i' } },
          { 'shippingAddress.phone': { $regex: cleanQuery, $options: 'i' } }
        ]
      }).sort('-createdAt');
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'No matching order found. Please check Order ID or Mobile Number.' });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public / Private
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort('-createdAt');
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status & tracking (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus, comment, paymentStatus, trackingNumber, courierPartner, location } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (courierPartner) order.courierPartner = courierPartner;

    if (orderStatus) {
      order.orderStatus = orderStatus;
      
      const statusLabels = {
        placed: 'Order Placed & Confirmed',
        processing: 'Nursery Processing & Health Inspection',
        packed: 'Packed in Eco-Vented Protective Box',
        shipped: 'Handed over to Express Courier Partner',
        out_for_delivery: 'Out for Local Delivery Today',
        delivered: 'Delivered Successfully to Customer',
        cancelled: 'Order Cancelled'
      };

      order.trackingHistory.push({
        status: orderStatus,
        comment: comment || statusLabels[orderStatus] || `Status updated to ${orderStatus}`,
        location: location || 'FloraVision Delivery Hub'
      });
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();

    res.status(200).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete order (Admin only)
// @route   DELETE /api/orders/:id
// @access  Private/Admin
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json({ success: true, message: 'Order record deleted' });
  } catch (error) {
    next(error);
  }
};
