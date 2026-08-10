import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/floravision');
  console.log('Connected to MongoDB');

  // Fix broken image URLs in MongoDB
  const FIXES = [
    {
      name: 'Sansevieria Snake Plant',
      oldUrl: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=800&q=80',
      newUrl: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Peace Lily (Spathiphyllum)',
      oldUrl: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=800&q=80',
      newUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }), 'products');
  
  for (const fix of FIXES) {
    const result = await Product.updateMany(
      { images: fix.oldUrl },
      { $set: { 'images.$[elem]': fix.newUrl } },
      { arrayFilters: [{ 'elem': fix.oldUrl }] }
    );
    console.log(`Fixed "${fix.name}": ${result.modifiedCount} doc(s) updated`);
  }

  // List all products to verify
  const allProducts = await Product.find({}).select('name images categoryName').lean();
  console.log('\nAll products after fix:');
  for (const p of allProducts) {
    console.log(`- ${p.name} [${p.categoryName}]: ${p.images?.[0]?.substring(0, 80) || 'NO IMAGE'}`);
  }
  
  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err.message);
  process.exit(1);
});
