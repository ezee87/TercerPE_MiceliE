import MongoDao from "../dao/mongo.dao.js";
import { CartModel } from "../models/carts.model.js";

export default class CartManagerMongo extends MongoDao {
  constructor() {
    super(CartModel);
  }
}