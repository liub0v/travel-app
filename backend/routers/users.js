const bcrypt = require("bcrypt");
const router = require("express").Router();
const auth = require("../middleware/auth");
const validateObjectID = require("../middleware/validateObjectID");
const { User, validate } = require("../models/user");
const { Client } = require("../models/client");
const { Guide } = require("../models/guide");

router.get("/", async (req, res) => {
  const users = await User.find().select("-password");
  res.send(users);
});
//current user
router.get("/me", validateObjectID, auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) res.status(404).send("User doesn't exist");
  res.send(user);
});
//set isOnboarding
router.put("/onboarding", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) res.status(404).send("User doesn't exist");
  user.isOnBoarding = req.body.isOnBoarding; //!user.isOnBoarding
  await user.save();
  res.send({
    isOnBoarding: user.isOnBoarding,
  });
});
//update profile info
router.put("/profileInfo", auth, async (req, res) => {
  let user = await User.findById(req.user._id);
  if (!user) res.status(404).send("User doesn't exist");

  switch (user.role) {
    case "client": {
      user = await Client.findOne({
        userID: user._id,
      });
      if (!user) res.status(404).send("User isn't a client");
      break;
    }
    case "guide": {
      user = await Guide.findOne({
        userID: user._id,
      });
      if (!user) res.status(404).send("User isn't a guide");
      break;
    }
  }
  user.profileInfo = {
    firstName: req.body?.firstname,
    lastName: req.body?.lastname,
    phone: req.body?.phone,
    birthDate: req.body?.birthDate,
    address: req.body?.address,
    imageURL: req.body?.imageURL,
  };
  await user.save();
  res.send(user.profileInfo);
});

router.post("/client", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists");

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: "client",
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const client = new Client({
    userID: user._id,
  });
  await client.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    username: user.username,
    email: user.email,
    isOnBoarding: user.isOnBoarding,
    role: user.role,
  });
});
router.post("/guide", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists");

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: "guide",
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const guide = new Guide({
    userID: user._id,
  });
  await guide.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    username: user.username,
    email: user.email,
    isOnBoarding: user.isOnBoarding,
    role: user.role,
  });
});
module.exports = router;
