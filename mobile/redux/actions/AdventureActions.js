import {
  ADD_ADVENTURE,
  ADD_ADVENTURE_COMPLETED,
  ADD_ADVENTURE_REVIEW,
  ADD_ADVENTURE_STARTED,
  CLEAR_ADVENTURES,
  DELETE_SAVED_ADVENTURE,
  GET_ADVENTURE_REVIEW,
  GET_ADVENTURES,
  GET_ADVENTURES_BY_DESTINATION,
  GET_POPULAR_ADVENTURES,
  REMOVE_SAVED_ADVENTURE,
  SAVE_ADVENTURE,
  SET_ADVENTURES,
  SET_ADVENTURES_ERROR,
  SET_ADVENTURES_IS_LOADING,
  SET_HAS_MORE_ADVENTURES,
  SET_POPULAR_ADVENTURES,
  UPDATE_ADVENTURE,
  UPDATE_ADVENTURE_COMPLETED,
  UPDATE_ADVENTURE_STARTED,
} from '../types/AdventureTypes';

export const setAdventures = adventures => {
  return {
    type: SET_ADVENTURES,
    payload: adventures,
  };
};
export const getAdventuresByDestination = options => {
  return {
    type: GET_ADVENTURES_BY_DESTINATION,
    payload: options,
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
export const updateAdventure = adventureData => {
  return {
    type: UPDATE_ADVENTURE,
    payload: adventureData,
  };
};
export const updateAdventureStarted = isLoading => {
  return {
    type: UPDATE_ADVENTURE_STARTED,
    payload: isLoading,
  };
};
export const updateAdventureCompleted = adventure => {
  return {
    type: UPDATE_ADVENTURE_COMPLETED,
    payload: adventure,
  };
};
export const addAdventure = adventureData => {
  return {
    type: ADD_ADVENTURE,
    payload: adventureData,
  };
};
export const addAdventureStarted = isLoading => {
  return {
    type: ADD_ADVENTURE_STARTED,
    payload: isLoading,
  };
};
export const addAdventureCompleted = adventure => {
  return {
    type: ADD_ADVENTURE_COMPLETED,
    payload: adventure,
  };
};
