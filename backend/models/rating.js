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
