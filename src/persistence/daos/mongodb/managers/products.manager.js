import MongoDao from "../dao/mongo.dao.js";
import { ProductModel } from "../models/products.model.js";

export default class ProductManagerMongo extends MongoDao {
  constructor() {
    super(ProductModel);
  }
}