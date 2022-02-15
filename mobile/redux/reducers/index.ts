import {guideReducer} from './GuidesReducer';

const {combineReducers} = require('redux');
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {authReducer} from './AuthReducer';
import {destinationReducer} from './DestinationReducer';
import {adventureReducer} from './AdventureReducer';
import {hotelReducer} from './HotelReducer';
import {commentReducer} from './CommentReducer';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

export const reducers = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  destination: destinationReducer,
  adventure: adventureReducer,
  hotel: hotelReducer,
  guide: guideReducer,
  comment: commentReducer,
});

export type RootState = ReturnType<typeof reducers>;
