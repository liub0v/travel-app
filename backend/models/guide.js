const mongoose = require("mongoose");
const { profileInfoSchema } = require("./profileInfo");

const guideSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  profileInfo: profileInfoSchema,
  description: String,
});
const Guide = mongoose.model("Guide", guideSchema);

exports.Guide = Guide;
