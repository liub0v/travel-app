import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '../redux/store';

import {Navigation} from './navigation/Navigation';
import {loadFonts} from './constants/fonts';

console.reportErrorsAsExceptions = false;

import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  useEffect(async () => {
    const bootstrapApp = async () => {
      await loadFonts();
      SplashScreen.hide();
    };

    bootstrapApp();
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
