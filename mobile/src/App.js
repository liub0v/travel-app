/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type, {Node} from 'react';
import {
  SafeAreaView,
  useColorScheme,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Onboarding} from './screens/Onboarding/Onboarding';
import {useFonts} from 'expo-font';
import * as Font from 'expo-font';
const App = () => {

  const [fontsLoaded, setFontsLoaded] = useState(false)

  async function loadFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
      MontserratExtraBold: require('../assets/fonts/Montserrat-ExtraBold.ttf'),

      // // Any string can be used as the fontFamily name. Here we use an object to provide more control
      // 'Montserrat-SemiBold': {
      //   uri: require('./assets/fonts/Montserrat-SemiBold.ttf'),
      //   display: Font.FontDisplay.FALLBACK,
      // },
    });
    setFontsLoaded(true)
  }
  useEffect(()=>loadFonts(),[])
  return (
    <SafeAreaView style={{backgroundColor: '#212530', flex: 1}}>
      <Onboarding />
    </SafeAreaView>
  );
};


export default App;
