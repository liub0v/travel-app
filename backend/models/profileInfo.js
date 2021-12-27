const mongoose = require("mongoose");
const profileInfoSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 0,
    maxlength: 32,
  },
  lastName: {
    type: String,
    minlength: 0,
    maxlength: 32,
  },
  phone: {
    type: String,
    minlength: 7,
    maxlength: 15,
  },
  birthDate: Date,
  address: String,
  imageURL: String,
});

const ProfileInfo = mongoose.model("ProfileInfo", profileInfoSchema);

module.exports.ProfileInfo = ProfileInfo;
module.exports.profileInfoSchema = profileInfoSchema;
