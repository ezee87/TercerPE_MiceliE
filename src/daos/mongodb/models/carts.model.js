import mongoose from "mongoose";

const CartsSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      default: [],
    },
  ],
});

 CartsSchema.pre('find', function () {
 this.populate('products');
});

export const CartModel = mongoose.model("carts", CartsSchema);