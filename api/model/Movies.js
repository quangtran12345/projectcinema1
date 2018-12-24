var mongoose = require('mongoose');
var schema = mongoose.Schema;
var todoSchema = new schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    date: {type: String, default: Date.now()},
    content: {type: String},
    image: {type: String, default: 'Movie.jpg'},
}) 

var moviesModel = mongoose.model("User", todoSchema);
module.exports = moviesModel;