const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { UnauthorizedError, NotFoundError } = require("../errors");

const { JWT_SECRET = "dev-secret-cinereact" } = process.env;

async function cadastrar({ nome, email, password, role }) {
  const hash = await bcrypt.hash(password, 10);
  return User.create({ nome, email, password: hash, role });
}

async function autenticar({ email, password }) {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthorizedError("Email ou senha incorretos");
  }

  const senhaOk = await bcrypt.compare(password, user.password);
  if (!senhaOk) {
    throw new UnauthorizedError("Email ou senha incorretos");
  }

  return jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

async function buscarPorId(id) {
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError("Usuario nao encontrado");
  }
  return user;
}

async function listarFavoritos(userId) {
  const user = await User.findById(userId).populate("favorites");
  return user.favorites;
}

async function adicionarFavorito(userId, movieId) {
  const user = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { favorites: movieId } },
    { new: true }
  ).populate("favorites");
  return user.favorites;
}

async function removerFavorito(userId, movieId) {
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { favorites: movieId } },
    { new: true }
  ).populate("favorites");
  return user.favorites;
}

module.exports = {
  cadastrar,
  autenticar,
  buscarPorId,
  listarFavoritos,
  adicionarFavorito,
  removerFavorito,
};
