const mongoose = require("mongoose");
const Joi = require("joi");

const destinationSchema = new mongoose.Schema({
  countryName: String,
  imageURL: String,
});

destinationSchema.index({ countryName: "text" });

const Destination = mongoose.model("Destination", destinationSchema);

function validateDestination(destination) {
  const schema = Joi.object({
    destinationID: Joi.string(),
    countryName: Joi.string(),
    imageURL: Joi.string(),
    image: Joi.object().optional(),
  });
  return schema.validate(destination);
}
module.exports.validate = validateDestination;
module.exports.Destination = Destination;
