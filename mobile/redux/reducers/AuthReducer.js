import {LOG_OUT_USER, SET_USER, SET_USER_TOKEN} from '../types/AuthTypes';

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
  singUp: {
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
    default:
      return state;
  }
};
