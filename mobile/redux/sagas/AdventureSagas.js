import {call, put, select, takeEvery} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import {
  ADD_ADVENTURE,
  ADD_VISITED_ADVENTURE,
  DELETE_ADVENTURE,
  DELETE_SAVED_ADVENTURE,
  DELETE_VISITED_ADVENTURE,
  GET_ADVENTURE,
  GET_ADVENTURES,
  GET_ADVENTURES_BY_DESTINATION,
  GET_ADVENTURES_BY_TERM,
  GET_POPULAR_ADVENTURES,
  SAVE_ADVENTURE,
  UPDATE_ADVENTURE,
} from '../types/AdventureTypes';
import {adventureAPI} from '../../src/api/adventureAPI';
import {
  setAdventures,
  setAdventuresIsLoading,
  setAdventuresError,
  setHasMoreAdventures,
  setPopularAdventures,
  deleteSavedAdventureCompleted,
  updateAdventureCompleted,
  updateAdventureStarted,
  addAdventureStarted,
  addAdventureCompleted,
  deleteAdventureStarted,
  deleteAdventureCompleted,
  setPopularAdventuresStarted,
  getAdventureStarted,
  getAdventureCompleted,
} from '../actions/AdventureActions';
import {tokenSelector} from '../selectors/UserSelector';
import {userAPI} from '../../src/api/userAPI';
import {
  addVisitedAdventureCompleted,
  addVisitedAdventureStarted,
  deleteVisitedAdventureCompleted,
  deleteVisitedAdventureStarted,
  likeAdventureStarted,
  setAdventureHotel,
} from '../actions/AuthActions';
import * as RootNavigation from '../../src/navigation/RootNavigation';

export const adventureSagas = [
  takeEvery(GET_ADVENTURES_BY_DESTINATION, getAdventuresByDestinationSaga),
  takeEvery(GET_ADVENTURES, getAdventuresSaga),
  takeEvery(GET_POPULAR_ADVENTURES, getPopularAdventuresSaga),
  takeEvery(SAVE_ADVENTURE, saveAdventureSaga),
  takeEvery(DELETE_SAVED_ADVENTURE, deleteSavedAdventureSaga),
  takeEvery(UPDATE_ADVENTURE, updateAdventureSaga),
  takeEvery(ADD_ADVENTURE, addAdventureSaga),
  takeEvery(DELETE_ADVENTURE, deleteAdventureSaga),
  takeEvery(ADD_VISITED_ADVENTURE, addVisitedAdventureSaga),
  takeEvery(DELETE_VISITED_ADVENTURE, deleteVisitedAdventureSaga),
  takeEvery(GET_ADVENTURE, getAdventureSaga),
  takeEvery(GET_ADVENTURES_BY_TERM, getAdventuresByTermSaga),
];
export const errorHandler = (error, action = undefined) => {
  if (error.code === 'ECONNABORTED' || error.message === 'Network Error')
    RootNavigation.navigate('ErrorScreen', {action});
  else {
    showMessage({
      message: error.response?.data || error.message,
      type: 'error',
    });
  }
};
function* getAdventureSaga(action) {
  try {
    const adventureID = action.payload;
    yield put(getAdventureStarted(true));
    const response = yield call(adventureAPI.getAdventureByID, adventureID);
    const adventure = response.data;
    yield put(getAdventureCompleted(adventure));
    yield put(getAdventureStarted(false));
  } catch (error) {
    yield put(getAdventureStarted(false));
    yield put(setAdventuresError(error));
    yield call(errorHandler, error, action);
  }
}

function* getPopularAdventuresSaga() {
  try {
    yield put(setPopularAdventuresStarted(true));
    const response = yield call(adventureAPI.getPopularAdventures, 1, 5);
    const adventures = response.data;
    yield put(setPopularAdventures(adventures));
    yield put(setPopularAdventuresStarted(false));
  } catch (error) {
    yield put(setPopularAdventuresStarted(false));
    yield put(setAdventuresError(error));
    yield call(errorHandler, error);
  }
}
function* getAdventuresSaga(action) {
  try {
    const {page, limit} = action.payload;
    yield put(setAdventuresIsLoading(true));
    const response = yield call(adventureAPI.getAdventures, page, limit);
    const adventures = response.data;
    yield put(setAdventures(adventures));
    yield put(setAdventuresIsLoading(false));
  } catch (error) {
    yield put(setAdventuresIsLoading(false));
    yield put(setAdventuresError(error));
    yield call(errorHandler, error, action);
  }
}
function* getAdventuresByDestinationSaga(action) {
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
    yield call(errorHandler, error, action);
  }
}
function* getAdventuresByTermSaga(action) {
  try {
    const {page, limit, term} = action.payload;
    yield put(setAdventuresIsLoading(true));
    const response = yield call(
      adventureAPI.getAdventureByTerm,
      page,
      limit,
      term,
    );
    const adventures = response.data;
    yield put(setAdventures(adventures));
    yield put(setAdventuresIsLoading(false));
  } catch (error) {
    yield put(setAdventuresIsLoading(false));
    yield put(setAdventuresError(error));
    yield call(errorHandler, error, action);
  }
}

