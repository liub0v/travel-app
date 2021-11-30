const populateSavedHotelsObj = {
  path: "savedHotels",
  populate: {
    path: "reviews",
    populate: {
      path: "rating clientID",
      select:
        "starsNumber generalRating profileInfo.imageURL profileInfo.firstName profileInfo.lastName",
    },
  },
};
const populateSavedAdventuresObj = {
  path: "savedAdventures",
  populate: {
    path: "reviews",
    populate: {
      path: "rating clientID",
      select:
        "starsNumber generalRating profileInfo.imageURL profileInfo.firstName profileInfo.lastName",
    },
  },
};
exports.populateSavedHotelsObj = populateSavedHotelsObj;
exports.populateSavedAdventuresObj = populateSavedAdventuresObj;
