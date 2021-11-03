import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {useSelector} from 'react-redux';
import {tokenSelector} from '../../redux/selectors/UserSelector';

import colors from '../constants/colors';

import {TabNavigation} from './TabNavigation';
import {LoginNavigation} from './LoginNavigation';

const DefaultTheme = {
  dark: false,
  colors: {
    background: colors.screenBackground,
    card: colors.screenBackground,
    text: colors.white,
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
      <SafeAreaView style={{backgroundColor: colors.screenBackground, flex: 1}}>
        {token ? <TabNavigation /> : <LoginNavigation />}
      </SafeAreaView>
    </NavigationContainer>
  );
};
