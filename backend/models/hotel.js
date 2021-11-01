const mongoose = require("mongoose");
const Joi = require("joi");

const hotelSchema = new mongoose.Schema({
  name: String,
  imageURL: String,
  summary: String,
  price: Number,
  address: String,
  reviews: Array,
  hotelOptions: String,
  beds: Number,
  gallery: {
    type: [String],
    default: [],
  },
  starsNumber: Number,
});
hotelSchema.index({ address: "text" });
const Hotel = mongoose.model("Hotel", hotelSchema);

function validateHotel(hotel) {
  const schema = Joi.object({
    id: Joi.string(),
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
  });
  return schema.validate(hotel);
}
module.exports.validate = validateHotel;
module.exports.Hotel = Hotel;
module.exports.hotelSchema = hotelSchema;
