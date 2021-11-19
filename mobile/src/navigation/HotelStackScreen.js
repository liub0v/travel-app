import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ReviewsScreen} from '../screens/ReviewsScreen/ReviewsScreen';
import {HotelScreen} from '../screens/HotelScreen/HotelScreen';
import EditHotelScreen from '../admin/screens/Hotels/HotelEditScreen/EditHotelScreen';
import {EditGalleryScreen} from '../admin/screens/Hotels/HotelEditScreen/EditGalleryScreen';

const HotelStack = createNativeStackNavigator();

export function HotelStackScreen({route}) {
  const hotel = route.params.hotel;
  return (
    <HotelStack.Navigator initialRouteName="HotelScreen">
      <HotelStack.Screen
        options={{headerShown: false, headerTitle: ''}}
        name="HotelScreen">
        {() => <HotelScreen hotel={hotel} />}
      </HotelStack.Screen>
      <HotelStack.Screen
        options={{
          headerShown: false,
          headerTitle: '',
        }}
        name="ReviewsScreen"
        component={ReviewsScreen}
      />
      <HotelStack.Screen
        options={{
          headerShown: false,
          // headerTransparent: true,
          // headerShadowVisible: false,
          // headerBackTitle: '',
          // headerTitle: '',
        }}
        name="EditHotelScreen"
        component={EditHotelScreen}
      />
      <HotelStack.Screen
        options={{
          headerShown: false,
          // headerTransparent: true,
          // headerShadowVisible: false,
          // headerBackTitle: '',
          // headerTitle: '',
        }}
        name="EditGalleryScreen"
        component={EditGalleryScreen}
      />
    </HotelStack.Navigator>
  );
}
