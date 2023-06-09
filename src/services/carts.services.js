import CartsDaoMongoDB from "../daos/mongodb/carts.dao.js";
const cartDao = new CartsDaoMongoDB();

export const getAllService = async () => {
  try {
    const docs = await cartDao.getAllCarts();
    return docs;
  } catch (error) {
    console.log(error);
  }
};

export const getByIdService = async (id) => {
  try {
    const doc = await cartDao.getCartById(id);
    if (!doc) throw new Error("Cart not found");
    else return doc;
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (obj) => {
  try {
    const newCart = await cartDao.createCart(obj);
    if (!newCart) throw new Error("Validation Error!");
    else return newCart;
  } catch (error) {
    console.log(error);
  }
};

export const updateService = async (id, obj) => {
  try {
    const doc = await cartDao.getCartById(id);
    if (!doc) {
      throw new Error("Cart not found");
    } else {
      const cartUpd = await cartDao.updateCart(id, obj);
      return cartUpd;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteService = async (id) => {
  try {
    const cartDel = await cartDao.deleteCart(id);
    return cartDel;
  } catch (error) {
    console.log(error);
  }
};