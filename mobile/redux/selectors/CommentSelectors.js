import {createSelector} from 'reselect';

const commentSelector = state => state.comment;
export const socketSelector = createSelector(
  commentSelector,
  item => item.socket,
);
