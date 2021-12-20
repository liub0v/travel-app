import {call, put, select, takeEvery} from 'redux-saga/effects';
import {
  addDestinationCompleted,
  addDestinationStarted,
  deleteDestinationCompleted,
  deleteDestinationStarted,
  setDestinations,
  setDestinationsError,
  setDestinationsIsLoading,
  setPopularDestinations,
  setPopularDestinationsStarted,
  updateDestinationCompleted,
  updateDestinationStarted,
} from '../actions/DestinationActions';
import {destinationAPI} from '../../src/api/destinationAPI';

import {
  ADD_DESTINATION,
  DELETE_DESTINATION,
  GET_DESTINATIONS,
  GET_DESTINATIONS_BY_NAME,
  GET_POPULAR_DESTINATIONS,
  UPDATE_DESTINATION,
} from '../types/DestinationTypes';
import {searchAPI} from '../../src/api/searchAPI';
import {tokenSelector} from '../selectors/UserSelector';
import * as RootNavigation from '../../src/navigation/RootNavigation';
import {errorHandler} from './AdventureSagas';

export const destinationSagas = [
  takeEvery(GET_DESTINATIONS, getDestinationsSaga),
  takeEvery(GET_POPULAR_DESTINATIONS, getPopularDestinationsSaga),
  takeEvery(GET_DESTINATIONS_BY_NAME, getDestinationsByNameSaga),
  takeEvery(ADD_DESTINATION, addDestinationSaga),
  takeEvery(UPDATE_DESTINATION, updateDestinationSaga),
  takeEvery(DELETE_DESTINATION, deleteDestinationSaga),
];
function* getPopularDestinationsSaga() {
  try {
    yield put(setPopularDestinationsStarted(true));
    const response = yield call(destinationAPI.getDestinations, 1, 3);
    const destinations = response.data;
    yield put(setPopularDestinations(destinations));
    yield put(setPopularDestinationsStarted(false));
  } catch (error) {
    yield put(setPopularDestinationsStarted(false));
    yield put(setDestinationsError(error));
    yield call(errorHandler, error);
  }
}
function* getDestinationsSaga(action) {
  try {
    const {page, limit} = action.payload;
    yield put(setDestinationsIsLoading(true));
    const response = yield call(destinationAPI.getDestinations, page, limit);
    const destinations = response.data;
    yield put(setDestinations(destinations));
    yield put(setDestinationsIsLoading(false));
  } catch (error) {
    yield put(setDestinationsIsLoading(false));
    yield put(setDestinationsError(error));
    yield call(errorHandler, error, action);
  }
}

function* getDestinationsByNameSaga(action) {
  try {
    const {page, limit, term} = action.payload;
    yield put(setDestinationsIsLoading(true));
    const response = yield call(
      searchAPI.getDestinationsByName,
      page,
      limit,
      term,
    );
    const destinations = response.data;
    // yield put(getDestinationsByNameCompleted(destinations));
    yield put(setDestinations(destinations));
    yield put(setDestinationsIsLoading(false));
  } catch (error) {
    yield put(setDestinationsIsLoading(false));
    yield put(setDestinationsError(error));
    yield call(errorHandler, error, action);
  }
}

function* addDestinationSaga(action) {
  try {
    yield put(addDestinationStarted(true));
    const token = yield select(tokenSelector);
    const destinationData = action.payload;
    const response = yield call(
      destinationAPI.addDestination,
      token,
      destinationData,
    );
    const hotel = response.data;
    yield put(addDestinationCompleted(hotel));
    yield put(addDestinationStarted(false));
  } catch (error) {
    yield put(addDestinationStarted(false));
    yield put(setDestinationsError(error));
    yield call(errorHandler, error);
  }
}

function* updateDestinationSaga(action) {
  try {
    yield put(updateDestinationStarted(true));
    const token = yield select(tokenSelector);
    const destinationData = action.payload;
    const response = yield call(
      destinationAPI.updateDestination,
      token,
      destinationData,
    );

    const destination = response.data;
    yield put(updateDestinationCompleted(destination));
    yield put(updateDestinationStarted(false));
  } catch (error) {
    yield put(updateDestinationStarted(false));
    yield put(setDestinationsError(error));
    yield call(errorHandler, error);
  }
}

function* deleteDestinationSaga(action) {
  try {
    yield put(deleteDestinationStarted(true));
    const token = yield select(tokenSelector);
    const destinationID = action.payload;
    const response = yield call(
      destinationAPI.deleteDestination,
      token,
      destinationID,
    );
    const destination = response.data;
    yield put(deleteDestinationCompleted(destination._id));
    yield put(deleteDestinationStarted(false));
    RootNavigation.navigate('DestinationsCatalog');
  } catch (error) {
    yield put(deleteDestinationStarted(false));
    yield put(setDestinationsError(error));
    yield call(errorHandler, error);
  }
}
