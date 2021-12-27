import {createSelector} from 'reselect';
import {popularAdventuresSelector} from './AdventureSelectors';

const authSelector = state => state.auth;

export const tokenSelector = createSelector(authSelector, item => item.token);
export const userSelector = createSelector(authSelector, item => item.user);

export const roleSelector = createSelector(
  userSelector,
  item => item?.userID?.role,
);

export const profileInfoSelector = createSelector(
  userSelector,
  user => user?.profileInfo,
);
export const userInfoSelector = createSelector(
  userSelector,
  user => user?.userID,
);

export const savedHotelsSelector = createSelector(
  userSelector,
  user => user.savedHotels,
);
export const savedAdventuresSelector = createSelector(
  userSelector,
  user => user.savedAdventures,
);

export const visitedHotelsSelector = createSelector(
  userSelector,
  user => user.visitedHotels,
);
export const visitedAdventuresSelector = createSelector(
  userSelector,
  user => user.visitedAdventures,
);

export const getVisitedItemsLoaderSelector = createSelector(
  authSelector,
  user => user.getVisited.isLoading,
);
export const getSavedItemsLoaderSelector = createSelector(
  authSelector,
  user => user.getSaved.isLoading,
);
export const likeHotelLoaderSelector = createSelector(
  authSelector,
  user => user.likeHotelLoading,
);
export const likeAdventureLoaderSelector = createSelector(
  authSelector,
  user => user.likeAdventureLoading,
);
export const addVisitedHotelLoaderSelector = createSelector(
  authSelector,
  user => user.addVisitedHotelLoading,
);
export const deleteVisitedHotelLoaderSelector = createSelector(
  authSelector,
  user => user.deleteVisitedHotelLoading,
);
export const addVisitedAdventureLoaderSelector = createSelector(
  authSelector,
  user => user.addVisitedAdventureLoading,
);
export const deleteVisitedAdventureLoaderSelector = createSelector(
  authSelector,
  user => user.deleteVisitedAdventureLoading,
);

export const logOutIsLoadingSelector = createSelector(
  authSelector,
  item => item.logOut.isLoading,
);
export const logInIsLoadingSelector = createSelector(
  authSelector,
  item => item.logIn.isLoading,
);
export const logInErrorSelector = createSelector(
  authSelector,
  item => item.logIn.error,
);
export const signUpIsLoadingSelector = createSelector(
  authSelector,
  item => item.signUp.isLoading,
);
export const isOnboardingSelector = createSelector(
  authSelector,
  item => item.user?.isOnBoarding,
);
export const deleteUserIsLoadingSelector = createSelector(
  authSelector,
  item => item.delete.isLoading,
);
export const updateUserIsLoadingSelector = createSelector(
  authSelector,
  item => item.update.isLoading,
);

export const getSavedHotelReviewsSelector = hotelID => {
  return createSelector(
    savedHotelsSelector,
    hotels => hotels.find(hotel => hotel._id === hotelID).reviews,
  );
};

export const getSavedAdventureReviewsSelector = adventureID => {
  return createSelector(
    popularAdventuresSelector,
    adventures =>
      adventures.find(adventure => adventure._id === adventureID).reviews,
  );
};
export const getVisitedHotelReviewsSelector = hotelID => {
  return createSelector(
    visitedHotelsSelector,
    hotels => hotels.find(hotel => hotel._id === hotelID).reviews,
  );
};
export const getVisitedAdventureReviewsSelector = adventureID => {
  return createSelector(
    visitedAdventuresSelector(),
    adventures =>
      adventures.find(adventure => adventure._id === adventureID).reviews,
  );
};