function* saveAdventureSaga(action) {
  try {
    yield put(likeAdventureStarted(true));
    const token = yield select(tokenSelector);
    const adventureID = action.payload;
    const response = yield call(userAPI.saveAdventure, adventureID, token);
    const adventure = response.data;
    yield put(setAdventureHotel(adventure));
    yield put(likeAdventureStarted(false));
  } catch (error) {
    yield put(likeAdventureStarted(false));
    yield put(setAdventuresError(error));
    yield call(errorHandler, error);
  }
}
function* deleteSavedAdventureSaga(action) {
  try {
    yield put(likeAdventureStarted(true));
    const token = yield select(tokenSelector);
    const adventureID = action.payload;

    yield call(userAPI.deleteSavedAdventure, adventureID, token);
    yield put(deleteSavedAdventureCompleted(adventureID));
    yield put(likeAdventureStarted(false));
  } catch (error) {
    yield put(likeAdventureStarted(false));
    yield put(setAdventuresError(error));
    yield call(errorHandler, error);
  }
}

function* addVisitedAdventureSaga(action) {
  try {
    yield put(addVisitedAdventureStarted(true));
    const token = yield select(tokenSelector);
    const adventureID = action.payload;
    const response = yield call(
      userAPI.addVisitedAdventure,
      token,
      adventureID,
    );
    const adventure = response.data;
    yield put(addVisitedAdventureCompleted(adventure));
    yield put(addVisitedAdventureStarted(false));
  } catch (error) {
    yield put(addVisitedAdventureStarted(false));
    yield put(setAdventuresError(error));
    yield call(errorHandler, error);
  }
}
function* deleteVisitedAdventureSaga(action) {
  try {
    yield put(deleteVisitedAdventureStarted(true));
    const token = yield select(tokenSelector);
    const adventureID = action.payload;
    yield call(userAPI.deleteVisitedAdventure, token, adventureID);
    yield put(deleteVisitedAdventureCompleted(adventureID));
    yield put(deleteVisitedAdventureStarted(false));
  } catch (error) {
    yield put(deleteVisitedAdventureStarted(false));
    yield put(setAdventuresError(error));
    yield call(errorHandler, error);
  }
}

function* updateAdventureSaga(action) {
  try {
    yield put(updateAdventureStarted(true));
    const token = yield select(tokenSelector);
    const adventureData = action.payload;
    const response = yield call(
      adventureAPI.updateAdventure,
      token,
      adventureData,
    );
    const adventure = response.data;
    yield put(updateAdventureCompleted(adventure));
    yield put(updateAdventureStarted(false));
  } catch (error) {
    yield put(updateAdventureStarted(false));
    yield put(setAdventuresError(error));
    yield call(errorHandler, error);
  }
}
function* addAdventureSaga(action) {
  try {
    yield put(addAdventureStarted(true));
    const token = yield select(tokenSelector);
    const adventureData = action.payload;
    const response = yield call(
      adventureAPI.addAdventure,
      token,
      adventureData,
    );
    const adventure = response.data;
    yield put(addAdventureCompleted(adventure));
    yield put(addAdventureStarted(false));
  } catch (error) {
    yield put(addAdventureStarted(false));
    yield put(setAdventuresError(error));
    yield call(errorHandler, error);
  }
}
function* deleteAdventureSaga(action) {
  try {
    yield put(deleteAdventureStarted(true));
    const token = yield select(tokenSelector);
    const adventureID = action.payload;
    const response = yield call(
      adventureAPI.deleteAdventure,
      token,
      adventureID,
    );
    const adventure = response.data;
    yield put(deleteAdventureCompleted(adventure._id));
    yield put(deleteAdventureStarted(false));
    RootNavigation.navigate('Adventures');
  } catch (error) {
    yield put(deleteAdventureStarted(false));
    yield put(setAdventuresError(error));
    yield call(errorHandler, error);
  }
}
