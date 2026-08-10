import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/floravision');
  
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  console.log('Collections in DB:', collections.map(c => c.name));
  
  // Check if there's data in ANY collection that includes the plant names from the screenshot
  for (const col of collections) {
    const collection = db.collection(col.name);
    const count = await collection.countDocuments();
    console.log(`  ${col.name}: ${count} documents`);
    
    // Sample first doc
    const sample = await collection.findOne({});
    if (sample) {
      console.log(`    Sample keys: ${Object.keys(sample).join(', ')}`);
      if (sample.name) console.log(`    Sample name: ${sample.name}`);
    }
  }
  
  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err.message);
  process.exit(1);
});
