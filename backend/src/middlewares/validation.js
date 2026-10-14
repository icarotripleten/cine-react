const { celebrate, Joi, Segments } = require("celebrate");

const validarCadastro = celebrate({
  [Segments.BODY]: Joi.object().keys({
    nome: Joi.string().min(2).max(40),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const validarLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validarFilme = celebrate({
  [Segments.BODY]: Joi.object().keys({
    titulo: Joi.string().required().min(1).max(200),
    ano: Joi.number().required().min(1888).max(2100),
    genero: Joi.string().allow("").optional(),
    nota: Joi.number().min(0).max(10).optional(),
    poster: Joi.string().uri().allow(null, "").optional(),
    resumo: Joi.string().allow("").optional(),
  }),
});

const validarId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

module.exports = { validarCadastro, validarLogin, validarFilme, validarId };
