import React, {useEffect, useState} from 'react';
import * as Font from 'expo-font';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '../redux/store';

import {Navigation} from './navigation/Navigation';

console.reportErrorsAsExceptions = false;

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
