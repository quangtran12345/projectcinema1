var mongoose = require('mongoose');
var Movie = mongoose.model('Movies');
var secretCode = require('../properties')
var jwt = require('jsonwebtoken')

async function createMovie(data) {
    let movie = new Movie(data);
    movie =  await movie.save();
    return {movie : movie}
}

async function getFilm() {
    const movies = await Movie.find().sort({_id:-1});
    return {movies:movies}
}

async function getDetail(id) {
    const movies = await Movie.findById(id);
    return {movies:movies}
}

async function editMovie(req) {
    const movie = await Movie.findById(req.body.id)
    if(!movie){

    }
    movie.name = req.body.name || movie.name
    // var movie = {
    //     name : req.body.name,
    //     genre: req.body.genre,
    //     date : req.body.date,
    //     content: req.body.content,
    //     image: "/images/" + req.files.image.name , 
    // }
    // var id = req.body.id
    const movies = await Movie.findByIdAndUpdate(id, {$set: movie})
    if(!movies) {
        throw new Error("Update Fail !")
    }
    return {success: "success"}
}

async function deleteMovie(id) {
        const movies = await Movie.findByIdAndDelete(id)
        if(!movies) {
            throw new("Delete Fail")
        }
        return {success: "/"}
}
module.exports = {
    createMovie : createMovie,
    getFilm : getFilm,
    getDetail : getDetail,
    editMovie : editMovie,
    deleteMovie: deleteMovie
}