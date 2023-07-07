import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UserDao from '../daos/mongodb/user.dao.js';
const userDao = new UserDao();

const strategyOptions = {
    clientID: 'Iv1.acab7373d5f66898',
    clientSecret: 'b66233a6647909be4f7633bebcbab845e7f102c8',
    callbackURL: 'http://localhost:8080/api/users/profile-github'
};

const registerOrLogin = async(accessToken, refreshToken, profile, done) =>{
    console.log('profile:::', profile);
    const email = profile._json.email !== null ? profile._json.email : profile._json.blog;
    const user = await userDao.getByEmail(email);
    if(user) return done(null, user);
    const newUser = await userDao.createUser({
        first_name: profile._json.name.split(' ')[0],
        last_name: profile._json.name.split(' ')[1],
        email,
        password: ' ',
        isGithub: true
    });
    return done(null, newUser);
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));