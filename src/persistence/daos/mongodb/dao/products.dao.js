import { ProductsModel } from "./models/products.model.js";

import { CartModel } from "./models/carts.model.js";

export default class ProductsDaoMongoDB {
  async addProductToCart(cartId, prodId) {
    try {
      const cart = await CartModel.findById(cartId);
      cart.products.push(prodId);
      cart.save();
    } catch (error) {
      console.log(error);
    }
  }
  async getProductById(id) {
    try {
      const response = await ProductsModel.findById(id)
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllProducts(page = 1, limit = 10) {
    try {
      const response = await ProductsModel.paginate({}, { page, limit });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(obj) {
    try {
      const response = await ProductsModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      await ProductsModel.updateOne({ _id: id }, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const response = await ProductsModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductCart(cartId, prodId) {
    try {
      const cart = await CartModel.findById(cartId);

      if (!cart) {
        throw new Error("The cart you are searching for does not exist!");
      }

      const index = cart.products.indexOf(prodId);

      if (index === -1) {
        throw new Error(
          `The product with ID ${prodId} does not exist in the cart!`
        );
      }

      cart.products.splice(index, 1);
      await cart.save();

      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async filtrarPorCategorias(category) { 
    try {
      const response = await ProductsModel.aggregate([ 

        {
          $match: { category: `${category}` }
        }
      ])
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async ordenarPorPrecios() { 
    try {
      const response = await ProductsModel.aggregate([ 

        {
          $sort: { price: 1 }
        }
      ])
      return response;
    } catch (error) {
      console.log(error);
    }
  }

}