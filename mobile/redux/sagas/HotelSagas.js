import {call, put, takeEvery} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import {GET_HOTELS} from '../types/HotelTypes';
import {hotelAPI} from '../../src/api/hotelAPI';
import {
  setHotels,
  setHotelsError,
  setHotelsIsLoading,
} from '../actions/HotelActions';

export const hotelSagas = [takeEvery(GET_HOTELS, getHotelsSaga)];
function* getHotelsSaga(action) {
  try {
    yield put(setHotelsIsLoading(true));
    const response = yield call(hotelAPI.getHotels);
    const destinations = response.data;
    yield put(setHotels(destinations));
    yield put(setHotelsIsLoading(false));
  } catch (error) {
    yield put(setHotelsIsLoading(false));
    yield put(setHotelsError(error));
    yield call(showMessage, {
      message: error.response?.data,
      type: 'error',
    });
  }
}
