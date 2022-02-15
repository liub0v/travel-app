import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {reducers} from './reducers';
import {persistStore} from 'redux-persist';
import {sagaWatcher} from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware)),
);
export const persistor = persistStore(store);
sagaMiddleware.run(sagaWatcher);
