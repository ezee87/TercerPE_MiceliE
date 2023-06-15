import { Router } from 'express';
import { getAllProductsCtr } from "../controllers/products.controllers.js";
import UserDao from '../daos/mongodb/user.dao.js'
const userDao = new UserDao()

const router = Router();

router.get('/', (req, res) => {
  res.render('login');
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

/* router.get("/profile", async (req, res, next) => {
  try {
    const products = await getAllProductsCtr(req, res, next);
    console.log(products);
    res.render('profile', { products });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error occurred');
  }
}); */

router.get("/profile", async (req, res, next) => {
  try {
    const products = await getAllProductsCtr(req, res, next); // Obtener los productos

    const productsData = {
      length: products.length,
      products: products
    };

    res.render('profile', { products: productsData });// Renderizar la vista "profile" con los productos
    console.log(products)
  } catch (error) {
    console.log(error);
    res.status(500).send('Error occurred');
  }
});


export default router;
