var mongoose = require('mongoose')
var User = mongoose.model('User')
var secretCode = require('../properties')
var jwt = require('jsonwebtoken')

async function createUser(data) {
    let user = new User(data)
    user = await user.save()
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
        return 200;
    }
}

async function userProfile(token) {

    var email = jwt.verify(token, secretCode.constant.secretCode)
    const user = await User.findOne({ email: email.email })
    return { user: user }
}

async function userUpdate(req) {
    try {
        var id = await jwt.verify(req.body.token, secretCode.constant.secretCode).id
        var user = {
            'name': req.body.userName,
            "birthday": req.body.birthday,
            "description": req.body.description,
            "image": req.files.image.name
        }
        const response = await User.findByIdAndUpdate(id, {
            $set: user.forEach(async element => {
                throw new Throw("sample ")
            })
        })
    } catch (err) {
        console.log(err.message);
    }
    return { user: user }
}
module.exports = {
    createUser: createUser,
    userLogin: userLogin,
    userLogout: userLogout,
    userProfile: userProfile,
    userUpdate: userUpdate,
}