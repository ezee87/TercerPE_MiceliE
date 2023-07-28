import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
const { productManager } = factory;
import ProductRepository from "../persistence/daos/repository/products.repository.js";
import CartRepository from "../persistence/daos/repository/carts.repository.js";

const prodRepository = new ProductRepository();
const cartRepository = new CartRepository();

export default class ProductService extends Services {
  constructor() {
    super(productManager);
  }

  getProdById = async (id) => {
    try {
      const item = await prodRepository.getProdById(id);
      if (!item) return false;
      else return item;
    } catch (error) {
      console.log(error);
    }
  };

  createProd = async (obj) => {
    try {
      const newItem = await prodRepository.createProd(obj);
      if (!newItem) return false;
      else return newItem;
    } catch (error) {
      console.log(error);
    }
  };
}

export const addProductToCartService = async (cartId, prodId) => {
  try {
    const exists = await prodRepository.getProdById(prodId);
    const newProduct = await cartRepository.addProductToCart(cartId, prodId);
    if (!exists) throw new Error("Product not found!");
    else return newProduct;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProductsService = async (page, limit) => {
  try {
    const item = await productsDao.getAllProducts(page, limit);
    if (!item) throw new Error("Cart not found!");
    else return item;
  } catch (error) {
    console.log(error);
  }
};

export const updateProductService = async (prodId, obj) => {
  try {
    let item = await productsDao.getProductById(prodId);
    if (!item) {
      throw new Error("Product not found!");
    } else {
      const productUpdated = await productsDao.updateProduct(prodId, obj);
      return productUpdated;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductService = async (prodId) => {
  try {
    const prodDeleted = await productsDao.deleteProduct(prodId);
    return prodDeleted;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductCartService = async (cartId, prodId) => {
  try {
    const doc = await productsDao.deleteProductCart(cartId, prodId);
    return doc;
  } catch (error) {
    console.log(error);
  }
};

export const filtrarPorCategorias = async(category)=>{
  try {
    const aggregation = await productsDao.filtrarPorCategorias(category);
    return aggregation
  } catch (error) {
    console.log(error);
  }
}

export const ordenarPorPrecios = async()=>{
  try {
    const aggregation = await productsDao.ordenarPorPrecios();
    return aggregation
  } catch (error) {
    console.log(error);
  }
}