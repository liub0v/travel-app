import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SavedScreen} from '../screens/SavedScreen/SavedScreen';
import {AdventureStackScreen} from './AdventureStackScreen';
import {HotelStackScreen} from './HotelStackScreen';
import colors from '../constants/colors';

const SavedStack = createNativeStackNavigator();

export function SavedStackScreen() {
  return (
    <SavedStack.Navigator
      screenOptions={{headerTintColor: colors.white, headerBackTitle: ''}}>
      <SavedStack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Saved',
        }}
        name="SavedScreen"
        component={SavedScreen}
      />

      {HotelStackScreen(SavedStack)}
      {AdventureStackScreen(SavedStack)}
    </SavedStack.Navigator>
  );
}
