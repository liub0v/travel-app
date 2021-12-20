const _ = require("lodash");
function calculateAverageRating(rating, count, clientRating) {
  const generalRatingNumber = (rating * count + clientRating) / (count + 1);
  return _.round(generalRatingNumber, 1);
}
module.exports.calculateAverageRating = calculateAverageRating;
