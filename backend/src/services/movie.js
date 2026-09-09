const Movie = require('../models/movie');

async function getMovies() {
    return Movie.find({});
}

async function createMovie(movieData) {
    return Movie.create(movieData);
}

async function deleteMovieById(id) {
    return Movie.findByIdAndDelete(id);
}

async function updateMovieById(id, movieData) {
    return Movie.findByIdAndUpdate(id, movieData, { new: true });
}

module.exports = { getMovies, createMovie, deleteMovieById, updateMovieById };