const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  comment: {
    type: String,
    minlength: 1,
    maxlength: 256,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports.Review = Review;
