import {
  LOG_IN_USER,
  LOG_OUT_USER,
  SAVE_PROFILE_ONBOARDING,
  SET_IS_ONBOARDING,
  SET_LOG_IN_ERROR,
  SET_LOG_IN_IS_LOADING,
  SET_LOG_OUT_ERROR,
  SET_LOG_OUT_IS_LOADING,
  SET_SAVED_ADVENTURE,
  SET_SAVED_HOTEL,
  SET_SIGN_UP_ERROR,
  SET_SIGN_UP_IS_LOADING,
  SET_USER,
  SET_USER_TOKEN,
  SING_UP_USER,
} from '../types/AuthTypes';

export const logInUser = user => {
  return {
    type: LOG_IN_USER,
    payload: user,
  };
};
export const setUserToken = token => {
  return {
    type: SET_USER_TOKEN,
    payload: token,
  };
};
export const setUser = user => {
  return {
    type: SET_USER,
    payload: user,
  };
};
export const singUpUser = user => {
  return {
    type: SING_UP_USER,
    payload: user,
  };
};
export const logOutUser = () => {
  return {
    type: LOG_OUT_USER,
  };
};
export const setLogInIsLoading = isLoading => {
  return {
    type: SET_LOG_IN_IS_LOADING,
    payload: isLoading,
  };
};
export const setLogOutIsLoading = isLoading => {
  return {
    type: SET_LOG_OUT_IS_LOADING,
    payload: isLoading,
  };
};
export const setSignUpIsLoading = isLoading => {
  return {
    type: SET_SIGN_UP_IS_LOADING,
    payload: isLoading,
  };
};
export const setLogInError = error => {
  return {
    type: SET_LOG_IN_ERROR,
    payload: error,
  };
};
export const setLogOutError = error => {
  return {
    type: SET_LOG_OUT_ERROR,
    payload: error,
  };
};
export const setSignUpError = error => {
  return {
    type: SET_SIGN_UP_ERROR,
    payload: error,
  };
};

export const setIsOnboarding = isOnboarding => {
  return {
    type: SET_IS_ONBOARDING,
    payload: isOnboarding,
  };
};
export const setSavedHotel = hotel => {
  return {
    type: SET_SAVED_HOTEL,
    payload: hotel,
  };
};
export const setAdventureHotel = adventure => {
  return {
    type: SET_SAVED_ADVENTURE,
    payload: adventure,
  };
};

export const saveProfileOnboarding = isOnboarding => {
  return {
    type: SAVE_PROFILE_ONBOARDING,
    payload: isOnboarding,
  };
};
