import {LOG_IN_USER, LOG_OUT_USER, SING_UP_USER} from '../types/AuthTypes';
import {takeEvery, call, put} from 'redux-saga/effects';
import {userAPI} from '../../src/api/userAPI';
import {
  logInUser,
  setLogInError,
  setLogInIsLoading,
  setLogOutError,
  setLogOutIsLoading,
  setSignUpError,
  setSignUpIsLoading,
  setUser,
  setUserToken,
} from '../actions/AuthActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const authSagas = [
  takeEvery(LOG_IN_USER, logInUserSaga),
  takeEvery(SING_UP_USER, singUpUserSaga),
  takeEvery(LOG_OUT_USER, logOutUserSaga),
];

function* logInUserSaga(action) {
  try {
    const {email, password} = action.payload;
    yield put(setLogInIsLoading(true));
    const response = yield call(userAPI.logInUser, email, password);
    const token = response.headers['x-auth-token'];
    const user = response.data;
    yield put(setUserToken(token));
    yield put(setUser(user));
    yield put(setLogInIsLoading(false));
    console.log('token', token);
  } catch (error) {
    yield put(setLogInIsLoading(false));
    yield put(setLogInError(error));
  }
}
function test() {
  setTimeout(() => {}, 3000);
}
function* logOutUserSaga(action) {
  try {
    yield put(setLogOutIsLoading(true));
    yield call(AsyncStorage.clear);
    yield put(setLogOutIsLoading(false));
  } catch (error) {
    yield put(setLogOutIsLoading(false));
    yield put(setLogOutError(error));
  }
}
function* singUpUserSaga(action) {
  try {
    const {username, email, password} = action.payload;
    yield put(setSignUpIsLoading(true));
    const response = yield call(userAPI.singUpUser, username, email, password);
    const token = response.headers['x-auth-token'];
    const user = response.data;
    yield put(setUserToken(token));
    yield put(setUser(user));
    yield put(setSignUpIsLoading(false));
  } catch (error) {
    yield put(setSignUpIsLoading(false));
    yield put(setSignUpError(error));
  }
}
