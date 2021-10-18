import {
  SET_ADVENTURES,
  SET_ADVENTURES_ERROR,
  SET_ADVENTURES_IS_LOADING,
} from '../types/AdventureTypes';

const initialState = {
  adventures: undefined,
  isLoading: false,
  error: undefined,
};

export const adventureReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_ADVENTURES:
      return {...state, adventures: payload};
    case SET_ADVENTURES_IS_LOADING:
      return {...state, isLoading: payload};
    case SET_ADVENTURES_ERROR:
      return {...state, error: payload};
    default:
      return state;
  }
};
