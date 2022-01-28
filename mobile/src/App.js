import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';

import {ApolloProvider} from '@apollo/client';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '../redux/store';

import {Navigation} from './navigation/Navigation';
import {loadFonts} from './constants/fonts';

console.reportErrorsAsExceptions = false;

import {YellowBox} from 'react-native';
import {client} from './graphql/Client';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);
console.disableYellowBox = true;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const bootstrapApp = async () => {
      await loadFonts();
      SplashScreen.hide();
      setIsLoading(false);
    };

    bootstrapApp();
  }, []);
  if (isLoading) return null;
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
          <FlashMessage position="top" />
        </PersistGate>
      </ApolloProvider>
    </Provider>
  );
};

export default App;
