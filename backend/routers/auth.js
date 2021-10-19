const router = require("express").Router();
const bcrypt = require("bcrypt");
const config = require("config");
const { User } = require("../models/user");
const Joi = require("joi");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send("Invalid email or password");
  }

  const validPassword = bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid email or password");
  }

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    username: user.username,
    email: user.email,
    isOnBoarding: user.isOnBoarding,
  });
  // res.send(token);
});
function validate(req) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(128).required(),
  });
  return schema.validate(req);
}
module.exports = router;
