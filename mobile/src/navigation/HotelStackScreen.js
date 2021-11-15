import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ReviewsScreen} from '../screens/ReviewsScreen/ReviewsScreen';
import {HotelScreen} from '../screens/HotelScreen/HotelScreen';

const HotelStack = createNativeStackNavigator();

export function HotelStackScreen({route}) {
  const hotel = route.params.hotel;
  return (
    <HotelStack.Navigator initialRouteName="HotelScreen">
      <HotelStack.Screen
        options={{
          headerTitle: '',
          headerBackTitle: '',
          headerShown: false,
        }}
        name="HotelScreen">
        {() => <HotelScreen hotel={hotel} />}
      </HotelStack.Screen>
      <HotelStack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
        }}
        name="ReviewsScreen"
        component={ReviewsScreen}
      />
    </HotelStack.Navigator>
  );
}
