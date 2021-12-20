const express = require("express");
const auth = require("../middleware/auth");
const { Adventure } = require("../models/adventure");
const { _ } = require("lodash");
const { Rating } = require("../models/rating");
const { Client } = require("../models/client");
const { Review } = require("../models/review");
const { calculateAverageRating } = require("../utils/averageRating");
module.exports = (Model) => {
  const router = express.Router();

  router.post("/comment", auth, async (req, res) => {
    const io = req.app.get("socketio");

    const hotel = await Model.findById(req.body.hotelID)
      .populate("reviews")
      .populate("rating")
      .populate({
        path: "reviews",
        populate: {
          path: "clientID",
          select:
            "profileInfo.imageURL profileInfo.firstName profileInfo.lastName",
        },
      });
    if (!hotel) {
      return res.status(404).send("Hotel doesn't exist");
    }

    const rating = new Rating({
      starsNumber: req.body.starsNumber,
    });

    await rating.save();

    const client = await Client.findOne({ userID: req.user._id }).select(
      "profileInfo.imageURL profileInfo.firstName profileInfo.lastName"
    );
    if (!client) {
      return res.status(404).send("Client doesn't exist");
    }

    const review = new Review({
      clientID: client,
      comment: req.body.comment,
      rating: rating,
    });
    await review.save();

    const count = hotel.reviews.length;

    const generalRating = new Rating({
      starsNumber: _.round(
        calculateAverageRating(
          hotel.rating?.starsNumber ?? 0,
          count,
          Number(req.body.starsNumber)
        )
      ),
      generalRating: calculateAverageRating(
        hotel.rating?.starsNumber ?? 0,
        count,
        Number(req.body.starsNumber)
      ),
    });

    await generalRating.save();
    hotel.reviews.push(review);
    hotel.rating = generalRating;
    await hotel.save();

    io.emit("comment", {
      review,
      hotelID: req.body.hotelID,
      rating: generalRating,
    });
    res.send({ review, hotelID: req.body.hotelID, rating: generalRating });
  });

  router.post("/review", auth, async (req, res) => {
    const io = req.app.get("socketio");
    const adventure = await Model.findById(req.body.adventureID)
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
    if (!adventure) {
      return res.status(404).send("Adventures doesn't exist");
    }

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
    if (!client) {
      return res.status(404).send("Client doesn't exist");
    }

    const review = new Review({
      clientID: client,
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

    io.emit("review", { review, adventureID: req.body.adventureID });
    res.send({ review, adventureID: req.body.adventureID });
  });

  return router;
};
