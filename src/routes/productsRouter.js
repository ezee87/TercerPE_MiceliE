import { Router } from "express";
import * as controller from '../controllers/products.controllers.js';

const router = Router();

router.get("/", controller.getAllProductsCtr);
router.get("/filtrar", controller.filtrarPorCategorias);
router.get("/ordenar", controller.ordenarPorPrecios);
router.get("/:id", controller.getByIdProduct);
router.post("/", controller.createProductCtr);
router.post("/:cartId/add/:prodId", controller.addProductToCartCtr);
router.delete("/:cartId/del/:prodId", controller.delProductCartController);
router.delete("/:prodId", controller.deleteProductCtr);
router.put("/:prodId", controller.updateProductCtr);

export default router;