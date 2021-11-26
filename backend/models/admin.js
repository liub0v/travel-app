const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Admin = mongoose.model("Admin", adminSchema);

exports.Admin = Admin;
