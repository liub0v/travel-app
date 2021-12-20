const { ADMIN } = require("../constants/api");
module.exports = function (req, res, next) {
  if (req.user.role !== ADMIN) return res.status(403).send("Access denied.");
  next();
};
