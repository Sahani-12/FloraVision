import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subtitle: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 0 },
  category: { type: String, required: true },
  image: { type: String, required: true },
  isTrendy: { type: Boolean, default: false },
  isTopSelling: { type: Boolean, default: false },
  isO2: { type: Boolean, default: false },
  light: { type: String, default: 'Bright Indirect' }, // Low Light, Bright Indirect, Direct Sun
  water: { type: String, default: 'Weekly' }, // Low, Weekly, Bi-weekly
  petFriendly: { type: Boolean, default: true },
  careLevel: { type: String, default: 'Easy' }, // Easy, Moderate, Advanced
  description: { type: String, required: true },
  stock: { type: Number, default: 25 }
}, {
  timestamps: true
});

export const Plant = mongoose.models.Plant || mongoose.model('Plant', plantSchema);
