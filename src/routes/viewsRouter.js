import { Router } from 'express';
import { getAllProductsCtr } from "../controllers/products.controllers.js";
import UserDao from '../persistence/daos/mongodb/dao/user.dao.js'
const userDao = new UserDao()

const router = Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/local', (req, res) => {
  res.render('local');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/error-register', (req, res) => {
  res.render('errorRegister');
});

router.get('/error-login', (req, res) => {
  res.render('errorLogin');
});

router.get("/profile", async (req, res, next) => {
  try {
    const products = await getAllProductsCtr(req, res, next); // Obtener los productos

    res.render('profile', { products }); // Pasar directamente el array de productos
    console.log(products)
  } catch (error) {
    console.log(error);
    res.status(500).send('Error hola');
  }
});

router.get('/jwt', (req, res) => {
  res.render('jwt')
});

export default router;
