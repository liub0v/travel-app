const { Adventure, validate } = require("../models/adventure");
const {
  uploadToCloud,
  removeFromCloud,
  updateCloudImage,
} = require("../utils/cloudinary");
const auth = require("../middleware/auth");
const router = require("express").Router();
const comments = require("../routers/comments");
const DEFAULT_COVER_IMAGE_URL = `http://localhost:3000/images/default-cover.jpg`;

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const startIndex = (page - 1) * limit;
  await Adventure.createIndexes();
  const adventures = await Adventure.find()
    .sort({ _id: 1 })
    .skip(startIndex)
    .limit(limit)
    .populate("rating")
    .populate("reviews")
    .populate({
      path: "reviews",
      populate: {
        path: "rating clientID",
        select:
          "starsNumber generalRating profileInfo.imageURL profileInfo.firstName profileInfo.lastName",
      },
    })
    .populate("guideID");

  res.send(adventures);
});

router.get("/byDestination", async (req, res) => {
  const destination = req.query.destination;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const startIndex = (page - 1) * limit;
  await Adventure.createIndexes();
  const adventures = await Adventure.find({ $text: { $search: destination } })
    .sort({ _id: 1 })
    .skip(startIndex)
    .limit(limit)
    .populate("guideID")
    .populate("rating")
    .populate("reviews")
    .populate({
      path: "reviews",
      populate: {
        path: "rating clientID",
        select:
          "starsNumber generalRating profileInfo.imageURL profileInfo.firstName profileInfo.lastName",
      },
    });
  res.send(adventures);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const image = req.body.image;
  const imageURL = image
    ? await uploadToCloud(req.body.image, "adventures")
    : DEFAULT_COVER_IMAGE_URL;

  const adventure = new Adventure({
    name: req.body.name,
    guideID: req.body?.guideID,
    imageURL: imageURL,
    summary: req.body?.summary,
    price: req.body?.price,
    address: req.body?.address,
  });
  await adventure.save();
  await adventure.populate("guideID");
  res.send(adventure);
});

router.put("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const adventure = await Adventure.findById(req.body.adventureID);
  if (!adventure) return res.status(404).send("Adventures doesn't exist");

  const newImage = req.body.image;
  let imageURL;
  if (newImage) {
    if (adventure.imageURL === DEFAULT_COVER_IMAGE_URL) {
      imageURL = await uploadToCloud(newImage, "adventures");
    } else {
      imageURL = await updateCloudImage(
        adventure.imageURL,
        newImage,
        "destinations"
      );
    }
  }
  adventure.imageURL = imageURL ?? adventure.imageURL;
  adventure.guideID = req.body?.guideID ?? adventure.guideID;
  adventure.name = req.body?.name ?? adventure.name;
  adventure.summary = req.body?.summary ?? adventure.summary;
  adventure.price = req.body?.price ?? adventure.price;
  adventure.address = req.body?.address ?? adventure.address;

  await adventure.save();
  await adventure.populate("guideID");
  await adventure.populate("rating");
  await adventure.populate("reviews");
  await adventure.populate({
    path: "reviews",
    populate: {
      path: "rating clientID",
      select:
        "starsNumber generalRating profileInfo.imageURL profileInfo.firstName profileInfo.lastName",
    },
  });

  res.send(adventure);
});
router.delete("/", async (req, res) => {
  const adventure = await Adventure.findByIdAndDelete(req.body.adventureID);
  if (!adventure) return res.status(404).send("Adventures doesn't exist");

  if (adventure.imageURL !== DEFAULT_COVER_IMAGE_URL) {
    await removeFromCloud(adventure.imageURL, "adventures");
  }

  res.send(adventure);
});
router.use("/", comments(Adventure));

module.exports = router;
