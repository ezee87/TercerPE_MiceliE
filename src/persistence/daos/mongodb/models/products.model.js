import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

productsSchema.plugin(mongoosePaginate);
export const ProductsModel = mongoose.model(productsCollection, productsSchema);