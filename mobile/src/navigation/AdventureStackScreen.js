import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DestinationsCatalog} from '../screens/DestinationsCatalogScreen/DestinationsCatalog';
import React from 'react';
import {AdventureScreen} from '../screens/AdventureScreen/AdventureScreen';
import {ReviewsScreen} from '../screens/ReviewsScreen/ReviewsScreen';

const AdventureStack = createNativeStackNavigator();

export function AdventureStackScreen({route}) {
  const adventure = route.params.adventure;
  return (
    <AdventureStack.Navigator initialRouteName="AdventureScreen">
      <AdventureStack.Screen
        options={{
          headerTitle: '',
          headerBackTitle: '',
          headerShown: false,
        }}
        name="AdventureScreen">
        {() => <AdventureScreen adventure={adventure} />}
      </AdventureStack.Screen>
      <AdventureStack.Screen
        options={{
          headerShown: false,
          // headerTitle: 'Adventures',
        }}
        name="ReviewsScreen"
        component={ReviewsScreen}
      />
    </AdventureStack.Navigator>
  );
}
