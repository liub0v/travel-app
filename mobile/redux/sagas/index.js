import {authSagas} from './AuthSagas';
import {all} from 'redux-saga/effects';
export function* sagaWatcher() {
  yield all([...authSagas]);
}
