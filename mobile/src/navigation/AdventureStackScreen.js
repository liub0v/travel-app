import React from 'react';
import {AdventureScreen} from '../screens/AdventureScreen/AdventureScreen';
import {ReviewsScreen} from '../screens/ReviewsScreen/ReviewsScreen';

export function AdventureStackScreen(Stack) {
  const screens = [{_id: 21}, {_id: 22}];
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
      key={screens[0]._id}
    />,
    <Stack.Screen
      options={{
        headerTitle: 'Reviews',
        headerBackTitle: '',
      }}
      name="ReviewsScreen"
      component={ReviewsScreen}
      key={screens[1]._id}
    />,
  ];
}
