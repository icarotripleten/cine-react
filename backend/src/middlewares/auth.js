const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors");
const { extrairToken } = require('./../utils/extrairToken');

const { JWT_SECRET = "dev-secret-cinereact" } = process.env;

module.exports = (req, res, next) => {
  const token = extrairToken(req.headers.authorization);

  if (!token) {
    return next(new UnauthorizedError("Token nao enviado"));
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return next(new UnauthorizedError("Token invalido"));
  }

  req.user = payload;
  console.log('req.user', req.user)
  return next();
};
