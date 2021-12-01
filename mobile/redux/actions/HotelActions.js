import {
  GET_HOTELS,
  SET_HOTELS,
  SET_HOTELS_ERROR,
  SET_HOTELS_IS_LOADING,
} from '../types/HotelTypes';

export const setHotels = hotels => {
  return {
    type: SET_HOTELS,
    payload: hotels,
  };
};
export const getHotels = () => {
  return {
    type: GET_HOTELS,
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
