import {createSelector} from 'reselect';

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
