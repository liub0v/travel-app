const mongoose = require("mongoose");
const Joi = require("joi");

const hotelSchema = new mongoose.Schema({
  name: String,
  imageURL: String,
  summary: String,
  price: Number,
  address: String,
  hotelOptions: String,
  beds: Number,
  gallery: {
    type: [String],
    default: [],
  },
  starsNumber: Number,
  reviews: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    default: [],
  },
  rating: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rating",
  },
});

hotelSchema.index({ address: "text" });
const Hotel = mongoose.model("Hotel", hotelSchema);

function validateHotel(hotel) {
  const schema = Joi.object({
    name: Joi.string(),
    imageURL: Joi.string(),
    image: Joi.object().optional(),
    price: Joi.number(),
    address: Joi.string(),
    reviews: Joi.array(),
    summary: Joi.string(),
    hotelOptions: Joi.string(),
    beds: Joi.number(),
    gallery: Joi.string(),
    starsNumber: Joi.string(),
    hotelID: Joi.string(),
  });
  return schema.validate(hotel);
}
module.exports.validate = validateHotel;
module.exports.Hotel = Hotel;
module.exports.hotelSchema = hotelSchema;
