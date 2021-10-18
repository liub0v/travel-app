import {call, put, takeEvery} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import {GET_ADVENTURES} from '../types/AdventureTypes';
import {adventureAPI} from '../../src/api/adventureAPI';
import {
  setAdventures,
  setAdventuresIsLoading,
  setAdventuresError,
} from '../actions/AdventureActions';
export const adventureSagas = [takeEvery(GET_ADVENTURES, getAdventuresSaga)];
function* getAdventuresSaga(action) {
  try {
    yield put(setAdventuresIsLoading(true));
    const response = yield call(adventureAPI.getAdventures);
    const adventures = response.data;
    yield put(setAdventures(adventures));
    yield put(setAdventuresIsLoading(false));
  } catch (error) {
    yield put(setAdventuresError(error));
    yield call(showMessage, {
      message: error.response?.data,
      type: 'error',
    });
  }
}
