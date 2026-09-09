const movieService = require('./../services/movie')

async function getMovies(req, res) {
    try {
        const movies = await movieService.getMovies();

        return res.status(200).send(movies);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

async function createMovie(req, res) {
    try {
        const movie = await movieService.createMovie(req.body);

        res.status(201).send(movie);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).send({ message: error.message });
        }

        return res.status(500).send({ message: error.message });
    }
}

async function deleteMovie(req, res) {
    try {
        await movieService.deleteMovieById(req.params.id);

        res.status(201).send({ message: 'Filme deletado com sucesso' });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

async function updateMovie(req, res) {
    try {
        const updatedMovie = await movieService.updateMovieById(req.params.id, req.body);

        res.status(200).send(updatedMovie);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}
module.exports = { getMovies, createMovie, deleteMovie, updateMovie }