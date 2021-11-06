const { Adventure, validate } = require("../models/adventure");
const {
  uploadToCloud,
  removeFromCloud,
  updateCloudImage,
} = require("../utils/cloudinary");
const { Client } = require("../models/client");
const { Review } = require("../models/review");
const { Rating } = require("../models/rating");
const { _ } = require("lodash");
const auth = require("../middleware/auth");
const { calculateAverageRating } = require("../utils/averageRating");
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
  if (!adventure) return res.status(404).send("Adventures doesn't exist");

  if (adventure.imageURL !== DEFAULT_COVER_IMAGE_URL) {
    await removeFromCloud(adventure.imageURL, "adventures");
  }

  res.send(adventure);
});

router.post("/review", auth, async (req, res) => {
  const adventure = await Adventure.findById(req.body.adventureID)
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
  if (!adventure) return res.status(404).send("Adventures doesn't exist");

  const averageRating = _.mean([
    req.body.interestingRating,
    req.body.guideRating,
    req.body.serviceRating,
    req.body.priceRating,
  ]);

  const averageRatingRound = _.round(averageRating);

  const rating = new Rating({
    starsNumber: req.body.starsNumber,
    interestingRating: req.body.interestingRating,
    guideRating: req.body.guideRating,
    serviceRating: req.body.serviceRating,
    priceRating: req.body.priceRating,
    generalRating: averageRatingRound,
  });

  await rating.save();
  const client = await Client.findOne({ userID: req.user._id });
  if (!client) return res.status(404).send("Client doesn't exist");
  const review = new Review({
    clientID: client._id,
    comment: req.body.comment,
    rating: rating,
  });
  await review.save();

  const count = adventure.reviews.length;

  const generalRating = new Rating({
    starsNumber: _.round(
      calculateAverageRating(
        adventure.rating?.starsNumber ?? 0,
        count,
        req.body.starsNumber
      )
    ),
    interestingRating: calculateAverageRating(
      adventure.rating?.interestingRating ?? 0,
      count,
      req.body.interestingRating
    ),
    guideRating: calculateAverageRating(
      adventure.rating?.guideRating ?? 0,
      count,
      req.body.guideRating
    ),
    serviceRating: calculateAverageRating(
      adventure.rating?.serviceRating ?? 0,
      count,
      req.body.serviceRating
    ),
    priceRating: calculateAverageRating(
      adventure.rating?.priceRating ?? 0,
      count,
      req.body.priceRating
    ),
    generalRating: calculateAverageRating(
      adventure.rating?.generalRating ?? 0,
      count,
      averageRatingRound
    ),
  });
  await generalRating.save();

  adventure.reviews.push(review);
  adventure.rating = generalRating;

  await adventure.save();

  res.send(review);
});
module.exports = router;
