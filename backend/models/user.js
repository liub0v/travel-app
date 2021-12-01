const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 2,
    maxlength: 16,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isOnBoarding: {
    type: Boolean,
    default: true,
  },
  role: String,
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      role: this.role,
    },
    config.get("JWT_PRIVATE_KEY")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(2).max(16).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(128).required(),
    isOnBoarding: Joi.boolean(),
    role: Joi.string(),
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
