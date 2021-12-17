import {take, put, call, fork, takeEvery} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import io from 'socket.io-client';
import {addAdventureReview} from '../actions/AdventureActions';
import {GET_ADVENTURE_REVIEW} from '../types/AdventureTypes';
import {addHotelReview} from '../actions/HotelActions';

export const commentsSagas = [takeEvery(GET_ADVENTURE_REVIEW, flow)];
function connect() {
  const socket = io('http://192.168.43.50:3000/');
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);

    yield put(action);
  }
}

export function* subscribe(socket) {
  return new eventChannel(emit => {
    socket.on('review', ({review, adventureID, rating}) => {
      console.log('review log');
      emit(addAdventureReview({review, adventureID, rating}));
    });

    socket.on('comment', ({review, rating, hotelID}) => {
      emit(addHotelReview({review, rating, hotelID}));
    });
    return () => {
      socket.close();
    };
  });
}

export function* flow() {
  const socket = yield call(connect);
  yield fork(read, socket);
}
