import { Router } from 'express'
import UserDao from '../daos/mongodb/user.dao.js'
import { checkAuth } from '../jwt/auth.js';
import { registerResponse, loginResponse, loginFront, githubResponse, register, login, privateRoute } from '../controllers/users.controllers.js';
import passport from 'passport';

const userDao = new UserDao()
const router = Router()

router.post("/register", register);

router.post("/login", login);

router.get("/private", checkAuth, privateRoute);

router.post("/loginfront", loginFront);

router.post('/register-local', passport.authenticate('register'), registerResponse);

router.post('/login-local', passport.authenticate('login'), loginResponse);

router.get('/private2', checkAuth, (req, res)=>{
  const { first_name, last_name, email, role } = req.user;
  res.json({
    status: 'success',
    userData: {
      first_name, 
      last_name, 
      email, 
      role
    }
  })
});

router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/profile-github', passport.authenticate('github', { scope: [ 'user:email' ] }), githubResponse);

router.get('/current', passport.authenticate('jwt'),  (req, res) => {
  res.send(req.user);
});

export default router