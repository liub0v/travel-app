import {createSelector} from 'reselect';
const authSelector = state => state.auth;
export const tokenSelector = createSelector(authSelector, item => item.token);
