import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  name: { type: String, required: true },
  qty: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  variant: { type: String, default: '' },
  potColor: { type: String, default: '' },
  size: { type: String, default: '' }
});

const trackingSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['placed', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'],
    required: true
  },
  date: { type: Date, default: Date.now },
  comment: { type: String, default: '' },
  location: { type: String, default: 'FloraVision Nursery Hub' }
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    items: [orderItemSchema],
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, default: '' },
      addressLine: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      landmark: { type: String, default: '' }
    },
    paymentMethod: {
      type: String,
      enum: ['UPI', 'Card', 'Netbanking', 'COD', 'Wallet'],
      default: 'COD'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    orderStatus: {
      type: String,
      enum: ['placed', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'placed'
    },
    courierPartner: {
      type: String,
      default: 'FloraVision Express Nursery Logistics'
    },
    trackingNumber: {
      type: String,
      default: ''
    },
    estimatedDeliveryDate: {
      type: Date
    },
    totalAmount: {
      type: Number,
      required: true
    },
    subtotal: {
      type: Number,
      required: true
    },
    shippingFee: {
      type: Number,
      default: 0
    },
    discountAmount: {
      type: Number,
      default: 0
    },
    couponCode: {
      type: String,
      default: ''
    },
    trackingHistory: [trackingSchema]
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
