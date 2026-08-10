import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/floravision';

  if (isConnected) {
    return true;
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`⚠️ MongoDB Connection Warning: ${error.message}`);
    console.log('ℹ️ FloraVision API operating with resilient fallback mode.');
    return false;
  }
};
