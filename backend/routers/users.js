const bcrypt = require("bcrypt");
const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectID = require("../middleware/validateObjectID");
const { uploadToCloud, removeFromCloud } = require("../utils/cloudinary");
const { User, validate } = require("../models/user");
const { Client } = require("../models/client");
const { Guide } = require("../models/guide");
const { Hotel } = require("../models/hotel");
const { Adventure } = require("../models/adventure");
const { Admin } = require("../models/admin");
const { populateReviewsObj } = require("../utils/populateObjects");
const search = require("../routers/search");
const { PAGE, LIMIT, CLIENT, GUIDE, ADMIN } = require("../constants/api");

const DEFAULT_COVER_IMAGE_URL = `http://localhost:3000/images/default-cover.jpg`;

router.get("/", async (req, res) => {
  const users = await User.find().select("-password");
  res.send(users);
});

router.get("/guides", async (req, res) => {
  const page = parseInt(req.query.page) ?? PAGE;
  const limit = parseInt(req.query.limit) ?? LIMIT;
  const startIndex = (page - 1) * limit;
  const guides = await Guide.find()
    .skip(startIndex)
    .limit(limit)
    .populate("userID");
  if (!guides) return res.status(400).send("Guides doesn't exists");
  res.send(guides);
});
router.get("/guide", async (req, res) => {
  const guideID = req.query.guideID;
  const guide = await Guide.findById(guideID).populate("userID");
  if (!guide) {
    return res.status(400).send("Guides doesn't exists");
  }
  res.send(guide);
});
//current user
router.get("/me", validateObjectID, auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    return res.status(404).send("User doesn't exist");
  }
  res.send(user);
});

//set isOnboarding
router.put("/onboarding", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).send("User doesn't exist");
  }
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
  if (!client) {
    return res.status(404).send("User doesn't exist");
  }

  const hotel = await Hotel.findById(req.body.hotelID).populate(
    populateReviewsObj
  );
  if (!hotel) {
    return res.status(404).send("Hotel doesn't exist");
  }

  client.savedHotels = [...client.savedHotels, hotel];

  await client.save();

  res.send(hotel);
});
router.delete("/savedHotel", auth, async (req, res) => {
  const client = await Client.findOne({ userID: req.user._id });
  if (!client) {
    return res.status(404).send("User doesn't exist");
  }

  client.savedHotels = client.savedHotels.filter(
    (item) => item.toString() !== req.body.hotelID
  );

  await client.save();

  res.send(client.savedHotels);
});
router.delete("/savedAdventure", auth, async (req, res) => {
  const client = await Client.findOne({ userID: req.user._id });
  if (!client) {
    return res.status(404).send("User doesn't exist");
  }

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
  if (!client) {
    return res.status(404).send("User doesn't exist");
  }

  const adventure = await Adventure.findById(req.body.adventureID);
  if (!adventure) {
    return res.status(404).send("Adventure doesn't exist");
  }

  client.savedAdventures = [...client.savedAdventures, adventure];

  await client.save();
  res.send(adventure);
});

router.put("/visitedHotel", auth, async (req, res) => {
  const client = await Client.findOne({ userID: req.user._id }).populate(
    "visitedHotels"
  );
  if (!client) {
    return res.status(404).send("User doesn't exist");
  }

  const hotel = await Hotel.findById(req.body.hotelID).populate(
    populateReviewsObj
  );
  if (!hotel) {
    return res.status(404).send("Hotel doesn't exist");
  }

  client.visitedHotels = [...client.visitedHotels, hotel];

  await client.save();

  res.send(hotel);
});
router.delete("/visitedHotel", auth, async (req, res) => {
  const client = await Client.findOne({ userID: req.user._id });
  if (!client) {
    return res.status(404).send("User doesn't exist");
  }

  client.visitedHotels = client.visitedHotels.filter(
    (item) => item.toString() !== req.body.hotelID
  );

  await client.save();

  res.send(client.visitedHotels);
});

