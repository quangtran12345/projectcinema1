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

async function editMovie(req, fileName) {
    try {
        const movie = await Movie.findById(req.body.id)
        if(!movie){
            throw new Error("Movie isn't exist !")
        }
        movie.name = req.body.name || movie.name
        movie.genre = req.body.genre || movie.genre
        movie.date = req.body.date || movie.date
        movie.content = req.body.content || movie.content
        movie.image = fileName || movie.image
        
        await movie.save()
    } catch(err) {
        throw err.message
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