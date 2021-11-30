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
import {GuidesCatalogScreen} from '../screens/GuidesCatalogScreen/GuidesCatalogScreen';

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
      {HotelStackScreen(ExploreStack)}
      {AdventureStackScreen(ExploreStack)}
      <ExploreStack.Screen
        options={{
          headerBackTitle: '',
          headerTitle: '',
        }}
        name="GuideScreen"
        component={GuideScreen}
      />
      <ExploreStack.Screen
        options={{
          headerTitle: 'Guides',
        }}
        name="GuidesCatalogScreen"
        component={GuidesCatalogScreen}
      />
    </ExploreStack.Navigator>
  );
}
