import CartDaoMongoDB from "../daos/mongodb/carts.dao.js";
const cartDao = new CartDaoMongoDB();
import fs from "fs";
import { __dirname } from "../path.js";

export const getCartByIdService = async (id) => {
  try {
    const item = await cartDao.getCartById(id);
    if (!item) throw new Error("Cart not found!");
    else return item;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCartsService = async () => {
  try {
    const item = await cartDao.getAllCarts();
    if (!item) throw new Error("Cart not found!");
    else return item;
  } catch (error) {
    console.log(error);
  }
};

export const createCartService = async (obj) => {
  try {
    const newCart = await cartDao.createCart(obj);
    if (!newCart) throw new Error("Validation Error!");
    else return newCart;
  } catch (error) {
    console.log(error);
  }
};

export const updateCartService = async (id, obj) => {
  try {
    let item = await cartDao.getCartById(id);
    if (!item) {
      throw new Error("Cart not found!");
    } else {
      const cartUpdated = await cartDao.updateCart(id, obj);
      return cartUpdated;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartService = async (id) => {
  try {
    const cartDeleted = await cartDao.deleteCart(id);
    return cartDeleted;
  } catch (error) {
    console.log(error);
  }
};