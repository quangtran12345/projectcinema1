var mongoose = require('mongoose');
var User = require('User');

async function createUser(data) {
    let user = new User(data);
    await user.save();

    return { user: user }
}

async function loadUser() {
    
}