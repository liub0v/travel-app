import {authReducer} from './AuthReducer';
const {combineReducers} = require('redux');
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {destinationReducer} from './DestinationReducer';
import {adventureReducer} from './AdventureReducer';
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};
const destinationPersistConfig = {
  key: 'destination',
  storage: AsyncStorage,
};
const adventurePersistConfig = {
  key: 'adventure',
  storage: AsyncStorage,
};
export const reducers = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  destination: persistReducer(destinationPersistConfig, destinationReducer),
  adventure: persistReducer(adventurePersistConfig, adventureReducer),
});
