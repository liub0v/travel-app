import {call, put, select, takeEvery} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import {
  ADD_HOTEL,
  ADD_VISITED_HOTEL,
  DELETE_GALLERY_IMAGE,
  DELETE_HOTEL,
  DELETE_SAVED_HOTEL,
  DELETE_VISITED_HOTEL,
  FILTER_HOTELS,
  GET_HOTEL,
  GET_HOTELS,
  GET_HOTELS_BY_DESTINATION,
  GET_HOTELS_BY_TERM,
  GET_POPULAR_HOTELS,
  SAVE_HOTEL,
  UPDATE_HOTEL,
  UPDATE_HOTEL_GALLERY,
} from '../types/HotelTypes';
import {hotelAPI} from '../../src/api/hotelAPI';
import {
  addHotelCompleted,
  deleteGalleryImageCompleted,
  deleteHotelCompleted,
  deleteHotelStarted,
  filterHotelsStarted,
  getHotelCompleted,
  getHotelStarted,
  setHasMoreHotels,
  updateHotelCompleted,
  setHotels,
  setHotelsError,
  setHotelsIsLoading,
  setPopularHotels,
  setPopularHotelsStarted,
  updateHotelStarted,
  addHotelStarted,
  deleteGalleryImageStarted,
} from '../actions/HotelActions';
import * as RootNavigation from '../../src/navigation/RootNavigation';
import {tokenSelector} from '../selectors/UserSelector';
import {userAPI} from '../../src/api/userAPI';
import {
  addVisitedHotelCompleted,
  addVisitedHotelStarted,
  deleteSavedHotelCompleted,
  deleteVisitedHotelCompleted,
  deleteVisitedHotelStarted,
  likeHotelStarted,
  setSavedHotel,
} from '../actions/AuthActions';
import {searchAPI} from '../../src/api/searchAPI';
import {errorHandler} from './AdventureSagas';

export const hotelSagas = [
  takeEvery(GET_HOTELS_BY_DESTINATION, getHotelsByDestinationSaga),
  takeEvery(GET_HOTELS, getHotelsSaga),
  takeEvery(GET_POPULAR_HOTELS, getPopularHotelsSaga),
  takeEvery(SAVE_HOTEL, saveHotelSaga),
  takeEvery(DELETE_SAVED_HOTEL, deleteSavedHotelSaga),
  takeEvery(UPDATE_HOTEL, updateHotelSaga),
  takeEvery(UPDATE_HOTEL_GALLERY, updateHotelGallerySaga),
  takeEvery(DELETE_GALLERY_IMAGE, deleteGalleryImageSaga),
  takeEvery(ADD_HOTEL, addHotelSaga),
  takeEvery(DELETE_HOTEL, deleteHotelSaga),
  takeEvery(ADD_VISITED_HOTEL, addVisitedHotelSaga),
  takeEvery(DELETE_VISITED_HOTEL, deleteVisitedHotelSaga),
  takeEvery(FILTER_HOTELS, filterHotelsSaga),
  takeEvery(GET_HOTEL, getHotel),
  takeEvery(GET_HOTELS_BY_TERM, getHotelsByTermSaga),
];
function* getHotel(action) {
  try {
    const hotelID = action.payload;
    yield put(getHotelStarted(true));
    const response = yield call(hotelAPI.getHotelByID, hotelID);
    const hotel = response.data;
    yield put(getHotelCompleted(hotel));
    yield put(getHotelStarted(false));
  } catch (error) {
    yield put(getHotelStarted(false));
    yield put(setHotelsError(error));
    yield call(showMessage, {
      message: error.response?.data || error.message,
      type: 'error',
    });
  }
}

function* getHotelsByDestinationSaga(action) {
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
    yield call(errorHandler, error, action);
  }
}

function* getPopularHotelsSaga() {
  try {
    yield put(setPopularHotelsStarted(true));
    const response = yield call(hotelAPI.getPopularHotels, 1, 5);
    const hotels = response.data;
    yield put(setPopularHotels(hotels));
    yield put(setPopularHotelsStarted(false));
  } catch (error) {
    yield put(setPopularHotelsStarted(false));
    yield put(setHotelsError(error));
    yield call(errorHandler, error);
  }
}
function* getHotelsByTermSaga(action) {
  try {
    const {page, limit, term} = action.payload;
    yield put(setHotelsIsLoading(true));
    const response = yield call(hotelAPI.getHotelByTerm, page, limit, term);
    const hotels = response.data;
    yield put(setHotels(hotels));
    yield put(setHotelsIsLoading(false));
  } catch (error) {
    yield put(setHotelsIsLoading(false));
    yield put(setHotelsError(error));
    yield call(errorHandler, error, action);
  }
}
function* getHotelsSaga(action) {
  try {
    const {page, limit} = action.payload;
    yield put(setHotelsIsLoading(true));
    const response = yield call(hotelAPI.getHotels, page, limit);
    const hotels = response.data;
    !hotels.length && (yield put(setHasMoreHotels(false)));
    yield put(setHotels(hotels));
    yield put(setHotelsIsLoading(false));
  } catch (error) {
    yield put(setHotelsIsLoading(false));
    yield put(setHotelsError(error));
    yield call(errorHandler, error, action);
  }
}

