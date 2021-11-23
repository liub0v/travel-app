import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {useSelector} from 'react-redux';
import {roleSelector, tokenSelector} from '../../redux/selectors/UserSelector';

import colors from '../constants/colors';

import {TabNavigation} from './TabNavigation';
import {LoginNavigation} from './LoginNavigation';
import {DrawerNavigation} from '../admin/navigation/DrawerNavigation';
import {navigationRef} from './RootNavigation';

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
  const role = useSelector(roleSelector);
  return (
    <NavigationContainer theme={DefaultTheme} ref={navigationRef}>
      <SafeAreaView style={{backgroundColor: colors.screenBackground, flex: 1}}>
        {token ? (
          role === 'admin' ? (
            <DrawerNavigation />
          ) : (
            <TabNavigation />
          )
        ) : (
          <LoginNavigation />
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
};
