import {
  ADD_HOTEL_COMPLETED,
  ADD_HOTEL_REVIEW,
  CLEAR_HOTEL,
  CLEAR_HOTELS,
  DELETE_GALLERY_IMAGE_COMPLETED,
  DELETE_HOTEL_COMPLETED,
  DELETE_HOTEL_STARTED,
  GET_HOTEL_COMPLETED,
  GET_HOTEL_STARTED,
  RESET_HOTELS,
  SET_HAS_MORE_HOTELS,
  UPDATE_HOTEL_COMPLETED,
  SET_HOTELS,
  SET_HOTELS_ERROR,
  SET_HOTELS_IS_LOADING,
  SET_POPULAR_HOTELS,
  SET_POPULAR_HOTELS_STARTED,
  UPDATE_HOTEL_STARTED,
  ADD_HOTEL_STARTED,
  DELETE_GALLERY_IMAGE_STARTED,
} from '../types/HotelTypes';
import {PAGE_SIZE} from '../../src/constants/api';
import {AnyAction} from 'redux';

type TOperation = {
  isLoading: boolean;
  error?: any;
};
export type TRating = {
  generalRating?: number;
  starsNumber?: number;
};
export type THotel = {
  _id: string;
  name: string;
  imageURL?: string;
  summary?: string;
  address?: string;
  price?: number;
  hotelOptions?: string;
  rating?: TRating;
  reviews?: Array<any>;
  gallery?: Array<string>;
  starsNumber?: number;
};
export type THotelState = {
  hotels?: Array<THotel>;
  popularHotels?: Array<THotel>;
  isLoading: boolean;
  error?: any;
  hasMore: boolean;
  deleteHotelLoader: boolean;
  popularHotelsLoader: boolean;
  update: TOperation;
  add: TOperation;
  currentHotel: TOperation & {data: any};
  gallery: {
    delete: TOperation;
  };
};

const initialState: THotelState = {
  hotels: undefined,
  popularHotels: undefined,
  isLoading: false,
  error: undefined,
  hasMore: true,
  deleteHotelLoader: false,
  popularHotelsLoader: false,
  update: {
    isLoading: false,
    error: undefined,
  },
  add: {
    isLoading: false,
    error: undefined,
  },
  currentHotel: {
    data: undefined,
    isLoading: false,
    error: undefined,
  },
  gallery: {
    delete: {
      isLoading: false,
      error: undefined,
    },
  },
};

export const hotelReducer = (
  state = initialState,
  {type, payload}: AnyAction,
) => {
  switch (type) {
    case GET_HOTEL_COMPLETED:
      return {...state, currentHotel: {...state.currentHotel, data: payload}};
    case GET_HOTEL_STARTED:
      return {
        ...state,
        currentHotel: {...state.currentHotel, isLoading: payload},
      };
    case SET_HOTELS: {
      if (state.hotels) {
        return {
          ...state,
          hotels: [...state.hotels, ...payload],
          hasMore: payload.length === PAGE_SIZE,
        };
      }
      return {...state, hotels: payload, hasMore: payload.length === PAGE_SIZE};
    }
    case CLEAR_HOTELS:
      return {...state, hotels: undefined, hasMore: true};
    case CLEAR_HOTEL:
      return {
        ...state,
        currentHotel: {
          data: undefined,
          isLoading: false,
          error: undefined,
        },
      };
    case RESET_HOTELS:
      return {...state, hotels: payload};
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
      return {
        ...state,
        currentHotel: {
          ...state.currentHotel,
          data: {
            ...state.currentHotel.data,
            reviews: [...state.currentHotel.data.reviews, payload.review],
            rating: {...payload.rating},
          },
        },
      };
    }
    case UPDATE_HOTEL_COMPLETED: {
      const hotelIndex = state.hotels?.findIndex(hotel => {
        return hotel._id === payload._id;
      });
      if (hotelIndex === undefined) {
        throw new Error("hotel isn't exist");
      }
      const hotelsCopy = [...state.hotels];
      hotelsCopy[hotelIndex] = payload;
      return {
        ...state,
        hotels: [...hotelsCopy],
        currentHotel: {...state.currentHotel, data: payload},
      };
    }
    case UPDATE_HOTEL_STARTED:
      return {...state, update: {...state.update, isLoading: payload}};
    case ADD_HOTEL_STARTED:
      return {...state, add: {...state.add, isLoading: payload}};
    case DELETE_GALLERY_IMAGE_COMPLETED: {
      const hotelIndex = state.hotels?.findIndex(hotel => {
        return hotel._id === payload.hotelID;
      });
      if (hotelIndex === undefined) {
        throw new Error("hotel isn't exist");
      }
      const hotelsCopy = [...state.hotels];
      hotelsCopy[hotelIndex].gallery = hotelsCopy[hotelIndex]?.gallery?.filter(
        (imageURl: string) => imageURl !== payload.imageURL,
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
        hotels: [...state.hotels?.filter(hotel => hotel._id !== payload)],
      };
    }
    case DELETE_HOTEL_STARTED: {
      return {
        ...state,
        deleteHotelLoader: payload,
      };
    }
    case DELETE_GALLERY_IMAGE_STARTED:
      return {
        ...state,
        gallery: {
          ...state.gallery,
          delete: {...state.gallery.delete, isLoading: payload},
        },
      };
    default:
      return state;
  }
};
