const router = require("express").Router();
const bcrypt = require("bcrypt");
const config = require("config");
const { User } = require("../models/user");
const Joi = require("joi");
const { Guide } = require("../models/guide");
const { Client } = require("../models/client");
if (!config.get("JWT_PRIVATE_KEY")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid email or password");
  }

  const validPassword = bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid email or password");
  }

  const token = user.generateAuthToken();
  let userRole = null;
  switch (user.role) {
    case "client":
      userRole = await Client.findOne({ userID: user._id });
      if (!userRole) return res.status(400).send("User isn't a client");

      break;
    case "guide":
      userRole = await Guide.findOne({ userID: user._id });
      if (!userRole) return res.status(400).send("User isn't a guide");
      break;
    case "admin":
      break;
  }

  res.header("x-auth-token", token).send({ ...user._doc, ...userRole._doc });
});
function validate(req) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(128).required(),
  });
  return schema.validate(req);
}
module.exports = router;
