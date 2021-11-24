import React from 'react';
import {AdventureScreen} from '../screens/AdventureScreen/AdventureScreen';
import {ReviewsScreen} from '../screens/ReviewsScreen/ReviewsScreen';

export function AdventureStackScreen(Stack) {
  return [
    <Stack.Screen
      options={{
        headerTransparent: true,
        headerShadowVisible: false,
        headerTitle: '',
        headerBackTitle: '',
      }}
      name="AdventureScreen"
      component={AdventureScreen}
    />,
    <Stack.Screen
      options={{
        headerTitle: 'Reviews',
        headerBackTitle: '',
      }}
      name="ReviewsScreen"
      component={ReviewsScreen}
    />,
  ];
}
