var mongoose = require('mongoose');
var User = mongoose.model('User');

async function createUser(data) {
    let user = new User(data);
    user = await user.save();
    return { user: user }
}

async function userLogin(data) {
    const userInfor = await User.findOne({ email: data.email })
    if (!userInfor) {
        throw new Error({})
    }
    return { userInfor: userInfor }
}
module.exports = {
    createUser: createUser,
    userLogin: userLogin,
}