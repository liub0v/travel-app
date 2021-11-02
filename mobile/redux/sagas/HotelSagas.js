import {call, put, select, takeEvery} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import {
  DELETE_SAVED_HOTEL,
  GET_HOTELS,
  GET_POPULAR_HOTELS,
  SAVE_HOTEL,
} from '../types/HotelTypes';
import {hotelAPI} from '../../src/api/hotelAPI';
import {
  removeSavedHotel,
  setHasMoreHotels,
  setHotels,
  setHotelsError,
  setHotelsIsLoading,
  setPopularHotels,
} from '../actions/HotelActions';
import {tokenSelector} from '../selectors/UserSelector';
import {userAPI} from '../../src/api/userAPI';
import {setSavedHotel} from '../actions/AuthActions';

export const hotelSagas = [
  takeEvery(GET_HOTELS, getHotelsSaga),
  takeEvery(GET_POPULAR_HOTELS, getPopularHotelsSaga),
  takeEvery(SAVE_HOTEL, saveHotelSaga),
  takeEvery(DELETE_SAVED_HOTEL, deleteSavedHotelSaga),
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
function* saveHotelSaga(action) {
  try {
    // yield put(setHotelsIsLoading(true));
    const token = yield select(tokenSelector);
    const hotelID = action.payload;
    const response = yield call(userAPI.saveHotel, hotelID, token);
    const hotel = response.data;
    yield put(setSavedHotel(hotel));
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
function* deleteSavedHotelSaga(action) {
  try {
    // yield put(setHotelsIsLoading(true));
    const token = yield select(tokenSelector);
    const hotelID = action.payload;
    const response = yield call(userAPI.deleteSavedHotel, hotelID, token);
    yield put(removeSavedHotel(hotelID));
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
