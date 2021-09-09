import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Onboarding} from './screens/Onboarding/Onboarding';
import {StartPage} from './screens/StartPage/StartPage';
import * as Font from 'expo-font';

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
      MontserratExtraBold: require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    });
    setFontsLoaded(true);
  }

  useEffect(() => loadFonts(), []);

  return (
    <SafeAreaView style={{backgroundColor: '#212530', flex: 1}}>
      <Onboarding />
      {/*<StartPage></StartPage>*/}
    </SafeAreaView>
  );
};

export default App;
