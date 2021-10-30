import {call, put, takeEvery} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import {GET_HOTELS, GET_POPULAR_HOTELS} from '../types/HotelTypes';
import {hotelAPI} from '../../src/api/hotelAPI';
import {
  setHasMoreHotels,
  setHotels,
  setHotelsError,
  setHotelsIsLoading,
  setPopularHotels,
} from '../actions/HotelActions';

export const hotelSagas = [
  takeEvery(GET_HOTELS, getHotelsSaga),
  takeEvery(GET_POPULAR_HOTELS, getPopularHotelsSaga),
];
function* getHotelsSaga(action) {
  try {
    const {page, limit, destination} = action.payload;
    yield put(setHotelsIsLoading(true));
    const response = yield call(
      hotelAPI.getHotelsByDestination,
      page,
      limit,
      destination,
    );
    const hotels = response.data;
    !hotels.length && (yield put(setHasMoreHotels(false)));
    yield put(setHotels(hotels));
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
function* getPopularHotelsSaga(action) {
  try {
    // yield put(setHotelsIsLoading(true));
    const response = yield call(hotelAPI.getPopularHotels, 1, 5);
    const hotels = response.data;
    console.log(hotels);
    yield put(setPopularHotels(hotels));
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
