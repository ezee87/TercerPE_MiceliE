import { Router } from "express";
import ProductController from "../controllers/products.controllers.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const controller = new ProductController();

const router = Router();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.get("/dto/:id", controller.getProdById);

/* router.get("/filtrar", controller.filtrarPorCategorias);

router.get("/ordenar", controller.ordenarPorPrecios); */

router.post("/", isAdmin, controller.create);

router.post("/dto", controller.createProd);

router.post("/:id/add/:prodId", controller.addProductToCartCtr);

/* router.delete("/:id/del/:prodId", controller.delProductCartController); */

router.put("/:id", isAdmin, controller.update);

router.delete("/:id", isAdmin, controller.delete);


export default router;