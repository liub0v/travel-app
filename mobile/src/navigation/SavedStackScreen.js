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
      <SavedStack.Screen
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerTitle: '',
        }}
        name="AdventureScreen"
        component={AdventureStackScreen}
      />
      <SavedStack.Screen
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerBackTitle: '',
          headerTitle: '',
        }}
        name="HotelScreen"
        component={HotelStackScreen}
      />
    </SavedStack.Navigator>
  );
}
