import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SavedScreen} from '../screens/SavedScreen/SavedScreen';
import {AdventureStackScreen} from './AdventureStackScreen';
import colors from '../constants/colors';
import {HotelScreen} from '../screens/HotelScreen/HotelScreen';
import EditHotelScreen from '../admin/screens/EditHotelScreen/EditHotelScreen';
import {EditGalleryScreen} from '../admin/screens/EditGalleryScreen/EditGalleryScreen';
import {HotelGalleryScreen} from '../screens/HotelGalleryScreen/HotelGalleryScreen';
import {ErrorScreen} from '../screens/ErrorScreen/ErrorScreen';

const SavedStack = createNativeStackNavigator();

export function SavedStackScreen() {
  return (
    <SavedStack.Navigator
      backBehavior={'history'}
      screenOptions={{headerTintColor: colors.white, headerBackTitle: ''}}>
      <SavedStack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Saved',
        }}
        name="SavedScreen"
        component={SavedScreen}
      />
      <SavedStack.Screen
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerTitle: '',
        }}
        name="HotelScreen"
        component={HotelScreen}
      />

      <SavedStack.Screen
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerBackTitle: '',
          headerTitle: '',
        }}
        name="EditHotelScreen"
        component={EditHotelScreen}
      />

      <SavedStack.Screen
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerBackTitle: '',
          headerTitle: '',
        }}
        name="EditGalleryScreen"
        component={EditGalleryScreen}
      />

      <SavedStack.Screen
        options={{
          headerBackTitle: '',
          headerTitle: 'Gallery',
        }}
        name="HotelGalleryScreen"
        component={HotelGalleryScreen}
      />
      <SavedStack.Screen
        options={{
          headerShown: false,
        }}
        name="ErrorScreen"
        component={ErrorScreen}
      />
      {AdventureStackScreen(SavedStack)}
    </SavedStack.Navigator>
  );
}
