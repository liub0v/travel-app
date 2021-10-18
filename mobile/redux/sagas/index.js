import {authSagas} from './AuthSagas';
import {all} from 'redux-saga/effects';
import {destinationSagas} from './DestinationSagas';
import {adventureSagas} from './AdventureSagas';
export function* sagaWatcher() {
  yield all([...authSagas, ...destinationSagas, ...adventureSagas]);
}
