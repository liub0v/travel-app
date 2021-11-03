import {all} from 'redux-saga/effects';
import {authSagas} from './AuthSagas';
export function* sagaWatcher() {
  yield all([...authSagas]);
}
