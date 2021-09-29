import {createSelector} from 'reselect';
const authSelector = state => state.auth;
export const tokenSelector = createSelector(authSelector, item => item.token);
export const logOutIsLoadingSelector = createSelector(
  authSelector,
  item => item.logOut.isLoading,
);
export const logInIsLoadingSelector = createSelector(
  authSelector,
  item => item.logIn.isLoading,
);
export const signUpIsLoadingSelector = createSelector(
  authSelector,
  item => item.signUp.isLoading,
);
