import {
  ADD_DESTINATION,
  ADD_DESTINATION_COMPLETED,
  ADD_DESTINATION_STARTED,
  CLEAR_DESTINATIONS,
  DELETE_DESTINATION,
  DELETE_DESTINATION_COMPLETED,
  DELETE_DESTINATION_STARTED,
  GET_DESTINATIONS,
  GET_DESTINATIONS_BY_NAME,
  GET_DESTINATIONS_BY_NAME_COMPLETED,
  GET_POPULAR_DESTINATIONS,
  SET_DESTINATIONS,
  SET_DESTINATIONS_ERROR,
  SET_DESTINATIONS_IS_LOADING,
  SET_HAS_MORE_DESTINATIONS,
  SET_POPULAR_DESTINATIONS,
  SET_POPULAR_DESTINATIONS_STARTED,
  UPDATE_DESTINATION,
  UPDATE_DESTINATION_COMPLETED,
  UPDATE_DESTINATION_STARTED,
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
export const setPopularDestinationsStarted = isLoading => {
  return {
    type: SET_POPULAR_DESTINATIONS_STARTED,
    payload: isLoading,
  };
};
export const clearDestinations = () => {
  return {
    type: CLEAR_DESTINATIONS,
  };
};
export const getDestinationsByName = ({page, limit, countryName}) => {
  return {
    type: GET_DESTINATIONS_BY_NAME,
    payload: {page, limit, countryName},
  };
};
export const getDestinationsByNameCompleted = destinations => {
  return {
    type: GET_DESTINATIONS_BY_NAME_COMPLETED,
    payload: destinations,
  };
};

export const addDestination = destinationData => {
  return {
    type: ADD_DESTINATION,
    payload: destinationData,
  };
};
export const addDestinationStarted = isLoading => {
  return {
    type: ADD_DESTINATION_STARTED,
    payload: isLoading,
  };
};
export const addDestinationCompleted = destination => {
  return {
    type: ADD_DESTINATION_COMPLETED,
    payload: destination,
  };
};

export const updateDestination = destinationData => {
  return {
    type: UPDATE_DESTINATION,
    payload: destinationData,
  };
};
export const updateDestinationStarted = isLoading => {
  return {
    type: UPDATE_DESTINATION_STARTED,
    payload: isLoading,
  };
};
export const updateDestinationCompleted = destination => {
  return {
    type: UPDATE_DESTINATION_COMPLETED,
    payload: destination,
  };
};

export const deleteDestination = destinationID => {
  return {
    type: DELETE_DESTINATION,
    payload: destinationID,
  };
};
export const deleteDestinationStarted = isLoading => {
  return {
    type: DELETE_DESTINATION_STARTED,
    payload: isLoading,
  };
};
export const deleteDestinationCompleted = destinationID => {
  return {
    type: DELETE_DESTINATION_COMPLETED,
    payload: destinationID,
  };
};
