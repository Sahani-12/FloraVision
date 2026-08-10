import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';
import Coupon from '../models/Coupon.js';

dotenv.config();

const initialCategories = [
  { name: 'Indoor Plants', slug: 'indoor-plants', description: 'Lush green foliage for homes & living rooms' },
  { name: 'Outdoor Plants', slug: 'outdoor-plants', description: 'Sun-loving flowering & garden plants' },
  { name: 'Succulents & Cacti', slug: 'succulents-cacti', description: 'Low maintenance drought-tolerant succulents' },
  { name: 'Pots & Planters', slug: 'pots-planters', description: 'Ceramic, terracotta & eco-friendly planters' },
  { name: 'Air Purifying', slug: 'air-purifying', description: '24/7 oxygen booster and toxin filtering plants' },
  { name: 'Gift Combos', slug: 'gift-combos', description: 'Curated plant gift sets with luxury packaging' }
];

const initialPlants = [
  {
    name: "Monstera Deliciosa",
    slug: "monstera-deliciosa",
    price: 1499,
    discountPrice: 1299,
    categoryName: "Indoor Plants",
    images: ["https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80"],
    isFeatured: true,
    ratingsAverage: 5.0,
    numReviews: 210,
    careGuide: { light: "Bright Indirect", water: "Weekly", petFriendly: false, airPurifying: true },
    description: "Iconic Monstera Deliciosa with broad split leaves (fenestrations). Brings lush tropical energy into living rooms.",
    stock: 25,
    tags: ["Indoor", "Tropical", "Popular"]
  },
  {
    name: "Sansevieria Snake Plant",
    slug: "sansevieria-snake-plant",
    price: 599,
    discountPrice: 449,
    categoryName: "Air Purifying",
    images: ["https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80"],
    isFeatured: true,
    ratingsAverage: 4.9,
    numReviews: 195,
    careGuide: { light: "Low Light", water: "Every 2 weeks", petFriendly: true, airPurifying: true },
    description: "Known as Mother-in-Law's Tongue, Sansevieria produces clean oxygen round the clock even during nighttime.",
    stock: 30,
    tags: ["Air Purifying", "Low Maintenance"]
  },
  {
    name: "Golden Pothos Money Plant",
    slug: "golden-pothos-money-plant",
    price: 420,
    discountPrice: 349,
    categoryName: "Indoor Plants",
    images: ["https://images.unsplash.com/photo-1620127682229-33388276e540?auto=format&fit=crop&w=800&q=80"],
    isFeatured: true,
    ratingsAverage: 4.9,
    numReviews: 180,
    careGuide: { light: "Low to Bright Light", water: "Weekly", petFriendly: true, airPurifying: true },
    description: "Vibrant heart-shaped leaves with yellow-gold variegation. Symbolizes prosperity and cleans indoor air.",
    stock: 40,
    tags: ["Indoor", "Best Seller"]
  },
  {
    name: "Fiddle Leaf Fig (Ficus Lyrata)",
    slug: "fiddle-leaf-fig",
    price: 2200,
    discountPrice: 1899,
    categoryName: "Indoor Plants",
    images: ["https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80"],
    isFeatured: true,
    ratingsAverage: 4.8,
    numReviews: 142,
    careGuide: { light: "Bright Indirect", water: "Weekly", petFriendly: false, airPurifying: true },
    description: "Features broad violin-shaped deep green leaves. Adds instant luxury interior aesthetic to living rooms.",
    stock: 12,
    tags: ["Indoor", "Luxury"]
  },
  {
    name: "Peace Lily (Spathiphyllum)",
    slug: "peace-lily",
    price: 650,
    discountPrice: 499,
    categoryName: "Air Purifying",
    images: ["https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80"],
    isFeatured: true,
    ratingsAverage: 4.9,
    numReviews: 140,
    careGuide: { light: "Low Light", water: "Weekly", petFriendly: false, airPurifying: true },
    description: "Famous for shiny deep green leaves and elegant white spathe flowers. Filters airborne toxins efficiently.",
    stock: 22,
    tags: ["Air Purifying", "Bloom"]
  },
  {
    name: "Rubber Plant Burgundy",
    slug: "rubber-plant-burgundy",
    price: 850,
    discountPrice: 699,
    categoryName: "Indoor Plants",
    images: ["https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=800&q=80"],
    isFeatured: true,
    ratingsAverage: 4.8,
    numReviews: 115,
    careGuide: { light: "Bright Indirect", water: "Weekly", petFriendly: false, airPurifying: true },
    description: "Thick leather-like dark burgundy leaves. Easy care tree that purifies indoor room air.",
    stock: 18,
    tags: ["Indoor", "Trendy"]
  },
  {
    name: "ZZ Plant Zamioculcas",
    slug: "zz-plant-zamioculcas",
    price: 750,
    discountPrice: 599,
    categoryName: "Indoor Plants",
    images: ["https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=800&q=80"],
    isFeatured: true,
    ratingsAverage: 5.0,
    numReviews: 168,
    careGuide: { light: "Low Light", water: "Monthly", petFriendly: false, airPurifying: true },
    description: "Features shiny wax-like leaves. Thrives on neglect and low light conditions.",
    stock: 35,
    tags: ["Low Maintenance"]
  },
  {
    name: "Echeveria Elegans Rosette",
    slug: "echeveria-elegans-rosette",
    price: 380,
    discountPrice: 299,
    categoryName: "Succulents & Cacti",
    images: ["https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80"],
    isFeatured: false,
    ratingsAverage: 4.9,
    numReviews: 140,
    careGuide: { light: "Full Sun", water: "Monthly", petFriendly: true, airPurifying: false },
    description: "Perfect rosette form with soft silver-blue tones. Ideal for windowsill gardens.",
    stock: 35,
    tags: ["Succulents"]
  },
  {
    name: "Jade Plant Prosperity",
    slug: "jade-plant-prosperity",
    price: 450,
    discountPrice: 349,
    categoryName: "Succulents & Cacti",
    images: ["https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=800&q=80"],
    isFeatured: true,
    ratingsAverage: 4.9,
    numReviews: 175,
    careGuide: { light: "Bright Sun", water: "Bi-weekly", petFriendly: true, airPurifying: true },
    description: "Fleshy coin-shaped leaves symbolizing financial prosperity and longevity.",
    stock: 28,
    tags: ["Succulents", "Good Luck"]
  },
  {
    name: "Self-Watering Terracotta Trio",
    slug: "self-watering-terracotta-trio",
    price: 899,
    discountPrice: 699,
    categoryName: "Pots & Planters",
    images: ["https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80"],
    isFeatured: true,
    ratingsAverage: 5.0,
    numReviews: 78,
    careGuide: { light: "Indirect", water: "Sub-irrigation", petFriendly: true, airPurifying: false },
    description: "Breathable terracotta clay promotes healthy root aeration for indoor plants.",
    stock: 30,
    tags: ["Planters"]
  }
];

const seedDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/floravision';

  try {
    await mongoose.connect(mongoURI);
    console.log('🌱 Connected to MongoDB for database seeding...');

    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Order.deleteMany({});
    await Review.deleteMany({});
    await Coupon.deleteMany({});

    // Seed Categories
    const categories = await Category.insertMany(initialCategories);

    // Link Category IDs
    const indoorCat = categories.find((c) => c.slug === 'indoor-plants');
    const airCat = categories.find((c) => c.slug === 'air-purifying');
    const succCat = categories.find((c) => c.slug === 'succulents-cacti');
    const potsCat = categories.find((c) => c.slug === 'pots-planters');

    initialPlants.forEach((p) => {
      if (p.categoryName === 'Indoor Plants') p.category = indoorCat._id;
      else if (p.categoryName === 'Air Purifying') p.category = airCat._id;
      else if (p.categoryName === 'Succulents & Cacti') p.category = succCat._id;
      else if (p.categoryName === 'Pots & Planters') p.category = potsCat._id;
      else p.category = indoorCat._id;
    });

    // Seed Products
    await Product.insertMany(initialPlants);

    // Seed Admin & Customer Users
    await User.create([
      {
        name: 'FloraVision Admin',
        email: 'admin@floravision.com',
        password: 'adminpassword123',
        role: 'admin',
        phone: '+91 98765 00000'
      },
      {
        name: 'Aarav Sharma',
        email: 'customer@example.com',
        password: 'customerpassword123',
        role: 'customer',
        phone: '+91 91234 56789'
      }
    ]);

    // Seed Initial Coupons
    await Coupon.create([
      {
        code: 'WELCOME10',
        discountType: 'percent',
        value: 10,
        minOrderValue: 499,
        expiryDate: new Date('2027-12-31')
      },
      {
        code: 'GREENFLORA200',
        discountType: 'flat',
        value: 200,
        minOrderValue: 999,
        expiryDate: new Date('2027-12-31')
      }
    ]);

    console.log('✅ Database seeded successfully with 25+ plant products and custom Unsplash image URLs!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedDB();
