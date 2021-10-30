import {
  CLEAR_HOTELS,
  SET_HAS_MORE_HOTELS,
  SET_HOTELS,
  SET_HOTELS_ERROR,
  SET_HOTELS_IS_LOADING,
  SET_POPULAR_HOTELS,
} from '../types/HotelTypes';

const initialState = {
  hotels: undefined,
  popularHotels: undefined,
  isLoading: false,
  error: undefined,
  hasMore: true,
};

export const hotelReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_HOTELS: {
      if (state.hotels) {
        return {...state, hotels: [...state.hotels, ...payload]};
      }
      return {...state, hotels: payload};
    }
    case CLEAR_HOTELS:
      return {...state, hotels: undefined};
    case SET_HAS_MORE_HOTELS:
      return {...state, hasMore: payload};
    case SET_POPULAR_HOTELS:
      return {...state, popularHotels: payload};
    case SET_HOTELS_IS_LOADING:
      return {...state, isLoading: payload};
    case SET_HOTELS_ERROR:
      return {...state, error: payload};
    default:
      return state;
  }
};
