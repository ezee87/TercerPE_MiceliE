import ProductsDaoMongoDB from "../daos/mongodb/products.dao.js";
const productsDao = new ProductsDaoMongoDB();

export const addProductToCartService = async (cartId, prodId) => {
  try {
    const exists = await productsDao.getProductById(prodId);
    const newProduct = await productsDao.addProductToCart(cartId, prodId);
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

export const getByIdProduct = async (id) => {
  try {
    const item = await productsDao.getProductById(id);
    if (!item) throw new Error("Pet not found!");
    else return item;
  } catch (error) {
    console.log(error);
  }
};

export const createProductService = async (obj) => {
  try {
    const newProduct = await productsDao.createProduct(obj);
    if (!newProduct) throw new Error("Validation Error!");
    else return newProduct;
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