import {
  GET_DESTINATIONS,
  SET_DESTINATIONS,
  SET_DESTINATIONS_ERROR,
  SET_DESTINATIONS_IS_LOADING,
} from '../types/DestinationTypes';

export const setDestinations = destinations => {
  return {
    type: SET_DESTINATIONS,
    payload: destinations,
  };
};
export const getDestinations = () => {
  return {
    type: GET_DESTINATIONS,
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
