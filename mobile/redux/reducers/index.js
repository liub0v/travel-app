import {authReducer} from './AuthReducer';

const {combineReducers} = require('redux');

export const reducers = combineReducers({
  auth: authReducer,
});
