import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AdventuresScreen} from '../screens/AdventuresScreen/AdventuresScreen';
import {AdventureStackScreen} from '../../navigation/AdventureStackScreen';
import {EditAdventureScreen} from '../screens/EditAdventureScreen/EditAdventureScreen';
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
      <AdventuresStack.Screen
        options={{
          headerTitle: 'Edit information',
          headerBackTitle: '',
        }}
        name="EditAdventureScreen"
        component={EditAdventureScreen}
      />
      {AdventureStackScreen(AdventuresStack)}
    </AdventuresStack.Navigator>
  );
}
