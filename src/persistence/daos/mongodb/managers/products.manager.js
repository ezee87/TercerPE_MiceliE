import MongoDao from "../dao/mongo.dao.js";
import { ProductsModel } from "../models/products.model.js";

export default class ProductManagerMongo extends MongoDao {
  constructor() {
    super(ProductsModel);
  }
}