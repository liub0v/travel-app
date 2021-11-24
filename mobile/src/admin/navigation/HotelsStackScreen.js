import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HotelsScreen} from '../screens/HotelsListScreen/HotelsScreen';
import {HotelStackScreen} from '../../navigation/HotelStackScreen';
import {AddHotelScreen} from '../screens/AddHotelScreen/AddHotelScreen';
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
          headerTitle: '',
          headerBackTitle: '',
        }}
        name="AddHotelScreen"
        component={AddHotelScreen}
      />

      {HotelStackScreen(HotelsStack)}
    </HotelsStack.Navigator>
  );
}
