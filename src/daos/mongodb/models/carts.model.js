import mongoose from 'mongoose';

const cartsSchema = new mongoose.Schema({
   products: { type: String, required: true }
});

export const CartsModel = mongoose.model(
   'carts',
   cartsSchema 
);