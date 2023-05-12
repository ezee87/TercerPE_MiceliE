import { Router } from "express";
import ProductManager from "../managers/productsManager.js";
import { __dirname } from '../path.js';

const productManager = new ProductManager(__dirname + "/fs/products.json");
const router = Router();

router.get("/index", async (req, res) => {
    const products = await productManager.getAllProducts();
    console.log(products)
    res.render("index", { products: products });
  });

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

export default router;