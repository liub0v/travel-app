import {
  SET_DESTINATIONS,
  SET_DESTINATIONS_ERROR,
  SET_DESTINATIONS_IS_LOADING,
} from '../types/DestinationTypes';

const initialState = {
  destinations: undefined,
  isLoading: false,
  error: undefined,
};

export const destinationReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_DESTINATIONS:
      return {...state, destinations: payload};
    case SET_DESTINATIONS_IS_LOADING:
      return {...state, isLoading: payload};
    case SET_DESTINATIONS_ERROR:
      return {...state, error: payload};
    default:
      return state;
  }
};
