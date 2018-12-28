var mongoose = require('mongoose');
var Movie = mongoose.model('Movies');

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

module.exports = {
    createMovie : createMovie,
    getFilm : getFilm,
    getDetail : getDetail
}