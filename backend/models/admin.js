const mongoose = require("mongoose");
const { profileInfoSchema } = require("./profileInfo");

const adminSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  profileInfo: profileInfoSchema,
});
const Admin = mongoose.model("Admin", adminSchema);

exports.Admin = Admin;
