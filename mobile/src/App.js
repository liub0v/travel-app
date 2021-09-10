import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Onboarding} from './screens/Onboarding/Onboarding';
import {StartScreen} from './screens/StartPage/StartScreen';
import * as Font from 'expo-font';
import {LoginNavigation} from './navigation/LoginNavigation';
import {NavigationContainer} from '@react-navigation/native';

const DefaultTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: '212530',
    card: '212530',
    text: 'rgb(255,255,255)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
      MontserratExtraBold: require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    });
    setFontsLoaded(true);
  }

  useEffect(() => {
    loadFonts();
    return null; // ?
  }, []);

  return (
    <NavigationContainer theme={DefaultTheme}>
      <SafeAreaView style={{backgroundColor: '#212530', flex: 1}}>
        <LoginNavigation />

        {/*<StartPage></StartPage>*/}
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