function* filterHotelsSaga(action) {
  try {
    const {page, limit, filter} = action.payload;
    const {priceRange, hotelOptions} = filter;
    yield put(filterHotelsStarted(true));
    const response = yield call(
      searchAPI.getFilteredHotels,
      page,
      limit,
      priceRange,
      hotelOptions,
    );
    const hotels = response.data;
    !hotels.length && (yield put(setHasMoreHotels(false)));
    yield put(setHotels(hotels));
    yield put(filterHotelsStarted(false));
    RootNavigation.navigate('HotelsCatalog', {filter});
  } catch (error) {
    yield put(filterHotelsStarted(false));
    yield put(setHotelsError(error));
    yield call(errorHandler, error, action);
  }
}

function* updateHotelSaga(action) {
  try {
    yield put(updateHotelStarted(true));
    const token = yield select(tokenSelector);
    const hotelData = action.payload;
    const response = yield call(hotelAPI.updateHotel, token, hotelData);
    const hotel = response.data;
    yield put(updateHotelCompleted(hotel));
    yield put(updateHotelStarted(false));
  } catch (error) {
    yield put(updateHotelStarted(false));
    yield put(setHotelsError(error));
    yield call(errorHandler, error);
  }
}

function* addHotelSaga(action) {
  try {
    yield put(addHotelStarted(true));
    const token = yield select(tokenSelector);
    const hotelData = action.payload;
    const response = yield call(hotelAPI.addHotel, token, hotelData);
    const hotel = response.data;
    yield put(addHotelCompleted(hotel));
    yield put(addHotelStarted(false));
  } catch (error) {
    yield put(addHotelStarted(false));
    yield put(setHotelsError(error));
    yield call(errorHandler, error);
  }
}
function* deleteHotelSaga(action) {
  try {
    yield put(deleteHotelStarted(true));
    const token = yield select(tokenSelector);
    const hotelID = action.payload;
    const response = yield call(hotelAPI.deleteHotel, token, hotelID);
    const hotel = response.data;
    yield put(deleteHotelCompleted(hotel._id));
    yield put(deleteHotelStarted(false));
    RootNavigation.navigate('Hotels');
  } catch (error) {
    yield put(deleteHotelStarted(false));
    yield put(setHotelsError(error));
    yield call(errorHandler, error);
  }
}
function* updateHotelGallerySaga(action) {
  try {
    yield put(updateHotelStarted(true));
    const token = yield select(tokenSelector);
    const {hotelID, images} = action.payload;
    const response = yield call(hotelAPI.updateGallery, token, hotelID, images);
    const hotel = response.data;
    yield put(updateHotelCompleted(hotel));
    yield put(updateHotelStarted(false));
  } catch (error) {
    yield put(updateHotelStarted(false));
    yield put(setHotelsError(error));
    yield call(errorHandler, error);
  }
}
function* saveHotelSaga(action) {
  try {
    yield put(likeHotelStarted(true));
    const token = yield select(tokenSelector);
    const hotelID = action.payload;
    const response = yield call(userAPI.saveHotel, hotelID, token);
    const hotel = response.data;
    yield put(setSavedHotel(hotel));
    yield put(likeHotelStarted(false));
  } catch (error) {
    yield put(likeHotelStarted(false));
    yield put(setHotelsError(error));
    yield call(errorHandler, error);
  }
}
function* deleteSavedHotelSaga(action) {
  try {
    yield put(likeHotelStarted(true));
    const token = yield select(tokenSelector);
    const hotelID = action.payload;
    yield call(userAPI.deleteSavedHotel, token, hotelID);
    yield put(deleteSavedHotelCompleted(hotelID));
    yield put(likeHotelStarted(false));
  } catch (error) {
    yield put(likeHotelStarted(false));
    yield put(setHotelsError(error));
    yield call(errorHandler, error);
  }
}
function* deleteGalleryImageSaga(action) {
  try {
    yield put(deleteGalleryImageStarted(true));
    const token = yield select(tokenSelector);
    const {hotelID, imageURL} = action.payload;
    yield call(hotelAPI.deleteGalleryImage, token, hotelID, imageURL);
    yield put(deleteGalleryImageCompleted({hotelID, imageURL}));
    yield put(deleteGalleryImageStarted(false));
  } catch (error) {
    yield put(deleteGalleryImageStarted(false));
    yield put(setHotelsError(error));
    yield call(errorHandler, error);
  }
}

function* addVisitedHotelSaga(action) {
  try {
    yield put(addVisitedHotelStarted(true));
    const token = yield select(tokenSelector);
    const hotelID = action.payload;
    const response = yield call(userAPI.addVisitedHotel, token, hotelID);
    const hotel = response.data;
    yield put(addVisitedHotelCompleted(hotel));
    yield put(addVisitedHotelStarted(false));
  } catch (error) {
    yield put(addVisitedHotelStarted(false));
    yield put(setHotelsError(error));
    yield call(errorHandler, error);
  }
}
function* deleteVisitedHotelSaga(action) {
  try {
    yield put(deleteVisitedHotelStarted(true));
    const token = yield select(tokenSelector);
    const hotelID = action.payload;
    yield call(userAPI.deleteVisitedHotel, token, hotelID);
    yield put(deleteVisitedHotelCompleted(hotelID));
    yield put(deleteVisitedHotelStarted(false));
  } catch (error) {
    yield put(deleteVisitedHotelStarted(false));
    yield put(setHotelsError(error));
    yield call(errorHandler, error);
  }
}
