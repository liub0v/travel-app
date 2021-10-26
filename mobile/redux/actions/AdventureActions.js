import {
  GET_ADVENTURES,
  GET_POPULAR_ADVENTURES,
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
export const getPopularAdventures = () => {
  return {
    type: GET_POPULAR_ADVENTURES,
  };
};
export const setPopularAdventures = adventures => {
  return {
    type: SET_POPULAR_ADVENTURES,
    payload: adventures,
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
