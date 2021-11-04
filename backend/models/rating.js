const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  starsNumber: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  generalRating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  interestingRating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  guideRating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  serviceRating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  priceRating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports.Rating = Rating;
