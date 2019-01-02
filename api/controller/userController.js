var mongoose = require('mongoose')
var User = mongoose.model('User')
var secretCode = require('../properties')
var jwt = require('jsonwebtoken')

async function createUser(data, session) {
    let user = new User(data)
    user = await user.save()
    var token = jwt.sign({
        id: user.id,
        email: user.email,
    }, secretCode.constant.secretCode);
    session.token = token
    return { user: user }
}

async function userLogin(req, data) {
    const user = await User.findOne({ email: data.email, password: data.password })
    if (!user) {
        throw new Error("Email or password is not existed !")
    } else {
        var token = jwt.sign({
            id: user.id,
            email: user.email, name: user.name, image: user.image,
            description: user.description, birthday: user.birthday
        }, secretCode.constant.secretCode);
        req.session.token = token
    }
    return { token: token }
}



function userLogout(req) {
    if (req.session.token) {
        req.session.token = undefined
    } else {
        throw new Exception("You aren't sign in !")
    }
    return { message: "success" };
}

async function userProfile(req) {
    var response = {}
    var decoded = jwt.verify(req.params.token, secretCode.constant.secretCode)
    response = await User.findOne({ email: decoded.email })
    if (!response) {
        throw new Error("User not login.")
    }
    return { response: response }
}

async function userUpdate(req, fileName) {
    var decoded = jwt.verify(req.body.token, secretCode.constant.secretCode)
    var id = decoded.id
    const user = await User.findById(id)
    if (!user) {
        throw new Error("User isn't exist!")
    }
    user.name = req.body.name || user.name
    user.birthday = req.body.birthday || user.birthday
    user.description = req.body.description || user.description
    user.image = fileName || user.image
    await user.save()
}

async function changePassword(token, oldPassword, newPassword,sessionToken) {
    if(!token) {
        throw new Exception("Please Login!")
    }
    if(!sessionToken) {
        throw new Exception("Please Login!")
    }
    if(sessionToken !== token) {
        throw new Exception("Please Login!")
    }
    var decoded = jwt.verify(token, secretCode.constant.secretCode)
    var id = decoded.id
    const user = await User.findById(id)
    if (!user) {
        throw new Error("User isn't exist !")
    }
    if(user.password !== oldPassword) {
        throw new Error("Old password is not correct!")
    } else {
        user.password = newPassword || oldPassword
    }
    await user.save()
    return {message: "change password is success!"}
}
module.exports = {
    createUser: createUser,
    userLogin: userLogin,
    userLogout: userLogout,
    userProfile: userProfile,
    userUpdate: userUpdate,
    changePassword: changePassword
}