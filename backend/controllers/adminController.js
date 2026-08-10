import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

// @desc    Get Admin Dashboard Stats (KPIs, total revenue, counts)
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = async (req, res, next) => {
  try {
    const totalPlants = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();

    const orders = await Order.find({});
    
    // Revenue Breakdown Calculation
    let totalRevenue = 0;
    let paidRevenue = 0;
    let deliveredRevenue = 0;
    let pendingRevenue = 0;
    let totalDiscounts = 0;

    orders.forEach((o) => {
      const amount = Number(o.totalAmount || o.total || o.subtotal || 0);
      const discount = Number(o.discountAmount || o.discount || 0);
      totalDiscounts += discount;

      const isCancelled = (o.orderStatus || o.status) === 'cancelled';
      if (!isCancelled) {
        totalRevenue += amount;

        if (o.paymentStatus === 'completed' || (o.paymentMethod && o.paymentMethod !== 'COD')) {
          paidRevenue += amount;
        } else {
          pendingRevenue += amount;
        }

        if ((o.orderStatus || o.status) === 'delivered') {
          deliveredRevenue += amount;
        }
      }
    });

    const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    const recentOrders = await Order.find({}).sort('-createdAt').limit(5).populate('user', 'name email');
    const topProducts = await Product.find({}).sort('-numReviews').limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalPlants,
        totalOrders,
        totalUsers,
        totalRevenue,
        paidRevenue,
        deliveredRevenue,
        pendingRevenue,
        averageOrderValue,
        totalDiscounts,
        recentOrders,
        topProducts
      }
    });
  } catch (err) {
    next(err);
  }
};
