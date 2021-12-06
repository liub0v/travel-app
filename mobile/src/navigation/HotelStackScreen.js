import React from 'react';
import {HotelScreen} from '../screens/HotelScreen/HotelScreen';
import EditHotelScreen from '../admin/screens/EditHotelScreen/EditHotelScreen';
import {EditGalleryScreen} from '../admin/screens/EditGalleryScreen/EditGalleryScreen';
import {HotelGalleryScreen} from '../screens/HotelGalleryScreen/HotelGalleryScreen';

export function HotelStackScreen(Stack) {
  const screens = [{_id: 11}, {_id: 12}, {_id: 13}, {_id: 14}, {_id: 15}];
  return [
    <Stack.Screen
      options={{
        headerTransparent: true,
        headerShadowVisible: false,
        headerTitle: '',
      }}
      name="HotelScreen"
      component={HotelScreen}
      key={screens[0]._id}
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
      key={screens[1]._id}
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
      key={screens[2]._id}
    />,
    <Stack.Screen
      options={{
        headerBackTitle: '',
        headerTitle: 'Gallery',
      }}
      name="HotelGalleryScreen"
      component={HotelGalleryScreen}
      key={screens[3]._id}
    />,
  ];
}
