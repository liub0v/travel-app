import {authReducer} from './AuthReducer';
const {combineReducers} = require('redux');
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};
export const reducers = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});
