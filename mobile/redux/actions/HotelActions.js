import {
  CLEAR_HOTELS,
  GET_HOTELS,
  GET_POPULAR_HOTELS,
  SET_HAS_MORE_HOTELS,
  SET_HOTELS,
  SET_HOTELS_ERROR,
  SET_HOTELS_IS_LOADING,
  SET_POPULAR_HOTELS,
} from '../types/HotelTypes';

export const setHotels = hotels => {
  return {
    type: SET_HOTELS,
    payload: hotels,
  };
};
export const getHotels = options => {
  return {
    type: GET_HOTELS,
    payload: options,
  };
};
export const getPopularHotels = () => {
  return {
    type: GET_POPULAR_HOTELS,
  };
};
export const setPopularHotels = hotels => {
  return {
    type: SET_POPULAR_HOTELS,
    payload: hotels,
  };
};
export const setHasMoreHotels = hasMore => {
  return {
    type: SET_HAS_MORE_HOTELS,
    payload: hasMore,
  };
};

export const setHotelsIsLoading = isLoading => {
  return {
    type: SET_HOTELS_IS_LOADING,
    payload: isLoading,
  };
};
export const setHotelsError = error => {
  return {
    type: SET_HOTELS_ERROR,
    payload: error,
  };
};
export const clearHotels = () => {
  return {
    type: CLEAR_HOTELS,
  };
};
