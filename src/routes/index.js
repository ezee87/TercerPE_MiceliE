import { Router } from 'express';
const router = Router();

import productsRouter from './productsRouter.js';
import usersRouter from './users.router.js';
import cartsRouter from './cartRouter.js';
import viewsRouter from './viewsRouter.js';

router.use('/', viewsRouter);
router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/carts', cartsRouter);

export default router;