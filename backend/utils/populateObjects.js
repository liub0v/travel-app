const populateReviewsObj = {
  path: "reviews",
  populate: {
    path: "rating clientID",
    select:
      "starsNumber generalRating profileInfo.imageURL profileInfo.firstName profileInfo.lastName",
  },
};
const populateSavedHotelsObj = {
  path: "savedHotels",
  populate: populateReviewsObj,
};

const populateSavedAdventuresObj = {
  path: "savedAdventures",
  populate: populateReviewsObj,
};
const populateVisitedAdventuresObj = {
  path: "visitedAdventures",
  populate: populateReviewsObj,
};
const populateVisitedHotelsObj = {
  path: "visitedHotels",
  populate: populateReviewsObj,
};
exports.populateSavedHotelsObj = populateSavedHotelsObj;
exports.populateSavedAdventuresObj = populateSavedAdventuresObj;
exports.populateVisitedAdventuresObj = populateVisitedAdventuresObj;
exports.populateVisitedHotelsObj = populateVisitedHotelsObj;
exports.populateReviewsObj = populateReviewsObj;
