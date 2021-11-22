import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HotelsScreen} from '../screens/HotelsScreen';
import {HotelStackScreen} from '../../navigation/HotelStackScreen';

const HotelsStack = createNativeStackNavigator();

export function HotelsStackScreen() {
  return (
    <HotelsStack.Navigator initialRouteName="HotelsScreen">
      <HotelsStack.Screen
        options={{
          headerTitle: '',
          headerBackTitle: '',
        }}
        name="HotelsScreen"
        component={HotelsScreen}
      />
      {HotelStackScreen(HotelsStack)}
    </HotelsStack.Navigator>
  );
}
