import {call, put, select, takeEvery} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import {
  DELETE_SAVED_ADVENTURE,
  GET_ADVENTURES,
  GET_ADVENTURES_BY_DESTINATION,
  GET_POPULAR_ADVENTURES,
  SAVE_ADVENTURE,
} from '../types/AdventureTypes';
import {adventureAPI} from '../../src/api/adventureAPI';
import {
  setAdventures,
  setAdventuresIsLoading,
  setAdventuresError,
  setHasMoreAdventures,
  setPopularAdventures,
  removeSavedAdventure,
} from '../actions/AdventureActions';
import {tokenSelector} from '../selectors/UserSelector';
import {userAPI} from '../../src/api/userAPI';
import {setAdventureHotel} from '../actions/AuthActions';

export const adventureSagas = [
  takeEvery(GET_ADVENTURES_BY_DESTINATION, getAdventuresSagaByDestination),
  takeEvery(GET_ADVENTURES, getAdventuresSaga),
  takeEvery(GET_POPULAR_ADVENTURES, getPopularAdventuresSaga),
  takeEvery(SAVE_ADVENTURE, saveAdventureSaga),
  takeEvery(DELETE_SAVED_ADVENTURE, deleteSavedAdventureSaga),
];
function* getPopularAdventuresSaga(action) {
  try {
    // yield put(setAdventuresIsLoading(true));
    const response = yield call(adventureAPI.getPopularAdventures, 1, 5);
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
    yield put(setAdventuresIsLoading(true));
    const response = yield call(adventureAPI.getAdventures, 1, 5);
    const adventures = response.data;
    yield put(setAdventures(adventures));
    yield put(setAdventuresIsLoading(false));
  } catch (error) {
    // yield put(setAdventuresIsLoading(false));
    // yield put(setAdventuresError(error));
    // yield call(showMessage, {
    //   message: error.response?.data,
    //   type: 'error',
    // });
  }
}
function* getAdventuresSagaByDestination(action) {
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
    !adventures.length && (yield put(setHasMoreAdventures(false)));
    yield put(setAdventures(adventures));
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

function* saveAdventureSaga(action) {
  try {
    // yield put(setHotelsIsLoading(true));
    const token = yield select(tokenSelector);
    const adventureID = action.payload;
    const response = yield call(userAPI.saveAdventure, adventureID, token);
    const adventure = response.data;
    yield put(setAdventureHotel(adventure));
    // yield put(setPopularHotels(hotels));
    // yield put(setHotelsIsLoading(false));
  } catch (error) {
    // yield put(setHotelsIsLoading(false));
    // yield put(setHotelsError(error));
    // yield call(showMessage, {
    //   message: error.response?.data,
    //   type: 'error',
    // });
  }
}
function* deleteSavedAdventureSaga(action) {
  try {
    // yield put(setHotelsIsLoading(true));
    const token = yield select(tokenSelector);
    const adventureID = action.payload;

    const response = yield call(
      userAPI.deleteSavedAdventure,
      adventureID,
      token,
    );
    console.log(response);
    yield put(removeSavedAdventure(adventureID));
    // yield put(setPopularHotels(hotels));
    // yield put(setHotelsIsLoading(false));
  } catch (error) {
    // yield put(setHotelsIsLoading(false));
    // yield put(setHotelsError(error));
    // yield call(showMessage, {
    //   message: error.response?.data,
    //   type: 'error',
    // });
  }
}
