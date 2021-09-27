const bcrypt = require("bcrypt");
const router = require("express").Router();
const auth = require("../middleware/auth");
const { User, validate } = require("../models/user");
router.get("/", async (req, res) => {
  const users = await User.find().select("-password");
  res.send(users);
});
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("User already exist");

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  res.header("x-auth-token", token).send({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
});
module.exports = router;
