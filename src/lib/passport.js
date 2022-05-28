const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');



passport.use('local.register', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'pass',
    permisionField: 'permisos',
    passReqToCallback: true
}, async (req, usuario, pass, permisos, done)=>{
    const newUser = {
        usuario,
        pass,
        permisos
    };
    newUser.pass = await helpers.encryptPassword(pass);

    const result = await pool.query('INSERT INTO users SET ?', [newUser]);

}));