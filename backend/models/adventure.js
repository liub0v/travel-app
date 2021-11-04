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
adventureSchema.index({ address: "text" });
const Adventure = mongoose.model("Adventure", adventureSchema);

function validateAdventure(adventure) {
  const schema = Joi.object({
    id: Joi.string(),
    name: Joi.string().required(),
    imageURL: Joi.string(),
    image: Joi.object().optional(),
    price: Joi.number(),
    address: Joi.string(),
    reviews: Joi.array(),
    summary: Joi.string(),
    guideID: Joi.string(),
  });
  return schema.validate(adventure);
}
module.exports.validate = validateAdventure;
module.exports.Adventure = Adventure;
