import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/floravision');
  console.log('Connected to MongoDB');

  const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));
  const products = await Product.find({}).select('name images categoryName').lean();
  console.log(JSON.stringify(products, null, 2));
  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err.message);
  process.exit(1);
});
