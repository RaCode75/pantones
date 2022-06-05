
const bcrypt = require('bcryptjs');
//const { buildSanitizeFunction } = require('express-validator');

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);
    return passHash;
};

helpers.login = async (password, savePassword) => {
    try{
        return await bcrypt.compare(password, savePassword);
    } catch(err){
        console.log(err);
    }
}


module.exports = helpers;