router.put("/visitedAdventure", auth, async (req, res) => {
  const client = await Client.findOne({ userID: req.user._id }).populate(
    "visitedAdventures"
  );
  if (!client) {
    return res.status(404).send("User doesn't exist");
  }

  const adventure = await Adventure.findById(req.body.adventureID);
  if (!adventure) {
    return res.status(404).send("Adventure doesn't exist");
  }

  client.visitedAdventures = [...client.visitedAdventures, adventure];

  await client.save();

  res.send(adventure);
});
router.delete("/visitedAdventure", auth, async (req, res) => {
  const client = await Client.findOne({ userID: req.user._id });
  if (!client) {
    return res.status(404).send("User doesn't exist");
  }

  client.visitedAdventures = client.visitedAdventures.filter(
    (item) => item.toString() !== req.body.adventureID
  );

  await client.save();

  res.send(client.visitedAdventures);
});
router.get("/saved", auth, async (req, res) => {
  const client = await Client.findOne({ userID: req.user._id })
    .populate("savedAdventures")
    .populate("savedHotels");
  if (!client) {
    return res.status(404).send("User doesn't exist");
  }
  const savedAdventures = client.savedAdventures;
  const savedHotels = client.savedHotels;

  res.send({ savedAdventures, savedHotels });
});

router.get("/visited", auth, async (req, res) => {
  const client = await Client.findOne({ userID: req.user._id })
    .populate("visitedAdventures")
    .populate("visitedHotels");
  if (!client) {
    return res.status(404).send("User doesn't exist");
  }
  const visitedHotels = client.visitedHotels;
  const visitedAdventures = client.visitedAdventures;

  res.send({ visitedAdventures, visitedHotels });
});
router.put("/profileInfo", auth, async (req, res) => {
  let user = await User.findById(req.body.userID);
  if (!user) {
    return res.status(404).send("User doesn't exist");
  }

  user.username = req.body?.username ?? user.username;
  user.email = req.body?.email ?? user.email;
  await user.save();

  switch (user.role) {
    case CLIENT: {
      user = await Client.findOne({
        userID: user._id,
      });
      if (!user) {
        return res.status(404).send("User isn't a client");
      }
      break;
    }
    case GUIDE: {
      user = await Guide.findOne({
        userID: user._id,
      });
      if (!user) {
        return res.status(404).send("User isn't a guide");
      }
      break;
    }
    default: {
      return res.status(404).send("User doesn't have profile");
    }
  }
  const image = req.body?.image;

  const imageURL = image && (await uploadToCloud(image, "avatars"));
  console.log(req.body?.lastName);
  const birthDate = req.body?.birthDate && new Date(req.body?.birthDate);
  user.profileInfo.firstName =
    req.body?.firstName ?? user.profileInfo?.firstName;
  user.profileInfo.lastName = req.body?.lastName ?? user.profileInfo?.lastName;
  user.profileInfo.phone = req.body?.phone ?? user.profileInfo?.phone;
  user.profileInfo.birthDate = birthDate ?? user.profileInfo?.birthDate;
  user.profileInfo.address = req.body?.address ?? user.profileInfo?.address;
  user.profileInfo.imageURL = imageURL ?? user.profileInfo?.imageURL;
  await user.save();

  await user.populate("userID");
  res.send(user);
});

router.post("/admin", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already exists");
  }

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: ADMIN,
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
  if (user) {
    return res.status(400).send("User already exists");
  }

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: CLIENT,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const client = new Client({
    userID: user._id,
    profileInfo: {},
  });
  await client.save();
  await client.populate("userID");
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(client);
});

router.post("/guide", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already exists");
  }

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: GUIDE,
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
router.delete("/", auth, async (req, res) => {
  let user = await User.findById(req.body.userID);

  if (!user) {
    return res.status(400).send("User doesn't exist");
  }

  switch (user.role) {
    case CLIENT:
      user = await Client.deleteOne({ userID: user._id });
      if (!user) {
        return res.status(400).send("User isn't a client");
      }

      break;
    case GUIDE:
      user = await Guide.deleteOne({ userID: user._id });
      if (!user) {
        return res.status(400).send("User isn't a guide");
      }

      break;
    case ADMIN:
      user = await Admin.deleteOne({ userID: user._id });
      if (!user) {
        return res.status(400).send("User isn't a admin");
      }

      break;
  }
  if (
    user?.profileInfo?.imageURL &&
    user?.profileInfo?.imageURL !== DEFAULT_COVER_IMAGE_URL
  ) {
    await removeFromCloud(user?.profileInfo?.imageURL, "avatars");
  }
  await User.findByIdAndDelete(req.body.userID);

  res.send(user);
});
router.use("/guides", search(Guide).userRouter);
module.exports = router;
