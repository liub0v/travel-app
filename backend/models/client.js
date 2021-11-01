const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const { profileInfoSchema } = require("./schemas/profileInfo");
const { hotelSchema } = require("./hotel");

const clientSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isOnboarding: Boolean,
  profileInfo: profileInfoSchema,
  savedHotels: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
      },
    ],
    default: [],
  },
  savedAdventures: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Adventure",
      },
    ],
    default: [],
  },
});
const Client = mongoose.model("Client", clientSchema);

exports.Client = Client;
