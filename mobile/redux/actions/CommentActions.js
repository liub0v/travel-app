import {CLOSE_SOCKET, SET_SOCKET} from '../types/CommentTypes';

export const setSocket = socket => {
  return {
    type: SET_SOCKET,
    payload: socket,
  };
};
export const closeSocket = () => {
  return {
    type: CLOSE_SOCKET,
  };
};
