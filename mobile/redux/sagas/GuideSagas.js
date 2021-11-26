import {call, put, takeEvery} from 'redux-saga/effects';
import {ADD_GUIDE, GET_GUIDES} from '../types/GuideTypes';
import {showMessage} from 'react-native-flash-message';
import {
  addGuideCompleted,
  addGuideStarted,
  setGuidesCompleted,
  setGuidesError,
  setGuidesStarted,
  setHasMoreGuides,
} from '../actions/GuideActions';
import {userAPI} from '../../src/api/userAPI';

export const guideSagas = [
  takeEvery(GET_GUIDES, getGuidesSaga),
  takeEvery(ADD_GUIDE, addGuideSaga),
];

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
function* addGuideSaga(action) {
  try {
    const {username, email, password} = action.payload;
    yield put(addGuideStarted(true));
    const response = yield call(
      userAPI.singUpGuide,
      username,
      email.toLowerCase(),
      password,
    );
    const guide = response.data;
    yield put(addGuideCompleted(guide));
    yield put(addGuideStarted(false));
  } catch (error) {
    yield put(addGuideStarted(false));
    yield put(setGuidesError(error));
    yield call(showMessage, {
      message: error.response?.data,
      type: 'error',
    });
  }
}
