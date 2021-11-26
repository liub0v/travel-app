import {call, put, select, takeEvery} from 'redux-saga/effects';
import {ADD_GUIDE, DELETE_GUIDE, GET_GUIDES} from '../types/GuideTypes';
import {showMessage} from 'react-native-flash-message';
import {
  addGuideCompleted,
  addGuideStarted,
  deleteGuideCompleted,
  deleteGuideStarted,
  setGuidesCompleted,
  setGuidesError,
  setGuidesStarted,
  setHasMoreGuides,
} from '../actions/GuideActions';
import {userAPI} from '../../src/api/userAPI';
import {tokenSelector} from '../selectors/UserSelector';
import * as RootNavigation from '../../src/navigation/RootNavigation';

export const guideSagas = [
  takeEvery(GET_GUIDES, getGuidesSaga),
  takeEvery(ADD_GUIDE, addGuideSaga),
  takeEvery(DELETE_GUIDE, deleteGuideSaga),
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
function* deleteGuideSaga(action) {
  try {
    const userID = action.payload;
    console.log('saga', userID);
    console.log('action.payload', action.payload);
    const token = yield select(tokenSelector);
    yield put(deleteGuideStarted(true));
    const response = yield call(userAPI.deleteUser, token, userID);
    yield put(deleteGuideCompleted(userID));
    yield put(deleteGuideStarted(false));
    RootNavigation.navigate('GuidesScreen');
  } catch (error) {
    yield put(deleteGuideStarted(false));
    yield put(setGuidesError(error));
    yield call(showMessage, {
      message: error.response?.data || error.message,
      type: 'error',
    });
  }
}
