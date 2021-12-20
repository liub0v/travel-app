const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  starsNumber: {
    type: Number,
    min: 0,
    max: 5,
  },
  generalRating: {
    type: Number,
    min: 0,
    max: 10,
  },
  interestingRating: {
    type: Number,
    min: 0,
    max: 10,
  },
  guideRating: {
    type: Number,
    min: 0,
    max: 10,
  },
  serviceRating: {
    type: Number,
    min: 0,
    max: 10,
  },
  priceRating: {
    type: Number,
    min: 0,
    max: 10,
  },
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports.Rating = Rating;
module.exports.ratingSchema = ratingSchema;
