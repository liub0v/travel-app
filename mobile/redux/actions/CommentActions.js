import {CLOSE_SOCKET, SET_SOCKET} from '../types/CommentTypes';

export const setSocket = socket => {
  console.log('set socket');
  return {
    type: SET_SOCKET,
    payload: socket,
  };
};
export const closeSocket = () => {
  console.log('socket close');
  return {
    type: CLOSE_SOCKET,
  };
};
