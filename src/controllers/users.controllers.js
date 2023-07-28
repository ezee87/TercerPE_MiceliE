import UserDao from "../persistence/daos/mongodb/dao/user.dao.js";
import { generateToken } from "../jwt/auth.js";
const userDao = new UserDao();

export const register = async(req, res, next)=>{
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const exist = await userDao.getByEmail(email);
        if(exist) return res.status(400).json({ msg: 'User already exists' });
        const user = {first_name, last_name, email, age, password}
        const newUser = await userDao.createUser(user);
        const token = generateToken(newUser);
        res.json({
            msg: 'Register OK',
            token
        })
    } catch (error) {
        next(error);
    }
};

export const login = async(req, res, next)=>{
    try {
       const { email, password } = req.body;
       const user = await userDao.loginUser({email, password});
       if(!user){
        res.json({msg: 'invalid credentials'});
       }
       const access_token = generateToken(user)
       res
            .header('Authorization', access_token)
            .json({msg: 'Login OK', access_token})
    } catch (error) {
        next(error);
    }
}

export const privateRoute = async(req, res)=>{
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
  }

export const loginFront = async(req, res, next)=>{
    try {
       const { email, password } = req.body;
       const user = await userDao.loginUser({email, password});
       if(!user){
        res.json({msg: 'invalid credentials'});
       }
       const access_token = generateToken(user)
       res
            .cookie('token', access_token,
            { httpOnly: true }
         )
        .json({msg: 'Login OK', access_token})
    } catch (error) {
        next(error);
    }
}

export const registerResponse = (req, res, next)=>{
    try {
        res.json({
            msg: 'Register OK',
            session: req.session    // --> passport.user: id mongo
        })
    } catch (error) {
        next(error);
    }
};

export const loginResponse = async(req, res, next)=>{
    try {
        const user = await userDao.getById(req.session.passport.user);
        const { first_name, last_name, email, age, role } = user;
        res.json({
            msg: 'Login OK',
            session: req.session,
            userData: {
                first_name,
                last_name,
                email,
                age,
                role
            }
        })
    } catch (error) {
        next(error);
    }
}

export const githubResponse = async(req, res, next)=>{
    try {
        const { first_name, last_name, email, role, isGithub } = req.user;
        res.json({
            msg: 'Register/Login Github OK',
            session: req.session,
            userData: {
                first_name,
                last_name,
                email,
                role,
                isGithub
            }
        })
    } catch (error) {
        next(error);
    }
}
