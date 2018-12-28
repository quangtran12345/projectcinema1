var mongoose = require('mongoose');
var schema = mongoose.Schema;
var todoSchema = new schema({
    email: {type : String, unique: true},
    password: {type : String},
})
var userModel = mongoose.model("User", todoSchema);
module.exports = userModel;