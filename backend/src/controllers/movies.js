const moviesService = require("../services/movies");

async function getMovies(req, res, next) {
  try {
    res.status(200).send(await moviesService.listar());
  } catch (err) {
    next(err);
  }
}

async function buscarEstatisticas(req, res, next) {
  try {
    res.status(200).send(await moviesService.buscarEstatisticas());
  } catch (err) {
    next(err);
  }
}

async function getMovieById(req, res, next) {
  try {
    res.status(200).send(await moviesService.buscarPorId(req.params.id));
  } catch (err) {
    next(err);
  }
}

async function createMovie(req, res, next) {
  try {
    res.status(201).send(await moviesService.criar(req.body));
  } catch (err) {
    next(err);
  }
}

async function updateMovie(req, res, next) {
  try {
    res.status(200).send(await moviesService.atualizar(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
}

async function deleteMovie(req, res, next) {
  try {
    await moviesService.remover(req.params.id);
    res.status(200).send({ message: "Filme removido" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  buscarEstatisticas
};
