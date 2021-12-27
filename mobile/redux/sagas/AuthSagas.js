import {takeEvery, call, put, select} from 'redux-saga/effects';
import {
  deleteUserCompleted,
  deleteUserStarted,
  setIsOnboarding,
  setLogInError,
  setLogInIsLoading,
  setSignUpError,
  setSignUpIsLoading,
  setUser,
  setUserToken,
  updateUserCompleted,
  updateUserStarted,
} from '../actions/AuthActions';
import {tokenSelector} from '../selectors/UserSelector';
import {
  DELETE_USER,
  LOG_IN_USER,
  SAVE_PROFILE_ONBOARDING,
  SING_UP_USER,
  UPDATE_USER,
} from '../types/AuthTypes';
import {showMessage} from 'react-native-flash-message';
import {userAPI} from '../../src/api/userAPI';
import * as RootNavigation from '../../src/navigation/RootNavigation';

export const authSagas = [
  takeEvery(LOG_IN_USER, logInUserSaga),
  takeEvery(SING_UP_USER, singUpUserSaga),
  takeEvery(SAVE_PROFILE_ONBOARDING, saveProfileOnboarding),
  takeEvery(DELETE_USER, deleteUserSaga),
  takeEvery(UPDATE_USER, updateUserSaga),
];

const errorHandler = error => {
  if (error.code === 'ECONNABORTED' || error.message === 'Network Error')
    RootNavigation.navigate('ErrorScreen');
  else {
    showMessage({
      message: error.response?.data,
      type: 'error',
    });
  }
};
function* logInUserSaga(action) {
  try {
    const {email, password} = action.payload;
    yield put(setLogInIsLoading(true));
    const response = yield call(
      userAPI.logInUser,
      email.toLowerCase(),
      password,
    );
    const token = response.headers['x-auth-token'];
    const user = response.data;
    yield put(setUser(user));
    yield put(setUserToken(token));
    yield put(setLogInIsLoading(false));
  } catch (error) {
    yield put(setLogInIsLoading(false));
    yield put(setLogInError(error));
    yield call(errorHandler, error);
  }
}

function* singUpUserSaga(action) {
  try {
    const {username, email, password} = action.payload;
    yield put(setSignUpIsLoading(true));
    const response = yield call(
      userAPI.singUpUser,
      username,
      email.toLowerCase(),
      password,
    );
    const token = response.headers['x-auth-token'];
    const user = response.data;
    yield put(setUser(user));
    yield put(setUserToken(token));
    yield put(setSignUpIsLoading(false));
  } catch (error) {
    yield put(setSignUpIsLoading(false));
    yield put(setSignUpError(error));
    yield call(errorHandler, error);
  }
}

function* saveProfileOnboarding(action) {
  try {
    const isOnboarding = action.payload;
    const token = yield select(tokenSelector);
    const response = yield call(userAPI.putIsOnBoarding, isOnboarding, token);
    yield put(setIsOnboarding(response.data));
  } catch (error) {
    yield call(showMessage, {
      message: error.response?.data,
      type: 'error',
    });
  }
}

function* deleteUserSaga(action) {
  try {
    const {userID} = action.payload;
    const token = yield select(tokenSelector);
    yield put(deleteUserStarted(true));
    yield call(userAPI.deleteUser, token, userID);
    yield put(deleteUserCompleted(userID));
    yield put(deleteUserStarted(false));
  } catch (error) {
    yield put(deleteUserStarted(false));
    yield call(errorHandler, error);
  }
}

function* updateUserSaga(action) {
  try {
    const userData = action.payload;
    const token = yield select(tokenSelector);
    yield put(updateUserStarted(true));
    const response = yield call(userAPI.updateUser, token, userData);
    const user = response.data;
    yield put(updateUserCompleted(user));
    yield put(updateUserStarted(false));
    RootNavigation.navigate('ProfileScreen');
  } catch (error) {
    yield put(updateUserStarted(false));
    yield call(errorHandler, error);
  }
}
