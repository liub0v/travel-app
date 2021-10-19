import {
  SET_HOTELS,
  SET_HOTELS_ERROR,
  SET_HOTELS_IS_LOADING,
} from '../types/HotelTypes';

const initialState = {
  hotels: undefined,
  isLoading: false,
  error: undefined,
};

export const hotelReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_HOTELS:
      return {...state, hotels: payload};
    case SET_HOTELS_IS_LOADING:
      return {...state, isLoading: payload};
    case SET_HOTELS_ERROR:
      return {...state, error: payload};
    default:
      return state;
  }
};
