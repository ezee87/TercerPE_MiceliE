import mongoose from 'mongoose';
import 'dotenv/config'

export const initMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_PROD || process.env.MONGO_LOCAL);
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
};