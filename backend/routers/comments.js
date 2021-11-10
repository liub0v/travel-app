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
  // router.ws("/comments", async (ws, req) => {
  //   ws.url = req.originalUrl;
  //
  //   ws.on("message", (message) => {
  //     ws.broadcast(message);
  //   });
  //
  //   ws.broadcast = (data) => {
  //     wsInstance.getWss(req.originalUrl).clients.forEach((client) => {
  //       if (client.url === req.originalUrl) client.send(data);
  //     });
  //   };
  // });
  router.get("/comments", (req, res) => {
    res.send({ success: true });
    // const io = req.app.get("socketio");
    // io.on("connection", (socket) => {
    //   console.log("a user connected :D");
    //   socket.on("chat message", (msg) => {
    //     console.log(msg);
    //     io.emit("chat message", msg);
    //   });
    // });
    //
    // res.send({ success: true });
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

    io.emit("comment", { review, adventureID: req.body.adventureID });
    res.send({ review, adventureID: req.body.adventureID });
  });

  return router;
};
