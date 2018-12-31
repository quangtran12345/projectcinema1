var secretCode = require('../properties')
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var secretCode = require("../properties");
async function authorizationUser(token) {
    var token = token
    var decoded = await jwt.verify(token, secretCode.constant.secretCode);
    var email = decoded.email
    // if(user) {
    //     var token =  jwt.sign({email : user.email, name : user.name, image : user.image,
    //         description : user.description, birthday : user.birthday}, secretCode.constant.secretCode);
    //     req.session.token = token
    // } else {
    //     throw new Error ("User not existed");
    // }
    return { email: email,
        decoded: decoded
    }
}

module.exports = {
    authorizationUser: authorizationUser,
}