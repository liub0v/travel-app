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
import {FilterScreen} from '../screens/FilterScreen/FilterScreen';
import {Filter} from '../components/Filter/Filter';
import {useNavigation} from '@react-navigation/core';
import colors from '../constants/colors';
const ExploreStack = createNativeStackNavigator();

export function ExploreStackScreen() {
  const navigation = useNavigation();
  return (
    <ExploreStack.Navigator
      initialRouteName="Explore"
      screenOptions={{headerTintColor: colors.white, headerBackTitle: ''}}>
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
          headerRight: props => (
            <Filter
              handler={() => {
                navigation.navigate('FilterScreen');
              }}
            />
          ),
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
          headerBackTitle: '',
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
      <ExploreStack.Screen
        options={{
          headerTintColor: colors.white,
          headerTitle: 'Filter',
          headerBackTitle: '',
        }}
        name="FilterScreen"
        component={FilterScreen}
      />
    </ExploreStack.Navigator>
  );
}
