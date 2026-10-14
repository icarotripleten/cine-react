const { ForbiddenError } = require("../errors");

module.exports = (roleNecessario) => (req, res, next) => {
  if (!req.user || req.user.role !== roleNecessario) {
    return next(new ForbiddenError("Voce nao tem permissao para esta acao"));
  }
  return next();
};
