import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Please provide coupon code'],
      unique: true,
      uppercase: true,
      trim: true
    },
    discountType: {
      type: String,
      enum: ['flat', 'percent'],
      required: true
    },
    value: {
      type: Number,
      required: [true, 'Please provide discount value'],
      min: 0
    },
    minOrderValue: {
      type: Number,
      default: 0
    },
    expiryDate: {
      type: Date,
      required: [true, 'Please specify expiry date']
    },
    usageLimit: {
      type: Number,
      default: 100
    },
    usedCount: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;
