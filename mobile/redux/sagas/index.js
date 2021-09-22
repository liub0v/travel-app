import {authSagas} from './AuthSagas';

export function* sagaWatcher() {
  yield authSagas;
}
