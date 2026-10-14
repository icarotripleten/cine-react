const winston = require("winston");
const expressWinston = require("express-winston");

const silencioso = process.env.NODE_ENV === "test";

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "request.log" })],
  format: winston.format.json(),
  silent: silencioso,
});

const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: "error.log" })],
  format: winston.format.json(),
  silent: silencioso,
});

module.exports = { requestLogger, errorLogger };
