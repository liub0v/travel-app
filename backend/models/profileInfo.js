const mongoose = require("mongoose");
const profileInfoSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 16,
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 16,
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
