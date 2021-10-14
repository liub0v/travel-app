const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const adventureSchema = new mongoose.Schema({
  guideID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guide",
  },
});
const Adventure = mongoose.model("Adventure", adventureSchema);

exports.Adventure = Adventure;
