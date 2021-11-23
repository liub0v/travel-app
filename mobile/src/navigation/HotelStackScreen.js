import React from 'react';
import {ReviewsScreen} from '../screens/ReviewsScreen/ReviewsScreen';
import {HotelScreen} from '../screens/HotelScreen/HotelScreen';
import EditHotelScreen from '../admin/screens/Hotels/HotelEditScreen/EditHotelScreen';
import {EditGalleryScreen} from '../admin/screens/Hotels/HotelEditScreen/EditGalleryScreen';
import {HotelGalleryScreen} from '../screens/HotelGalleryScreen/HotelGalleryScreen';

export function HotelStackScreen(Stack) {
  return [
    <Stack.Screen
      options={{
        headerTransparent: true,
        headerShadowVisible: false,
        headerTitle: '',
      }}
      name="HotelScreen"
      component={HotelScreen}
    />,
    <Stack.Screen
      options={{
        // headerShown: false,
        headerTitle: 'Reviews',
        headerBackTitle: '',
      }}
      name="ReviewsScreen"
      component={ReviewsScreen}
    />,
    <Stack.Screen
      options={{
        // headerShown: false,
        headerTransparent: true,
        headerShadowVisible: false,
        headerBackTitle: '',
        headerTitle: '',
      }}
      name="EditHotelScreen"
      component={EditHotelScreen}
    />,
    <Stack.Screen
      options={{
        // headerShown: false,
        headerTransparent: true,
        headerShadowVisible: false,
        headerBackTitle: '',
        headerTitle: '',
      }}
      name="EditGalleryScreen"
      component={EditGalleryScreen}
    />,
    <Stack.Screen
      options={{
        // headerShown: false,
        headerBackTitle: '',
        headerTitle: 'Gallery',
      }}
      name="HotelGalleryScreen"
      component={HotelGalleryScreen}
    />,
  ];
}
