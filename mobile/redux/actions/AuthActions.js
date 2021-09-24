import {
  LOG_IN_USER,
  LOG_OUT_USER,
  SET_USER,
  SET_USER_TOKEN,
  SING_UP_USER,
} from '../types/AuthTypes';

export const logInUser = user => {
  return {
    type: LOG_IN_USER,
    payload: user,
  };
};
export const setUserToken = token => {
  return {
    type: SET_USER_TOKEN,
    payload: token,
  };
};
export const setUser = user => {
  return {
    type: SET_USER,
    payload: user,
  };
};
export const singUpUser = user => {
  return {
    type: SING_UP_USER,
    payload: user,
  };
};
export const logOutUser = () => {
  return {
    type: LOG_OUT_USER,
  };
};
