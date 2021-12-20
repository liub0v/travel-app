import {
  GET_DESTINATIONS,
  GET_POPULAR_DESTINATIONS,
  SET_DESTINATIONS,
  SET_DESTINATIONS_ERROR,
  SET_DESTINATIONS_IS_LOADING,
  SET_HAS_MORE_DESTINATIONS,
  SET_POPULAR_DESTINATIONS,
} from '../types/DestinationTypes';

export const setDestinations = destinations => {
  return {
    type: SET_DESTINATIONS,
    payload: destinations,
  };
};
export const getDestinations = options => {
  return {
    type: GET_DESTINATIONS,
    payload: options,
  };
};
export const setDestinationsIsLoading = isLoading => {
  return {
    type: SET_DESTINATIONS_IS_LOADING,
    payload: isLoading,
  };
};
export const setDestinationsError = error => {
  return {
    type: SET_DESTINATIONS_ERROR,
    payload: error,
  };
};
export const setHasMoreDestinations = hasMore => {
  return {
    type: SET_HAS_MORE_DESTINATIONS,
    payload: hasMore,
  };
};
export const getPopularDestinations = () => {
  return {
    type: GET_POPULAR_DESTINATIONS,
  };
};
export const setPopularDestinations = popularDestinations => {
  return {
    type: SET_POPULAR_DESTINATIONS,
    payload: popularDestinations,
  };
};
