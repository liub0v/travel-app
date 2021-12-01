import {takeEvery, call, put, select} from 'redux-saga/effects';
import {
  setIsOnboarding,
  setLogInError,
  setLogInIsLoading,
  setSignUpError,
  setSignUpIsLoading,
  setUser,
  setUserToken,
} from '../actions/AuthActions';
import {tokenSelector} from '../selectors/UserSelector';
import {
  LOG_IN_USER,
  SAVE_PROFILE_ONBOARDING,
  SING_UP_USER,
} from '../types/AuthTypes';
import {showMessage} from 'react-native-flash-message';
import {userAPI} from '../../src/api/userAPI';

export const authSagas = [
  takeEvery(LOG_IN_USER, logInUserSaga),
  takeEvery(SING_UP_USER, singUpUserSaga),
  takeEvery(SAVE_PROFILE_ONBOARDING, saveProfileOnboarding),
];

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
    yield call(showMessage, {
      message: error.response?.data,
      type: 'error',
    });
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
    yield call(showMessage, {
      message: error.response?.data,
      type: 'error',
    });
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
