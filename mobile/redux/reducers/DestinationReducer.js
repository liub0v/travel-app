import {
  CLEAR_DESTINATIONS,
  SET_DESTINATIONS,
  SET_DESTINATIONS_ERROR,
  SET_DESTINATIONS_IS_LOADING,
  SET_HAS_MORE_DESTINATIONS,
  SET_POPULAR_DESTINATIONS,
  SET_POPULAR_DESTINATIONS_STARTED,
} from '../types/DestinationTypes';

const initialState = {
  popularDestinations: undefined,
  destinations: undefined,
  isLoading: false,
  error: undefined,
  hasMore: true,
  popularDestinationsLoading: false,
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
    case SET_POPULAR_DESTINATIONS:
      return {...state, popularDestinations: payload};
    case SET_DESTINATIONS_IS_LOADING:
      return {...state, isLoading: payload};
    case SET_DESTINATIONS_ERROR:
      return {...state, error: payload};
    case SET_POPULAR_DESTINATIONS_STARTED:
      return {...state, popularDestinationsLoading: payload};
    case CLEAR_DESTINATIONS:
      return {...state, destinations: undefined, hasMore: true};
    default:
      return state;
  }
};
