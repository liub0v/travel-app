import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HotelStackScreen} from '../../navigation/HotelStackScreen';
import {AdventuresScreen} from '../screens/AdventuresScreen/AdventuresScreen';
const AdventuresStack = createNativeStackNavigator();

export function AdventuresStackScreen() {
  return (
    <AdventuresStack.Navigator initialRouteName="HotelsScreen">
      <AdventuresStack.Screen
        options={{
          headerTitle: '',
          headerBackTitle: '',
          headerShown: false,
        }}
        name="AdventuresScreen"
        component={AdventuresScreen}
      />
      {HotelStackScreen(AdventuresStack)}
    </AdventuresStack.Navigator>
  );
}
