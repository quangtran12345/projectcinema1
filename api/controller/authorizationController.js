var secretCode = require('../properties')
var jwt  = require('jsonwebtoken');
async function authorizationUser(req, res, next) {
    var email
    if (req.session.token) {
        var token = req.session.token
        var decoded = jwt.verify(token, secretCode.constant.secretCode);
        email = decoded.email
    } else {
        email = ''
    }
    return {email : email}
}

module.exports = {
    authorizationUser : authorizationUser,
}