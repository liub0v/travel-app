import {call, put, takeEvery} from 'redux-saga/effects';
import {
  getDestinationsByNameCompleted,
  setDestinations,
  setDestinationsError,
  setDestinationsIsLoading,
  setHasMoreDestinations,
  setPopularDestinations,
  setPopularDestinationsStarted,
} from '../actions/DestinationActions';
import {destinationAPI} from '../../src/api/destinationAPI';
import {showMessage} from 'react-native-flash-message';
import {
  GET_DESTINATIONS,
  GET_DESTINATIONS_BY_NAME,
  GET_POPULAR_DESTINATIONS,
} from '../types/DestinationTypes';
import {searchAPI} from '../../src/api/searchAPI';
export const destinationSagas = [
  takeEvery(GET_DESTINATIONS, getDestinationsSaga),
  takeEvery(GET_POPULAR_DESTINATIONS, getPopularDestinationsSaga),
  takeEvery(GET_DESTINATIONS_BY_NAME, getDestinationsByNameSaga),
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
    yield call(showMessage, {
      message: error.response?.data || error.message,
      type: 'error',
    });
  }
}
function* getDestinationsSaga(action) {
  try {
    const {page, limit} = action.payload;
    yield put(setDestinationsIsLoading(true));
    const response = yield call(destinationAPI.getDestinations, page, limit);
    const destinations = response.data;
    yield put(setDestinations(destinations));
    !destinations.length && (yield put(setHasMoreDestinations(false)));
    yield put(setDestinationsIsLoading(false));
  } catch (error) {
    yield put(setDestinationsIsLoading(false));
    yield put(setDestinationsError(error));
    yield call(showMessage, {
      message: error.response?.data || error.message,
      type: 'error',
    });
  }
}

function* getDestinationsByNameSaga(action) {
  try {
    const {page, limit, countryName} = action.payload;
    yield put(setDestinationsIsLoading(true));
    const response = yield call(
      searchAPI.getDestinationsByName,
      page,
      limit,
      countryName,
    );
    const destinations = response.data;
    yield put(getDestinationsByNameCompleted(destinations));
    yield put(setDestinationsIsLoading(false));
  } catch (error) {
    yield put(setDestinationsIsLoading(false));
    yield put(setDestinationsError(error));
    yield call(showMessage, {
      message: error.response?.data || error.message,
      type: 'error',
    });
  }
}
