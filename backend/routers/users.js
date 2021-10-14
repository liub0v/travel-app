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
  const user = await User.findById(req.user._id);
  if (!user) res.status(404).send("User doesn't exist");
  let userToUpdate = undefined;
  switch (user.role) {
    case "client": {
      userToUpdate = await Client.findOne({
        userID: user._id,
      });
      if (!userToUpdate) res.status(404).send("User isn't a client");
      break;
    }
    case "guide": {
      userToUpdate = await Guide.findOne({
        userID: user._id,
      });
      if (!userToUpdate) res.status(404).send("User isn't a guide");
      break;
    }
  }
  userToUpdate.profileInfo = {
    firstName: req.body?.firstname,
    lastName: req.body?.lastname,
    phone: req.body?.phone,
    birthDate: req.body?.birthDate,
    address: req.body?.address,
    imageURL: req.body?.imageURL,
  };
  await userToUpdate.save();
  res.send({
    firstName: userToUpdate.profileInfo.firstName,
    lastName: userToUpdate.profileInfo.lastName,
    phone: userToUpdate.profileInfo.phone,
    birthDate: userToUpdate.profileInfo.birthDate,
    address: userToUpdate.profileInfo.address,
    imageURL: userToUpdate.profileInfo.imageURL,
  });
});

// sign up
router.post("/", async (req, res) => {
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
module.exports = router;
