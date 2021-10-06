import React, {useEffect, useState} from 'react';
import * as Font from 'expo-font';
import SplashScreen from 'react-native-splash-screen';
import {applyMiddleware, compose, createStore} from 'redux';
import {reducers} from '../redux/reducers';
import createSagaMiddleware from 'redux-saga';
import {sagaWatcher} from '../redux/sagas';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import {Navigation} from './navigation/Navigation';
console.reportErrorsAsExceptions = false;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware)),
);
const persistor = persistStore(store);
sagaMiddleware.run(sagaWatcher);

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  async function loadFonts() {
    const fonts = await Font.loadAsync({
      Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
      MontserratExtraBold: require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    });
    setFontsLoaded(true);
  }

  useEffect(() => {
    // NavigationService.setNavigator(navigator);
    loadFonts();
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  );
};

export default App;
