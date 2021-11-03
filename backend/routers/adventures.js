const { Adventure, validate } = require("../models/adventure");
const {
  uploadToCloud,
  removeFromCloud,
  updateCloudImage,
} = require("../utils/cloudinary");
const { Review } = require("../models/review");
const { Rating } = require("../models/rating");
const router = require("express").Router();
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
    .populate("  ")
    .populate("ratings");
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
    .populate("reviews");
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
    reviews: req.body?.reviews,
  });
  await adventure.save();
  res.send(adventure);
});
router.put("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const adventure = await Adventure.findById(req.body.id);
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
  adventure.imageURL ||= imageURL;
  adventure.guideID ||= req.body?.guideID;
  adventure.name ||= req.body?.name;
  adventure.summary ||= req.body?.summary;
  adventure.price ||= req.body?.price;
  adventure.address ||= req.body?.address;
  adventure.reviews ||= req.body?.reviews;

  await adventure.save();
  res.send(adventure);
});
router.delete("/", async (req, res) => {
  const adventure = await Adventure.findByIdAndDelete(req.body.id);
  if (!adventure) res.status(404).send("Adventures doesn't exist");

  if (adventure.imageURL !== DEFAULT_COVER_IMAGE_URL) {
    await removeFromCloud(adventure.imageURL, "adventures");
  }

  res.send(adventure);
});
router.post("/review", async (req, res) => {
  const review = new Review({
    clientID: req.body.clientID,
    comment: req.body.comment,
  });
  await review.save();

  const adventure = await Adventure.findById(req.body.adventureID);
  adventure.reviews.push(review);
  await adventure.save();

  res.send(review);
});
router.post("/rating", async (req, res) => {
  const rating = new Rating({
    clientID: req.body.clientID,
    starsNumber: req.body.starsNumber,
    interestingRating: req.body.interestingRating,
    guideRating: req.body.guideRating,
    serviceRating: req.body.serviceRating,
    priceRating: req.body.priceRating,
  });
  await rating.save();

  const adventure = await Adventure.findById(req.body.adventureID);
  adventure.ratings.push(rating);
  await adventure.save();

  res.send(rating);
});
module.exports = router;
