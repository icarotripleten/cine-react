const Movie = require("../models/movie");
const { NotFoundError } = require("../errors");

async function listar() {
  return Movie.find({});
}

async function buscarPorId(id) {
  const movie = await Movie.findById(id);
  if (!movie) {
    throw new NotFoundError("Filme nao encontrado");
  }
  return movie;
}

async function criar(dados) {
  return Movie.create(dados);
}

async function atualizar(id, dados) {
  const movie = await Movie.findByIdAndUpdate(id, dados, {
    new: true,
    runValidators: true,
  });
  if (!movie) {
    throw new NotFoundError("Filme nao encontrado");
  }
  return movie;
}

async function remover(id) {
  const movie = await Movie.findByIdAndDelete(id);
  if (!movie) {
    throw new NotFoundError("Filme nao encontrado");
  }
  return movie;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
