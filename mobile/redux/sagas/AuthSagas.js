import {LOG_IN_USER, PUT_IS_ONBOARDING, SING_UP_USER} from '../types/AuthTypes';
import {takeEvery, call, put, select} from 'redux-saga/effects';
import {userAPI} from '../../src/api/userAPI';
import {
  logInUser,
  setIsOnboarding,
  setLogInError,
  setLogInIsLoading,
  setSignUpError,
  setSignUpIsLoading,
  setUser,
  setUserToken,
} from '../actions/AuthActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {tokenSelector} from '../selectors/userSelector';
import {showMessage} from 'react-native-flash-message';
export const authSagas = [
  takeEvery(LOG_IN_USER, logInUserSaga),
  takeEvery(SING_UP_USER, singUpUserSaga),
  takeEvery(PUT_IS_ONBOARDING, putIsOnboarding),
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
    yield put(setSignUpError(error));
    // let message;
    // switch (error.response.status) {
    //   case 400:
    //     message = 'User already exist';
    //   default:
    //     message = 'No server connection';
    //     break;
    // }
    yield call(showMessage, {
      message: error.response?.data,
      type: 'error',
    });
  }
}

function* putIsOnboarding(action) {
  try {
    const isOnboarding = action.payload;
    const token = yield select(tokenSelector);
    const response = yield call(userAPI.putIsOnBoarding, isOnboarding, token);
    console.log('response.data', response.data);
    console.log(typeof response.data);
    yield put(setIsOnboarding(response.data));
  } catch (error) {
    //loading???
    //set error ???
    yield call(showMessage, {
      message: error.response?.data,
      type: 'error',
    });
  }
}
