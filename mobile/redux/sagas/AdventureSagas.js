import {call, put, takeEvery} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import {GET_ADVENTURES, GET_POPULAR_ADVENTURES} from '../types/AdventureTypes';
import {adventureAPI} from '../../src/api/adventureAPI';
import {
  setAdventures,
  setAdventuresIsLoading,
  setAdventuresError,
  setHasMoreAdventures,
  setPopularAdventures,
} from '../actions/AdventureActions';
export const adventureSagas = [
  takeEvery(GET_ADVENTURES, getAdventuresSaga),
  takeEvery(GET_POPULAR_ADVENTURES, getPopularAdventuresSaga),
];
function* getPopularAdventuresSaga(action) {
  try {
    // yield put(setAdventuresIsLoading(true));
    const response = yield call(adventureAPI.getPopularAdventures, 1, 3);
    const adventures = response.data;
    yield put(setPopularAdventures(adventures));
    // yield put(setAdventuresIsLoading(false));
  } catch (error) {
    // yield put(setAdventuresIsLoading(false));
    // yield put(setAdventuresError(error));
    // yield call(showMessage, {
    //   message: error.response?.data,
    //   type: 'error',
    // });
  }
}
function* getAdventuresSaga(action) {
  try {
    const {page, limit, destination} = action.payload;
    yield put(setAdventuresIsLoading(true));
    const response = yield call(
      adventureAPI.getAdventuresByDestination,
      page,
      limit,
      destination,
    );
    const adventures = response.data;
    yield put(setAdventures(adventures));
    !adventures.length && (yield put(setHasMoreAdventures(false)));

    yield put(setAdventuresIsLoading(false));
  } catch (error) {
    yield put(setAdventuresIsLoading(false));
    yield put(setAdventuresError(error));
    yield call(showMessage, {
      message: error.response?.data,
      type: 'error',
    });
  }
}
