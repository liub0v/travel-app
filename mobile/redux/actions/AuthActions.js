import {
  DELETE_USER,
  DELETE_USER_COMPLETED,
  DELETE_USER_STARTED,
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
  UPDATE_USER,
  UPDATE_USER_COMPLETED,
  UPDATE_USER_STARTED,
} from '../types/AuthTypes';
import {
  ADD_VISITED_HOTEL,
  ADD_VISITED_HOTEL_COMPLETED,
  ADD_VISITED_HOTEL_STARTED,
  DELETE_SAVED_HOTEL,
  DELETE_SAVED_HOTEL_COMPLETED,
  DELETE_VISITED_HOTEL,
  DELETE_VISITED_HOTEL_COMPLETED,
  DELETE_VISITED_HOTEL_STARTED,
  LIKE_HOTEL_STARTED,
  SAVE_HOTEL,
} from '../types/HotelTypes';
import {
  ADD_VISITED_ADVENTURE,
  ADD_VISITED_ADVENTURE_COMPLETED,
  ADD_VISITED_ADVENTURE_STARTED,
  DELETE_VISITED_ADVENTURE,
  DELETE_VISITED_ADVENTURE_COMPLETED,
  DELETE_VISITED_ADVENTURE_STARTED,
  LIKE_ADVENTURE_STARTED,
} from '../types/AdventureTypes';

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

export const deleteUserStarted = isLoading => {
  return {
    type: DELETE_USER_STARTED,
    payload: isLoading,
  };
};
export const deleteUser = userID => {
  return {
    type: DELETE_USER,
    payload: userID,
  };
};
export const deleteUserCompleted = userID => {
  return {
    type: DELETE_USER_COMPLETED,
    payload: userID,
  };
};

export const updateUserStarted = isLoading => {
  return {
    type: UPDATE_USER_STARTED,
    payload: isLoading,
  };
};

export const updateUser = userData => {
  return {
    type: UPDATE_USER,
    payload: userData,
  };
};

export const updateUserCompleted = user => {
  return {
    type: UPDATE_USER_COMPLETED,
    payload: user,
  };
};

export const saveHotel = hotelID => {
  return {
    type: SAVE_HOTEL,
    payload: hotelID,
  };
};
export const deleteSavedHotel = hotelID => {
  return {
    type: DELETE_SAVED_HOTEL,
    payload: hotelID,
  };
};
export const deleteSavedHotelCompleted = hotelID => {
  return {
    type: DELETE_SAVED_HOTEL_COMPLETED,
    payload: hotelID,
  };
};

export const likeHotelStarted = isLoading => {
  return {
    type: LIKE_HOTEL_STARTED,
    payload: isLoading,
  };
};
export const likeAdventureStarted = isLoading => {
  return {
    type: LIKE_ADVENTURE_STARTED,
    payload: isLoading,
  };
};

export const addVisitedHotelStarted = isLoading => {
  return {
    type: ADD_VISITED_HOTEL_STARTED,
    payload: isLoading,
  };
};
export const addVisitedHotel = hotelID => {
  return {
    type: ADD_VISITED_HOTEL,
    payload: hotelID,
  };
};
export const addVisitedHotelCompleted = hotel => {
  return {
    type: ADD_VISITED_HOTEL_COMPLETED,
    payload: hotel,
  };
};

export const deleteVisitedHotelStarted = isLoading => {
  return {
    type: DELETE_VISITED_HOTEL_STARTED,
    payload: isLoading,
  };
};
export const deleteVisitedHotel = hotelID => {
  return {
    type: DELETE_VISITED_HOTEL,
    payload: hotelID,
  };
};
export const deleteVisitedHotelCompleted = hotelID => {
  return {
    type: DELETE_VISITED_HOTEL_COMPLETED,
    payload: hotelID,
  };
};

export const addVisitedAdventureStarted = isLoading => {
  return {
    type: ADD_VISITED_ADVENTURE_STARTED,
    payload: isLoading,
  };
};
export const addVisitedAdventure = adventureID => {
  return {
    type: ADD_VISITED_ADVENTURE,
    payload: adventureID,
  };
};
export const addVisitedAdventureCompleted = adventure => {
  return {
    type: ADD_VISITED_ADVENTURE_COMPLETED,
    payload: adventure,
  };
};

export const deleteVisitedAdventureStarted = isLoading => {
  return {
    type: DELETE_VISITED_ADVENTURE_STARTED,
    payload: isLoading,
  };
};
export const deleteVisitedAdventure = adventureID => {
  return {
    type: DELETE_VISITED_ADVENTURE,
    payload: adventureID,
  };
};
export const deleteVisitedAdventureCompleted = adventureID => {
  return {
    type: DELETE_VISITED_ADVENTURE_COMPLETED,
    payload: adventureID,
  };
};
