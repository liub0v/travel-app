import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SavedScreen} from '../screens/SavedScreen/SavedScreen';
import {AdventureStackScreen} from './AdventureStackScreen';
import {HotelStackScreen} from './HotelStackScreen';

const SavedStack = createNativeStackNavigator();

export function SavedStackScreen() {
  return (
    <SavedStack.Navigator>
      <SavedStack.Screen
        options={{
          headerShown: true,
        }}
        name="Saved"
        component={SavedScreen}
      />

      {HotelStackScreen(SavedStack)}
      {AdventureStackScreen(SavedStack)}
    </SavedStack.Navigator>
  );
}
