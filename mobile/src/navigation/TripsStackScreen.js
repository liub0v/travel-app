import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AdventureStackScreen} from './AdventureStackScreen';
import {HotelStackScreen} from './HotelStackScreen';
import {TripsScreen} from '../screens/TripsScreen/TripsScreen';

const TripsStack = createNativeStackNavigator();

export function TripsStackScreen() {
  return (
    <TripsStack.Navigator>
      <TripsStack.Screen
        options={{
          headerShown: true,
        }}
        name="Saved"
        component={TripsScreen}
      />

      {HotelStackScreen(TripsStack)}
      {AdventureStackScreen(TripsStack)}
    </TripsStack.Navigator>
  );
}
