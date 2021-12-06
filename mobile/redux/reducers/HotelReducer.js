import {
  ADD_HOTEL_COMPLETED,
  ADD_HOTEL_REVIEW,
  CLEAR_HOTELS,
  DELETE_GALLERY_IMAGE_COMPLETED,
  DELETE_HOTEL_COMPLETED,
  DELETE_HOTEL_STARTED,
  SET_HAS_MORE_HOTELS,
  SET_HOTEL,
  SET_HOTELS,
  SET_HOTELS_ERROR,
  SET_HOTELS_IS_LOADING,
  SET_POPULAR_HOTELS,
  SET_POPULAR_HOTELS_STARTED,
} from '../types/HotelTypes';

const initialState = {
  currentHotel: undefined,
  hotels: undefined,
  popularHotels: undefined,
  isLoading: false,
  error: undefined,
  hasMore: true,
  deleteHotelLoader: false,
  popularHotelsLoader: false,
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
      return {...state, hotels: undefined, hasMore: true};
    case SET_HAS_MORE_HOTELS:
      return {...state, hasMore: payload};
    case SET_POPULAR_HOTELS:
      return {...state, popularHotels: payload};
    case SET_POPULAR_HOTELS_STARTED:
      return {...state, popularHotelsLoader: payload};
    case SET_HOTELS_IS_LOADING:
      return {...state, isLoading: payload};
    case SET_HOTELS_ERROR:
      return {...state, error: payload};
    case ADD_HOTEL_REVIEW: {
      const hotelIndex = state.hotels.findIndex(hotel => {
        return hotel._id === payload.hotelID;
      });
      const hotelsCopy = [...state.hotels];
      hotelsCopy[hotelIndex].reviews = [
        ...hotelsCopy[hotelIndex].reviews,
        payload.review,
      ];
      hotelsCopy[hotelIndex].rating = {
        ...payload.rating,
      };
      return {
        ...state,
        hotels: [...hotelsCopy],
      };
    }
    case SET_HOTEL: {
      const hotelIndex = state.hotels.findIndex(hotel => {
        return hotel._id === payload._id;
      });
      const hotelsCopy = [...state.hotels];
      hotelsCopy[hotelIndex] = payload;
      return {
        ...state,
        hotels: [...hotelsCopy],
      };
    }
    case DELETE_GALLERY_IMAGE_COMPLETED: {
      const hotelIndex = state.hotels.findIndex(hotel => {
        return hotel._id === payload.hotelID;
      });
      const hotelsCopy = [...state.hotels];
      hotelsCopy[hotelIndex].gallery = hotelsCopy[hotelIndex]?.gallery?.filter(
        imageURl => imageURl !== payload.imageURL,
      );
      return {
        ...state,
        hotels: [...hotelsCopy],
      };
    }
    case ADD_HOTEL_COMPLETED: {
      if (state.hotels) {
        return {
          ...state,
          hotels: [...state.hotels, payload],
        };
      }
      return {
        ...state,
        hotels: [payload],
      };
    }
    case DELETE_HOTEL_COMPLETED: {
      return {
        ...state,
        hotels: [...state.hotels.filter(hotel => hotel._id !== payload)],
      };
    }
    case DELETE_HOTEL_STARTED: {
      return {
        ...state,
        deleteHotelLoader: payload,
      };
    }

    default:
      return state;
  }
};
