const mongoose = require("mongoose");

const { profileInfoSchema } = require("./schemas/profileInfo");

const clientSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isOnboarding: Boolean,
  profileInfo: profileInfoSchema,
});
const Client = mongoose.model("Client", clientSchema);

exports.Client = Client;
