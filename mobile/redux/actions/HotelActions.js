import {
  ADD_HOTEL_REVIEW,
  CLEAR_HOTELS,
  DELETE_SAVED_HOTEL,
  GET_HOTELS,
  GET_HOTELS_BY_DESTINATION,
  GET_POPULAR_HOTELS,
  REMOVE_SAVED_HOTEL,
  SAVE_HOTEL,
  SET_HAS_MORE_HOTELS,
  SET_HOTEL,
  SET_HOTELS,
  SET_HOTELS_ERROR,
  SET_HOTELS_IS_LOADING,
  SET_POPULAR_HOTELS,
  UPDATE_HOTEL,
  UPDATE_HOTEL_GALLERY,
} from '../types/HotelTypes';

export const setHotels = hotels => {
  return {
    type: SET_HOTELS,
    payload: hotels,
  };
};
export const getHotelsByDestination = options => {
  return {
    type: GET_HOTELS_BY_DESTINATION,
    payload: options,
  };
};
export const getHotels = options => {
  return {
    type: GET_HOTELS,
    payload: options,
  };
};
export const setHotel = hotel => {
  return {
    type: SET_HOTEL,
    payload: hotel,
  };
};
export const updateHotel = hotelData => {
  return {
    type: UPDATE_HOTEL,
    payload: hotelData,
  };
};
export const updateHotelGallery = ({hotelID, images}) => {
  return {
    type: UPDATE_HOTEL_GALLERY,
    payload: {hotelID, images},
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
export const saveHotel = hotelID => {
  return {
    type: SAVE_HOTEL,
    payload: hotelID,
  };
};
export const deleteSavedHotel = hotelID => {
  return {
    type: DELETE_SAVED_HOTEL,
    payload: hotelID,
  };
};
export const removeSavedHotel = hotelID => {
  return {
    type: REMOVE_SAVED_HOTEL,
    payload: hotelID,
  };
};

export const addHotelReview = ({review, rating, hotelID}) => {
  return {
    type: ADD_HOTEL_REVIEW,
    payload: {review, rating, hotelID},
  };
};
