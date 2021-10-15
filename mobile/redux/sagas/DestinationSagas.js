import {call, put, takeEvery} from 'redux-saga/effects';
import {
  setDestinations,
  setDestinationsError,
  setDestinationsIsLoading,
} from '../actions/DestinationActions';
import {destinationAPI} from '../../src/api/destinationAPI';
import {showMessage} from 'react-native-flash-message';
import {GET_DESTINATIONS} from '../types/DestinationTypes';
export const destinationSagas = [
  takeEvery(GET_DESTINATIONS, getDestinationsSaga),
];
function* getDestinationsSaga(action) {
  try {
    console.log('saga');
    yield put(setDestinationsIsLoading(true));
    const response = yield call(destinationAPI.getDestinations);
    const destinations = response.data;
    yield put(setDestinations(destinations));
    yield put(setDestinationsIsLoading(false));
  } catch (error) {
    yield put(setDestinationsError(error));
    yield call(showMessage, {
      message: error.response?.data,
      type: 'error',
    });
  }
}
