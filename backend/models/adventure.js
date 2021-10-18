const mongoose = require("mongoose");
const Joi = require("joi");

const adventureSchema = new mongoose.Schema({
  guideID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guide",
  },
  name: String,
  imageURL: String,
  summary: String,
  price: Number,
  address: String,
  reviews: Array,
});
const Adventure = mongoose.model("Adventure", adventureSchema);

function validateAdventure(destination) {
  const schema = Joi.object({
    id: Joi.string(),
    name: Joi.string().required(),
    imageURL: Joi.string(),
    image: Joi.object().optional(),
    price: Joi.number(),
    address: Joi.string(),
  });
  return schema.validate(destination);
}
module.exports.validate = validateAdventure;
module.exports.Adventure = Adventure;
