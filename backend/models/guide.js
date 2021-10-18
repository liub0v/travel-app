const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const { profileInfoSchema } = require("./schemas/profileInfo");

const guideSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  profileInfo: profileInfoSchema,
  description: String,
});
const Guide = mongoose.model("Guide", guideSchema);

exports.Guide = Guide;
