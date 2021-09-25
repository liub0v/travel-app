import {LOG_IN_USER, LOG_OUT_USER, SING_UP_USER} from '../types/AuthTypes';
import {takeEvery, call, put} from 'redux-saga/effects';
import {userAPI} from '../../src/api/userAPI';
import {setUser, setUserToken} from '../actions/AuthActions';
import * as NavigationService from '../../src/navigation/AuthNavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const authSagas = [
  takeEvery(LOG_IN_USER, logInUserSaga),
  takeEvery(SING_UP_USER, singUpUserSaga),
  takeEvery(LOG_OUT_USER, logOutUserSaga),
];

function* logInUserSaga(action) {
  try {
    const {email, password} = action.payload;
    const response = yield call(userAPI.logInUser, email, password);
    const token = response.headers['x-auth-token'];
    yield put(setUserToken(token));
    const user = response.data;
    yield put(setUser(user));
  } catch (error) {
    alert(error.message);
  }
}
function* logOutUserSaga(action) {
  try {
    yield call(AsyncStorage.clear);
    console.log('log out');
  } catch (error) {
    alert(error.message);
  }
}
function* singUpUserSaga(action) {
  try {
    const {username, email, password} = action.payload;
    const response = yield call(userAPI.singUpUser, username, email, password);
    const token = response.headers['x-auth-token'];
    yield put(setUserToken(token));
    const user = response.data;
    yield put(setUser(user));
  } catch (error) {
    alert(error.message);
  }
}
