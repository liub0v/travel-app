import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ExploreScreen} from '../screens/ExploreScreen/ExploreScreen';
import {DestinationsCatalog} from '../screens/DestinationsCatalogScreen/DestinationsCatalog';
import {AdventuresCatalog} from '../screens/AdventuresCatalogScreen/AdventuresCatalog';
import React from 'react';
import {HotelsCatalogByDestination} from '../screens/HotelsCatalogByDestinations/HotelsCatalogByDestination';
import {HotelsCatalog} from '../screens/HotelsCatalogScreen/HotelsCatalog';
import {AdventureStackScreen} from './AdventureStackScreen';
import {HotelStackScreen} from './HotelStackScreen';
import {GuideScreen} from '../screens/GuideScreen/GuideScreen';

const ExploreStack = createNativeStackNavigator();

export function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator initialRouteName="Explore">
      <ExploreStack.Screen
        options={{
          headerShown: false,
        }}
        name="Explore"
        component={ExploreScreen}
      />
      <ExploreStack.Screen
        options={{
          headerTitle: 'Adventures',
        }}
        name="DestinationsCatalog"
        component={DestinationsCatalog}
      />
      <ExploreStack.Screen
        options={{
          headerTitle: 'Trips',
        }}
        name="HotelsCatalogByDestination"
        component={HotelsCatalogByDestination}
      />
      <ExploreStack.Screen
        options={{
          headerTitle: 'Adventures',
        }}
        name="AdventuresCatalog"
        component={AdventuresCatalog}
      />
      <ExploreStack.Screen
        options={{
          headerTitle: 'Hotels',
        }}
        name="HotelsCatalog"
        component={HotelsCatalog}
      />
      <ExploreStack.Screen
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerTitle: '',
          headerBackTitle: '',
        }}
        name="AdventureScreen"
        component={AdventureStackScreen}
      />
      <ExploreStack.Screen
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerBackTitle: '',
          headerTitle: '',
        }}
        name="HotelScreen"
        component={HotelStackScreen}
      />
      <ExploreStack.Screen
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerBackTitle: '',
          headerTitle: '',
        }}
        name="GuideScreen"
        component={GuideScreen}
      />
    </ExploreStack.Navigator>
  );
}
