import { Router } from "express";
import ProductManager from "../daos/filesystem/products.dao.js";
import { __dirname } from '../path.js';

const productManager = new ProductManager(__dirname + "/daos/filesystem/products.json");
const router = Router();

router.get("/index", async (req, res) => {
    const products = await productManager.getAllProducts();
    console.log(products)
    res.render("index", { products: products });
  });

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

router.get("/", (req, res) => {
  res.render("chat");
});

import {
  getAllController,
  getByIdController,
  createController,
  updateController,
  deleteController,
} from "../controllers/messages.controllers.js";

router.get("/", getAllController);
router.get(":id", getByIdController);
router.post("/", createController);
router.put("/:id", updateController);
router.delete("/:id", deleteController);

export default router;