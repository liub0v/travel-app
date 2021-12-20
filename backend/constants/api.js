const config = require("config");
exports.PAGE = config.get("DEFAULT_PAGE");
exports.LIMIT = config.get("DEFAULT_LIMIT");
exports.ADMIN = "admin";
exports.CLIENT = "client";
exports.GUIDE = "guide";
