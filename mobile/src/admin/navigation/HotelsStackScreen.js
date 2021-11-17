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
          headerShown: false,
        }}
        name="HotelsScreen"
        component={HotelsScreen}
      />
      <HotelsStack.Screen
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerBackTitle: '',
          headerTitle: '',
        }}
        name="HotelScreen"
        component={HotelStackScreen}
      />
    </HotelsStack.Navigator>
  );
}
