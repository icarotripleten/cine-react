const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors");

const { JWT_SECRET = "dev-secret-cinereact" } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Token nao enviado"));
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return next(new UnauthorizedError("Token invalido"));
  }

  req.user = payload;
  return next();
};
