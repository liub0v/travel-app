import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import * as Font from 'expo-font';
import {LoginNavigation} from './navigation/LoginNavigation';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {applyMiddleware, compose, createStore} from 'redux';
import {reducers} from '../redux/reducers';
import createSagaMiddleware from 'redux-saga';
import {sagaWatcher} from '../redux/sagas';
import {Provider} from 'react-redux';
import * as NavigationService from './navigation/AuthNavigationService';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';

console.reportErrorsAsExceptions = false;

const DefaultTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: '#212530',
    card: '#212530',
    text: 'rgb(255,255,255)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
// const store = createStore(reducers, applyMiddleware(sagaMiddleware));
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
    NavigationService.setNavigator(navigator);
    loadFonts();
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          theme={DefaultTheme}
          ref={nav => {
            navigator = nav;
          }}>
          <SafeAreaView style={{backgroundColor: '#212530', flex: 1}}>
            <LoginNavigation />
          </SafeAreaView>
        </NavigationContainer>
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  );
};

export default App;
