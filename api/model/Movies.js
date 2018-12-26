var mongoose = require('mongoose');
var schema = mongoose.Schema;
var todoSchema = new schema({
    name: {type: String},
    genre: {type: String},
    date: {type: String, default: Date.now()},
    content: {type: String},
    image: {type: String, default: 'http://ste.india.com/sites/default/files/2014/12/17/303980-film-700.jpg'},
}) 

var moviesModel = mongoose.model("Movies", todoSchema);
module.exports = moviesModel; 