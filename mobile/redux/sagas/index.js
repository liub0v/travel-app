import {authSagas} from './AuthSagas';
import {all} from 'redux-saga/effects';
import {destinationSagas} from './DestinationSagas';
import {adventureSagas} from './AdventureSagas';
import {hotelSagas} from './HotelSagas';
export function* sagaWatcher() {
  yield all([
    ...authSagas,
    ...destinationSagas,
    ...adventureSagas,
    ...hotelSagas,
  ]);
}
