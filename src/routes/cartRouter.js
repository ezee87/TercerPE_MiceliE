import { Router } from "express";
import {
  getAllCartsCtr,
  getCartByIdCtr,
  createCartCtr,
  updateCartController,
  deleteCartCtr,
} from "../controllers/carts.controllers.js";

const router = Router();

router.get("/", getAllCartsCtr);
router.get("/:cartId", getCartByIdCtr);
router.post("/", createCartCtr);
router.put("/:cartId", updateCartController);
router.delete("/:cartId", deleteCartCtr);

export default router;