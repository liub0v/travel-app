import {call, put, select, takeEvery} from 'redux-saga/effects';
import {
  ADD_GUIDE,
  DELETE_GUIDE,
  GET_GUIDE,
  GET_GUIDES,
  GET_GUIDES_BY_TERM,
  UPDATE_GUIDE,
} from '../types/GuideTypes';

import {
  addGuideCompleted,
  addGuideStarted,
  deleteGuideCompleted,
  deleteGuideStarted,
  getGuideCompleted,
  getGuideStarted,
  setGuidesCompleted,
  setGuidesError,
  setGuidesStarted,
  setHasMoreGuides,
  updateGuideCompleted,
  updateGuideStarted,
} from '../actions/GuideActions';
import {userAPI} from '../../src/api/userAPI';
import {tokenSelector} from '../selectors/UserSelector';
import * as RootNavigation from '../../src/navigation/RootNavigation';
import {errorHandler} from './AdventureSagas';

export const guideSagas = [
  takeEvery(GET_GUIDES, getGuidesSaga),
  takeEvery(ADD_GUIDE, addGuideSaga),
  takeEvery(DELETE_GUIDE, deleteGuideSaga),
  takeEvery(UPDATE_GUIDE, updateGuideSaga),
  takeEvery(GET_GUIDES_BY_TERM, getGuideByTermSaga),
  takeEvery(GET_GUIDE, getGuideSaga),
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
    yield call(errorHandler, error, action);
  }
}
function* getGuideByTermSaga(action) {
  try {
    const {page, limit, term} = action.payload;
    yield put(setGuidesStarted(true));
    const response = yield call(userAPI.getGuidesByTerm, page, limit, term);
    const guides = response.data;
    yield put(setGuidesCompleted(guides));
    yield put(setGuidesStarted(false));
  } catch (error) {
    yield put(setGuidesStarted(false));
    yield put(setGuidesError(error));
    yield call(errorHandler, error, action);
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
    yield call(errorHandler, error);
  }
}
function* updateGuideSaga(action) {
  try {
    const guideData = action.payload;
    const token = yield select(tokenSelector);
    yield put(updateGuideStarted(true));
    const response = yield call(userAPI.updateUser, token, guideData);
    const guide = response.data;
    yield put(updateGuideCompleted(guide));
    yield put(updateGuideStarted(false));
  } catch (error) {
    yield put(updateGuideStarted(false));
    yield put(setGuidesError(error));
    yield call(errorHandler, error);
  }
}
function* deleteGuideSaga(action) {
  try {
    const userID = action.payload;

    const token = yield select(tokenSelector);
    yield put(deleteGuideStarted(true));
    const response = yield call(userAPI.deleteUser, token, userID);
    yield put(deleteGuideCompleted(userID));
    yield put(deleteGuideStarted(false));
    RootNavigation.navigate('Guides');
  } catch (error) {
    yield put(deleteGuideStarted(false));
    yield put(setGuidesError(error));
    yield call(errorHandler, error);
  }
}

function* getGuideSaga(action) {
  try {
    const guideID = action.payload;
    yield put(getGuideStarted(true));
    const response = yield call(userAPI.getGuideByID, guideID);
    const guide = response.data;
    yield put(getGuideCompleted(guide));
    yield put(getGuideStarted(false));
  } catch (error) {
    yield put(getGuideStarted(false));
    yield put(setGuidesError(error));
    yield call(errorHandler, error, action);
  }
}
