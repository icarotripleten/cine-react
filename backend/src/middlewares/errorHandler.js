module.exports = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (err.name === "ValidationError") {
    statusCode = 400; // dados invalidos
    message = err.message;
  } else if (err.name === "CastError") {
    statusCode = 400; // id em formato invalido
    message = "Identificador invalido";
  } else if (err.code === 11000) {
    statusCode = 409; // chave duplicada (ex.: email ja cadastrado)
    message = "Ja existe um registro com esse valor unico";
  }

  // Em 500 nao vazamos detalhes internos para o cliente.
  if (statusCode === 500) {
    message = "Ocorreu um erro no servidor";
  }

  res.status(statusCode).send({ message });
};
