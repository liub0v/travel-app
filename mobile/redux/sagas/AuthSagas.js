import {LOG_IN_USER, LOG_OUT_USER, SING_UP_USER} from '../types/AuthTypes';
import {takeEvery, call, put} from 'redux-saga/effects';
import {userAPI} from '../../src/api/userAPI';
import {setUser, setUserToken} from '../actions/AuthActions';
import * as NavigationService from '../../src/navigation/AuthNavigationService';
export const authSagas = [
  takeEvery(LOG_IN_USER, logInUserSaga),
  takeEvery(SING_UP_USER, singUpUserSaga),
  takeEvery(LOG_OUT_USER, logOutUserSaga),
];

function* logInUserSaga(action) {
  try {
    const {email, password} = action.payload;
    const response = yield call(userAPI.logInUser, email, password);
    const token = response.data;
    yield put(setUserToken(response.data));
    const user = yield call(userAPI.getUserByToken, token);
    yield put(setUser(user.data));
    NavigationService.navigate('OnBoarding');
  } catch (error) {
    alert(error.message);
  }
}
function* logOutUserSaga(action) {}
function* singUpUserSaga(action) {
  try {
    const {username, email, password} = action.payload;
    const response = yield call(userAPI.singUpUser, username, email, password);
    const token = response.headers['x-auth-token'];
    yield put(setUserToken(response.data));
    const user = yield call(userAPI.getUserByToken, token);
    yield put(setUser(user.data));
    NavigationService.navigate('OnBoarding');
  } catch (error) {
    alert(error.message);
  }
}
