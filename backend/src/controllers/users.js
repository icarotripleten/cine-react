const usersService = require("../services/users");

async function createUser(req, res, next) {
  try {
    res.status(201).send(await usersService.cadastrar(req.body));
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const token = await usersService.autenticar(req.body);
    res.status(200).send({ token });
  } catch (err) {
    next(err);
  }
}

async function getCurrentUser(req, res, next) {
  try {
    res.status(200).send(await usersService.buscarPorId(req.user._id));
  } catch (err) {
    next(err);
  }
}

async function getFavorites(req, res, next) {
  try {
    res.status(200).send(await usersService.listarFavoritos(req.user._id));
  } catch (err) {
    next(err);
  }
}

async function addFavorite(req, res, next) {
  try {
    res
      .status(200)
      .send(await usersService.adicionarFavorito(req.user._id, req.params.movieId));
  } catch (err) {
    next(err);
  }
}

async function removeFavorite(req, res, next) {
  try {
    res
      .status(200)
      .send(await usersService.removerFavorito(req.user._id, req.params.movieId));
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  login,
  getCurrentUser,
  getFavorites,
  addFavorite,
  removeFavorite,
};
