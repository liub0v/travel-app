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
} from '../types/AuthTypes';

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
      k;

    default:
      return state;
  }
};
