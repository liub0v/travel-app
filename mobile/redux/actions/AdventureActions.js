import {
  GET_ADVENTURES,
  SET_ADVENTURES,
  SET_ADVENTURES_ERROR,
  SET_ADVENTURES_IS_LOADING,
} from '../types/AdventureTypes';

export const setAdventures = adventures => {
  return {
    type: SET_ADVENTURES,
    payload: adventures,
  };
};
export const getAdventures = () => {
  return {
    type: GET_ADVENTURES,
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
