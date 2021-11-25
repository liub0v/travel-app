import {call, put, takeEvery} from 'redux-saga/effects';
import {GET_GUIDES} from '../types/GuideTypes';
import {showMessage} from 'react-native-flash-message';
import {
  setGuidesCompleted,
  setGuidesError,
  setGuidesStarted,
  setHasMoreGuides,
} from '../actions/GuideActions';
import {userAPI} from '../../src/api/userAPI';

export const guideSagas = [takeEvery(GET_GUIDES, getGuidesSaga)];

function* getGuidesSaga(action) {
  try {
    const {page, limit} = action.payload;
    yield put(setGuidesStarted(true));
    const response = yield call(userAPI.getGuides, page, limit);
    const guides = response.data;
    !guides.length && (yield put(setHasMoreGuides(false)));
    yield put(setGuidesCompleted(guides));
    yield put(setGuidesStarted(false));
  } catch (error) {
    yield put(setGuidesStarted(false));
    yield put(setGuidesError(error));
    yield call(showMessage, {
      message: error.response?.data || error.message,
      type: 'error',
    });
  }
}
