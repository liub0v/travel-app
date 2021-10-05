import {SafeAreaView} from 'react-native';
import {TabNavigation} from './TabNavigation';
import {LoginNavigation} from './LoginNavigation';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import {tokenSelector} from '../../redux/selectors/userSelector';

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
export const Navigation = () => {
  const token = useSelector(tokenSelector);
  return (
    <NavigationContainer
      theme={DefaultTheme}
      ref={nav => {
        navigator = nav;
      }}>
      <SafeAreaView style={{backgroundColor: '#212530', flex: 1}}>
        {token ? <TabNavigation /> : <LoginNavigation />}
      </SafeAreaView>
    </NavigationContainer>
  );
};
