import React from 'react';
import {HotelScreen} from '../screens/HotelScreen/HotelScreen';
import EditHotelScreen from '../admin/screens/EditHotelScreen/EditHotelScreen';
import {EditGalleryScreen} from '../admin/screens/EditGalleryScreen/EditGalleryScreen';
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
        headerBackTitle: '',
        headerTitle: 'Gallery',
      }}
      name="HotelGalleryScreen"
      component={HotelGalleryScreen}
    />,
  ];
}
