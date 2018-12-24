var mongoose = require('mongoose');
var schema = mongoose.Schema;
var todoSchema = new schema({
    email: string,
    password: string,
    description: string
});
var userModel = mongoose.model("User", todoSchema);
module.exports = userModel;