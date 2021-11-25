import {all} from 'redux-saga/effects';

import {authSagas} from './AuthSagas';
import {destinationSagas} from './DestinationSagas';
import {adventureSagas} from './AdventureSagas';
import {hotelSagas} from './HotelSagas';
import {commentsSagas} from './CommentSaga';
import {guideSagas} from './GuideSagas';

export function* sagaWatcher() {
  yield all([
    ...authSagas,
    ...destinationSagas,
    ...adventureSagas,
    ...hotelSagas,
    ...commentsSagas,
    ...guideSagas,
  ]);
}
