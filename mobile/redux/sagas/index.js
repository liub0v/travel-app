import {authSagas} from './AuthSagas';
import {all} from 'redux-saga/effects';
import {destinationSagas} from './DestinationSagas';
export function* sagaWatcher() {
  yield all([...authSagas, ...destinationSagas]);
}
