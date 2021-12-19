import {SET_SOCKET} from '../types/CommentTypes';

const initialState = {
  socket: undefined,
};
export const commentReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_SOCKET:
      return {...state, socket: payload};
    default:
      return state;
  }
};
