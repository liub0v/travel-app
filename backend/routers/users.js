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
const { Admin } = require("../models/admin");

const DEFAULT_COVER_IMAGE_URL = `http://localhost:3000/images/default-cover.jpg`;

router.get("/", async (req, res) => {
  const users = await User.find().select("-password");
  res.send(users);
});

router.get("/guides", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const startIndex = (page - 1) * limit;
  const guides = await Guide.find()
    .skip(startIndex)
    .limit(limit)
    .populate("userID");
  if (!guides) return res.status(400).send("Guides doesn't exists");
  res.send(guides);
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
  const client = await Client.findOne({ userID: req.user._id }).populate(
    "savedHotels"
  );
  if (!client) return res.status(404).send("User doesn't exist");

  const hotel = await Hotel.findById(req.body.hotelID);
  if (!hotel) return res.status(404).send("Hotel doesn't exist");

  client.savedHotels = [...client.savedHotels, hotel];

  await client.save();

  res.send(hotel);
});
router.delete("/savedHotel", auth, async (req, res) => {
  const client = await Client.findOne({ userID: req.user._id });
  if (!client) return res.status(404).send("User doesn't exist");

  client.savedHotels = client.savedHotels.filter(
    (item) => item.toString() !== req.body.hotelID
  );

  await client.save();

  res.send(client.savedHotels);
});
router.delete("/savedAdventure", auth, async (req, res) => {
  const client = await Client.findOne({ userID: req.user._id });
  if (!client) return res.status(404).send("User doesn't exist");

  client.savedAdventures = client.savedAdventures.filter(
    (item) => item.toString() !== req.body.adventureID
  );

  await client.save();

  res.send(client.savedAdventures);
});
router.put("/saveAdventure", auth, async (req, res) => {
  const client = await Client.findOne({ userID: req.user._id }).populate(
    "savedAdventures"
  );
  if (!client) return res.status(404).send("User doesn't exist");

  const adventure = await Adventure.findById(req.body.adventureID);
  if (!adventure) return res.status(404).send("Adventure doesn't exist");

  client.savedAdventures = [...client.savedAdventures, adventure];

  await client.save();

  res.send(adventure);
});
router.put("/profileInfo", async (req, res) => {
  // let user = await User.findById(req.user._id);
  let user = await User.findById(req.body.userID);
  // let user = await User.findOne({ email: req.body.email });
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
    default:
      return res.status(404).send("User doesn't have profile");
  }
  const image = req.body?.image;

  const imageURL = image && (await uploadToCloud(image, "avatars"));

  user.profileInfo.firstName =
    req.body?.firstName || user.profileInfo.firstName;
  user.profileInfo.lastName = req.body?.lastName || user.profileInfo.lastName;
  user.profileInfo.phone = req.body?.phone || user.profileInfo.phone;
  user.profileInfo.birthDate =
    req.body?.birthDate || user.profileInfo.birthDate;
  user.profileInfo.address = req.body?.address || user.profileInfo.address;
  user.profileInfo.imageURL = imageURL || user.profileInfo.imageURL;
  await user.save();
  res.send(user.profileInfo);
});
router.post("/admin", async (req, res) => {
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
    role: "admin",
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const admin = new Admin({
    userID: user._id,
  });
  await admin.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    username: user.username,
    email: user.email,
    isOnBoarding: user.isOnBoarding,
    role: user.role,
  });
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
  await guide.populate("userID");
  res.send(guide);
});
router.delete("/", async (req, res) => {
  let user = await User.findById(req.body.userID);
  if (!user) return res.status(400).send("User doesn't exist");

  // switch (user.role) {
  //   case "client":
  //     user = await Client.findOne({ userID: user._id })
  //         .populate("savedHotels")
  //         .populate("savedAdventures")
  //         .populate("userID");
  //     if (!user) return res.status(400).send("User isn't a client");
  //     break;
  //   case "guide":
  //     user = await Guide.findOne({ userID: user._id }).populate("userID");
  //     if (!user) return res.status(400).send("User isn't a guide");
  //     break;
  //   case "admin":
  //     user = await Admin.findOne({ userID: user._id }).populate("userID");
  //     if (!user) return res.status(400).send("User isn't a guide");
  //     break;
  // }
});

module.exports = router;
