import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Like} from '../components/Like/Like';
import {AdventureScreen} from '../screens/AdventureScreen/AdventureScreen';
import {HotelScreen} from '../screens/HotelScreen/HotelScreen';
import React from 'react';
import {SavedScreen} from '../screens/SavedScreen/SavedScreen';

const SavedStack = createNativeStackNavigator();

export function SavedStackScreen() {
  const setLikeOnAdventure = () => {};
  return (
    <SavedStack.Navigator>
      <SavedStack.Screen
        options={{
          headerShown: false,
        }}
        name="Saved"
        component={SavedScreen}
      />
      <SavedStack.Screen
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerTitle: '',
          headerRight: () => <Like handler={setLikeOnAdventure} />,
        }}
        name="AdventureScreen"
        component={AdventureScreen}
      />
      <SavedStack.Screen
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerBackTitle: '',
          headerTitle: '',
        }}
        name="HotelScreen"
        component={HotelScreen}
      />
    </SavedStack.Navigator>
  );
}
