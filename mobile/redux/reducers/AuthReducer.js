import {
  LOG_OUT_USER,
  SET_LOG_IN_IS_LOADING,
  SET_USER,
  SET_USER_TOKEN,
  SET_LOG_OUT_IS_LOADING,
  SET_SIGN_UP_IS_LOADING,
  SET_LOG_IN_ERROR,
  SET_LOG_OUT_ERROR,
  SET_SIGN_UP_ERROR,
  SET_IS_ONBOARDING,
  SET_SAVED_HOTEL,
  SET_SAVED_ADVENTURE,
  DELETE_USER_STARTED,
  UPDATE_USER_STARTED,
  UPDATE_USER_COMPLETED,
} from '../types/AuthTypes';
import {
  DELETE_SAVED_HOTEL_COMPLETED,
  LIKE_HOTEL_STARTED,
} from '../types/HotelTypes';
import {
  DELETE_SAVED_ADVENTURE_COMPLETED,
  LIKE_ADVENTURE_STARTED,
} from '../types/AdventureTypes';

const initialState = {
  user: undefined,
  token: undefined,
  logIn: {
    isLoading: false,
    error: undefined,
  },
  logOut: {
    isLoading: false,
    error: undefined,
  },
  signUp: {
    isLoading: false,
    error: undefined,
  },
  delete: {
    isLoading: false,
    error: undefined,
  },
  update: {
    isLoading: false,
    error: undefined,
  },
  likeHotelLoading: false,
  likeAdventureLoading: false,
};
export const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_USER_TOKEN:
      return {...state, token: payload};
    case SET_USER:
      return {...state, user: payload};
    case LOG_OUT_USER: {
      return {...state, user: undefined, token: undefined};
    }
    case SET_IS_ONBOARDING:
      return {
        ...state,
        user: {
          ...state.user,
          isOnBoarding: payload,
        },
      };
    case SET_LOG_IN_IS_LOADING:
      return {
        ...state,
        logIn: {
          ...state.logIn,
          error: undefined,
          isLoading: payload,
        },
      };
    case SET_LOG_OUT_IS_LOADING:
      return {
        ...state,
        logOut: {
          ...state.logOut,
          error: undefined,
          isLoading: payload,
        },
      };
    case SET_SIGN_UP_IS_LOADING:
      return {
        ...state,
        signUp: {
          ...state.signUp,
          error: undefined,
          isLoading: payload,
        },
      };
    case SET_LOG_IN_ERROR:
      return {
        ...state,
        logIn: {
          ...state.logIn,
          isLoading: false,
          error: payload,
        },
      };
    case SET_LOG_OUT_ERROR:
      return {
        ...state,
        logOut: {
          ...state.logOut,
          isLoading: false,
          error: payload,
        },
      };
    case SET_SIGN_UP_ERROR:
      return {
        ...state,
        signUp: {
          ...state.signUp,
          isLoading: false,
          error: payload,
        },
      };
    case SET_SAVED_HOTEL:
      return {
        ...state,
        user: {
          ...state.user,
          savedHotels: [...state.user.savedHotels, payload],
        },
      };

    case SET_SAVED_ADVENTURE:
      return {
        ...state,
        user: {
          ...state.user,
          savedAdventures: [...state.user.savedAdventures, payload],
        },
      };
    case DELETE_SAVED_ADVENTURE_COMPLETED:
      return {
        ...state,
        user: {
          ...state.user,
          savedAdventures: state.user.savedAdventures.filter(
            item => item._id !== payload,
          ),
        },
      };
    case DELETE_SAVED_HOTEL_COMPLETED:
      return {
        ...state,
        user: {
          ...state.user,
          savedHotels: state.user.savedHotels.filter(
            item => item._id !== payload,
          ),
        },
      };
    case LIKE_HOTEL_STARTED:
      return {...state, likeHotelLoading: payload};
    case LIKE_ADVENTURE_STARTED:
      return {...state, likeAdventureLoading: payload};
    case DELETE_USER_STARTED:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: payload,
        },
      };
    case UPDATE_USER_STARTED:
      return {
        ...state,
        update: {
          ...state.delete,
          isLoading: payload,
        },
      };
    case UPDATE_USER_COMPLETED:
      return {
        ...state,
        user: {
          ...state.user,
          userID: payload.userID,
          profileInfo: payload.profileInfo,
        },
      };

    default:
      return state;
  }
};
