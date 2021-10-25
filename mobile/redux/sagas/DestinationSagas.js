import {call, put, takeEvery} from 'redux-saga/effects';
import {
  setDestinations,
  setDestinationsError,
  setDestinationsIsLoading,
  setHasMoreDestinations,
} from '../actions/DestinationActions';
import {destinationAPI} from '../../src/api/destinationAPI';
import {showMessage} from 'react-native-flash-message';
import {GET_DESTINATIONS} from '../types/DestinationTypes';
export const destinationSagas = [
  takeEvery(GET_DESTINATIONS, getDestinationsSaga),
];
function* getDestinationsSaga(action) {
  try {
    const {page, limit} = action.payload;
    console.log(page, limit);
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
      message: error.response?.data,
      type: 'error',
    });
  }
}
