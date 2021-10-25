import {
  SET_DESTINATIONS,
  SET_DESTINATIONS_ERROR,
  SET_DESTINATIONS_IS_LOADING,
  SET_HAS_MORE_DESTINATIONS,
} from '../types/DestinationTypes';

const initialState = {
  destinations: undefined,
  isLoading: false,
  error: undefined,
  hasMore: true,
};

export const destinationReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_DESTINATIONS: {
      if (state.destinations) {
        return {...state, destinations: [...state.destinations, ...payload]};
      }
      return {...state, destinations: payload};
    }
    case SET_HAS_MORE_DESTINATIONS:
      return {...state, hasMore: payload};
    case SET_DESTINATIONS_IS_LOADING:
      return {...state, isLoading: payload};
    case SET_DESTINATIONS_ERROR:
      return {...state, error: payload};
    default:
      return state;
  }
};
