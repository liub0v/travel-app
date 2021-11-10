import {
  ADD_ADVENTURE_REVIEW,
  CLEAR_ADVENTURES,
  DELETE_SAVED_ADVENTURE,
  GET_ADVENTURE_REVIEW,
  GET_ADVENTURES,
  GET_POPULAR_ADVENTURES,
  REMOVE_SAVED_ADVENTURE,
  SAVE_ADVENTURE,
  SET_ADVENTURES,
  SET_ADVENTURES_ERROR,
  SET_ADVENTURES_IS_LOADING,
  SET_HAS_MORE_ADVENTURES,
  SET_POPULAR_ADVENTURES,
} from '../types/AdventureTypes';

export const setAdventures = adventures => {
  return {
    type: SET_ADVENTURES,
    payload: adventures,
  };
};
export const getAdventures = options => {
  return {
    type: GET_ADVENTURES,
    payload: options,
  };
};
export const setPopularAdventures = adventures => {
  return {
    type: SET_POPULAR_ADVENTURES,
    payload: adventures,
  };
};
export const getPopularAdventures = () => {
  return {
    type: GET_POPULAR_ADVENTURES,
  };
};

export const setAdventuresIsLoading = isLoading => {
  return {
    type: SET_ADVENTURES_IS_LOADING,
    payload: isLoading,
  };
};
export const setAdventuresError = error => {
  return {
    type: SET_ADVENTURES_ERROR,
    payload: error,
  };
};

export const setHasMoreAdventures = hasMore => {
  return {
    type: SET_HAS_MORE_ADVENTURES,
    payload: hasMore,
  };
};
export const clearAdventures = () => {
  return {
    type: CLEAR_ADVENTURES,
  };
};
export const saveAdventure = adventureID => {
  return {
    type: SAVE_ADVENTURE,
    payload: adventureID,
  };
};
export const removeSavedAdventure = adventureID => {
  return {
    type: REMOVE_SAVED_ADVENTURE,
    payload: adventureID,
  };
};
export const deleteSavedAdventure = adventureID => {
  return {
    type: DELETE_SAVED_ADVENTURE,
    payload: adventureID,
  };
};
export const addAdventureReview = ({review, adventureID}) => {
  return {
    type: ADD_ADVENTURE_REVIEW,
    payload: {review, adventureID},
  };
};
export const getAdventureReview = socket => {
  return {
    type: GET_ADVENTURE_REVIEW,
    payload: socket,
  };
};
