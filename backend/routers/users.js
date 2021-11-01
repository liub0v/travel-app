const bcrypt = require("bcrypt");
const router = require("express").Router();
const auth = require("../middleware/auth");
const validateObjectID = require("../middleware/validateObjectID");
const { uploadToCloud } = require("../utils/cloudinary");
const { User, validate } = require("../models/user");
const { Client } = require("../models/client");
const { Guide } = require("../models/guide");
const { Hotel } = require("../models/hotel");
const { Adventure } = require("../models/adventure");

const DEFAULT_COVER_IMAGE_URL = `http://localhost:3000/images/default-cover.jpg`;

router.get("/", async (req, res) => {
  const users = await User.find().select("-password");
  res.send(users);
});
//current user
router.get("/me", validateObjectID, auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) return res.status(404).send("User doesn't exist");
  res.send(user);
});
//set isOnboarding
router.put("/onboarding", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).send("User doesn't exist");
  user.isOnBoarding = req.body.isOnBoarding; //!user.isOnBoarding
  await user.save();
  res.send({
    isOnBoarding: user.isOnBoarding,
  });
});
//update profile info
router.put("/saveHotel", auth, async (req, res) => {
  const client = await Client.findOne({ userID: req.user._id });
  if (!client) return res.status(404).send("User doesn't exist");

  const hotel = await Hotel.findById(req.body.hotelID);
  if (!hotel) return res.status(404).send("Hotel doesn't exist");

  client.savedHotels = [...client.savedHotels, hotel];

  await client.save();

  res.send({ savedHotels: client.savedHotels });
});
router.put("/saveAdventure", auth, async (req, res) => {
  const client = await Client.findOne({ userID: req.user._id });
  if (!client) return res.status(404).send("User doesn't exist");

  const adventure = await Adventure.findById(req.body.adventureID);
  if (!adventure) return res.status(404).send("Adventure doesn't exist");

  client.savedAdventures = [...client.savedAdventures, adventure];

  await client.save();

  res.send({ savedAdventures: client.savedAdventures });
});
router.put("/profileInfo", async (req, res) => {
  // let user = await User.findById(req.user._id);
  let user = await User.findOne({ email: "c10@mail.com" });
  if (!user) return res.status(404).send("User doesn't exist");

  switch (user.role) {
    case "client": {
      user = await Client.findOne({
        userID: user._id,
      });
      if (!user) return res.status(404).send("User isn't a client");
      break;
    }
    case "guide": {
      user = await Guide.findOne({
        userID: user._id,
      });
      if (!user) return res.status(404).send("User isn't a guide");
      break;
    }
  }
  const image = req.body?.image;

  const imageURL = image && (await uploadToCloud(image, "avatars"));
  user.profileInfo.firstName =
    req.body?.firstname || user.profileInfo.firstName;
  user.profileInfo.lastName = req.body?.lastName || user.profileInfo.lastName;
  user.profileInfo.phone = req.body?.phone || user.profileInfo.phone;
  user.profileInfo.birthDate =
    req.body?.birthDate || user.profileInfo.birthDate;
  user.profileInfo.address = req.body?.address || user.profileInfo.address;
  user.profileInfo.imageURL = imageURL || user.profileInfo.imageURL;
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
