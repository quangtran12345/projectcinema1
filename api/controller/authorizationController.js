var secretCode = require('../model/AuthorizationModel')
var jwt  = require('jsonwebtoken');
async function authorizationUser(req, res, next) {
    var email
    if (req.session.token != undefined) {
        var token = req.session.token
        var decoded = jwt.verify(token, secretCode.secretCode.secret);
        email = await decoded.email
        
    } else {
        email = ''
    }
    return {email : email}
}

module.exports = {
    authorizationUser : authorizationUser,
}