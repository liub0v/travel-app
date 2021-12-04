import {
  ADD_HOTEL,
  ADD_HOTEL_COMPLETED,
  ADD_HOTEL_REVIEW,
  CLEAR_HOTELS,
  DELETE_GALLERY_IMAGE,
  DELETE_GALLERY_IMAGE_COMPLETED,
  DELETE_HOTEL,
  DELETE_HOTEL_COMPLETED,
  DELETE_HOTEL_STARTED,
  FILTER_HOTELS,
  FILTER_HOTELS_COMPLETED,
  FILTER_HOTELS_STARTED,
  GET_HOTELS,
  GET_HOTELS_BY_DESTINATION,
  GET_POPULAR_HOTELS,
  SET_HAS_MORE_HOTELS,
  SET_HOTEL,
  SET_HOTELS,
  SET_HOTELS_ERROR,
  SET_HOTELS_IS_LOADING,
  SET_POPULAR_HOTELS,
  SET_POPULAR_HOTELS_STARTED,
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

export const addHotel = hotelData => {
  return {
    type: ADD_HOTEL,
    payload: hotelData,
  };
};
export const addHotelCompleted = hotel => {
  return {
    type: ADD_HOTEL_COMPLETED,
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
export const setPopularHotelsStarted = isLoading => {
  return {
    type: SET_POPULAR_HOTELS_STARTED,
    payload: isLoading,
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

export const deleteHotelStarted = isLoading => {
  return {
    type: DELETE_HOTEL_STARTED,
    payload: isLoading,
  };
};
export const deleteHotel = hotelID => {
  return {
    type: DELETE_HOTEL,
    payload: hotelID,
  };
};
export const deleteHotelCompleted = hotelID => {
  return {
    type: DELETE_HOTEL_COMPLETED,
    payload: hotelID,
  };
};

export const addHotelReview = ({review, rating, hotelID}) => {
  return {
    type: ADD_HOTEL_REVIEW,
    payload: {review, rating, hotelID},
  };
};
export const deleteGalleryImageCompleted = ({hotelID, imageURL}) => {
  return {
    type: DELETE_GALLERY_IMAGE_COMPLETED,
    payload: {hotelID, imageURL},
  };
};
export const deleteGalleryImage = ({hotelID, imageURL}) => {
  return {
    type: DELETE_GALLERY_IMAGE,
    payload: {hotelID, imageURL},
  };
};

export const filterHotelsStarted = isLoading => {
  return {
    type: FILTER_HOTELS_STARTED,
    payload: isLoading,
  };
};
export const filterHotels = ({page, limit, filter}) => {
  return {
    type: FILTER_HOTELS,
    payload: {page, limit, filter},
  };
};
export const filterHotelsCompleted = hotels => {
  return {
    type: FILTER_HOTELS_COMPLETED,
    payload: hotels,
  };
};
