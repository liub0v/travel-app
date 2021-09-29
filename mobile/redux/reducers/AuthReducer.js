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
} from '../types/AuthTypes';

const initialState = {
  user: {
    _id: '',
    isAdmin: false,
    username: '',
    email: '',
  },
  token: '',
  logIn: {
    isLoading: false,
    error: null,
  },
  logOut: {
    isLoading: false,
    error: null,
  },
  signUp: {
    isLoading: false,
    error: null,
  },
};
export const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_USER_TOKEN:
      return {...state, token: payload};
    case SET_USER:
      return {...state, user: payload};
    case LOG_OUT_USER:
      return {...state, token: '', user: null};
    case SET_LOG_IN_IS_LOADING:
      return {
        ...state,
        logIn: {
          ...state.logIn,
          isLoading: payload,
        },
      };
    case SET_LOG_OUT_IS_LOADING:
      return {
        ...state,
        logOut: {
          ...state.logOut,
          isLoading: payload,
        },
      };
    case SET_SIGN_UP_IS_LOADING:
      return {
        ...state,
        signUp: {
          ...state.signUp,
          isLoading: payload,
        },
      };
    case SET_LOG_IN_ERROR:
      return {
        ...state,
        logIn: {
          ...state.logIn,
          error: payload,
        },
      };
    case SET_LOG_OUT_ERROR:
      return {
        ...state,
        logOut: {
          ...state.logOut,
          error: payload,
        },
      };
    case SET_SIGN_UP_ERROR:
      return {
        ...state,
        signUp: {
          ...state.signUp,
          error: payload,
        },
      };
      k;

    default:
      return state;
  }
};
