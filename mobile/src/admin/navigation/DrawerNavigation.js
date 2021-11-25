import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DestinationsCatalog} from '../../screens/DestinationsCatalogScreen/DestinationsCatalog';
import {ProfileScreen} from '../../screens/ProfileScreen/ProfileScreen';
import {HotelsStackScreen} from './HotelsStackScreen';
import {AdventuresStackScreen} from './AdventuresStackScreen';
import {GuidesScreen} from '../screens/GuidesScreen/GuidesScreen';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Destinations">
      <Drawer.Screen name="Adventures" component={AdventuresStackScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Destinations" component={DestinationsCatalog} />
      <Drawer.Screen name="Hotels" component={HotelsStackScreen} />
      <Drawer.Screen name="Guides" component={GuidesScreen} />
    </Drawer.Navigator>
  );
};
