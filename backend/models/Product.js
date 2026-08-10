import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  size: { type: String, default: 'Medium' },
  potType: { type: String, default: 'Ceramic' },
  potColor: { type: String, default: 'Terracotta' },
  priceAdjustment: { type: Number, default: 0 },
  stock: { type: Number, default: 10 }
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please provide product description']
    },
    careGuide: {
      light: { type: String, default: 'Bright Indirect Light' },
      water: { type: String, default: 'Water once a week when top soil feels dry' },
      petFriendly: { type: Boolean, default: true },
      airPurifying: { type: Boolean, default: true }
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    categoryName: {
      type: String,
      default: 'Indoor Plants'
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      min: [0, 'Price must be positive']
    },
    discountPrice: {
      type: Number,
      default: 0
    },
    images: {
      type: [String],
      required: [true, 'Please provide at least one product image']
    },
    stock: {
      type: Number,
      required: [true, 'Please provide product stock quantity'],
      min: [0, 'Stock cannot be negative'],
      default: 15
    },
    variants: [variantSchema],
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5
    },
    numReviews: {
      type: Number,
      default: 0
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    tags: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

// Index for search & filter performance
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

const Product = mongoose.model('Product', productSchema);
export default Product;
