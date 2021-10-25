import {authReducer} from './AuthReducer';
const {combineReducers} = require('redux');
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {destinationReducer} from './DestinationReducer';
import {adventureReducer} from './AdventureReducer';
import {hotelReducer} from './HotelReducer';
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};
// const destinationPersistConfig = {
//   key: 'destination',
//   storage: AsyncStorage,
// };
// const adventurePersistConfig = {
//   key: 'adventure',
//   storage: AsyncStorage,
// };
// const hotelPersistConfig = {
//   key: 'hotel',
//   storage: AsyncStorage,
// };
export const reducers = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  destination: destinationReducer,
  adventure: adventureReducer,
  hotel: hotelReducer,
});
