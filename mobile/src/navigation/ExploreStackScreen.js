import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ExploreScreen} from '../screens/ExploreScreen/ExploreScreen';
import {DestinationsCatalog} from '../screens/DestinationsCatalogScreen/DestinationsCatalog';
import {AdventuresCatalog} from '../screens/AdventuresCatalogScreen/AdventuresCatalog';
import {Like} from '../components/Like/Like';
import {AdventureScreen} from '../screens/AdventureScreen/AdventureScreen';
import React from 'react';
import {HotelsCatalogByDestination} from '../screens/HotelsCatalogByDestinations/HotelsCatalogByDestination';
import {HotelsCatalog} from '../screens/HotelsCatalogScreen/HotelsCatalog';
import {HotelScreen} from '../screens/HotelScreen/HotelScreen';

const ExploreStack = createNativeStackNavigator();

export function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator>
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
        name="AdventuresCatalog"
        component={AdventuresCatalog}
      />
      <ExploreStack.Screen name="HotelsCatalog" component={HotelsCatalog} />
      <ExploreStack.Screen
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerTitle: '',
          headerRight: () => <Like />,
        }}
        name="AdventureScreen"
        component={AdventureScreen}
      />
      <ExploreStack.Screen
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerTitle: '',
          headerRight: () => <Like />,
        }}
        name="HotelScreen"
        component={HotelScreen}
      />
    </ExploreStack.Navigator>
  );
}
