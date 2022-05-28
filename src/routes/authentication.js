const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/register', (req, res)=>{
    res.render('auth/register');
});

router.post('/register',  passport.authenticate('local.register', {
        successRedirect: '/profile',
        failureRedirect: '/register',
        failureFlash: true

}));

router.get('/profile', (req, res) =>{
    res.send('this id you profile');
});

router.get('/login', (req, res)=>{
    res.render('auth/login');
});

router.post('/login',  passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true

}));

router.get('/profile', (req, res) =>{
    res.send('this id you profile');
});

module.exports = router;