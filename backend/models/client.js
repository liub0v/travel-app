const mongoose = require("mongoose");
const { profileInfoSchema } = require("./profileInfo");

const clientSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isOnboarding: Boolean,
  profileInfo: {
    type: profileInfoSchema,
    default: {},
  },
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
  visitedHotels: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
      },
    ],
    default: [],
  },
  visitedAdventures: {
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
