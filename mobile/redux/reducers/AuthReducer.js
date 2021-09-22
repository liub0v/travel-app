import {SET_USER, SET_USER_TOKEN} from '../types/AuthTypes';

const initialState = {
  token: '',
  userId: '',
  isAdmin: false,
};

export const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_USER_TOKEN:
      return {...state, token: payload};
    case SET_USER:
      return {...state, userId: payload._id, isAdmin: payload.isAdmin};
    default:
      return state;
  }
};
