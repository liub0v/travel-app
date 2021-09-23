import {LOG_IN_USER, LOG_OUT_USER} from '../types/AuthTypes';
import {takeEvery, call, put} from 'redux-saga/effects';
import {userAPI} from '../../src/api/userAPI';
import {setUser, setUserToken} from '../actions/AuthActions';
import * as NavigationService from '../../src/navigation/AuthNavigationService';
export const authSagas = [
  takeEvery(LOG_IN_USER, logInUserSaga),
  takeEvery(LOG_OUT_USER, logOutUserSaga),
];

function* logInUserSaga(action) {
  const {email, password} = action.payload;
  // console.log('DATA:', email, password);
  const response = yield call(userAPI.logInUser, email, password);
  const token = response.data;
  // console.log('TOKEN', token);
  const user = yield call(userAPI.getUserByToken, token);
  yield put(setUserToken(response.data));
  // console.log('USER', user.data);
  yield put(setUser(user.data));
  NavigationService.navigate('OnBoarding');
}
function* logOutUserSaga(action) {}
