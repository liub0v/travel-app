const winston = require("winston");

module.exports = function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Internal server error.";

  winston.error(err.message, err);

  res.status(status).send(message);
};
