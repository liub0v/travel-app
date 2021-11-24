import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DestinationsCatalog} from '../../screens/DestinationsCatalogScreen/DestinationsCatalog';
import {useEffect} from 'react';
import {getPopularDestinations} from '../../../redux/actions/DestinationActions';
import {getPopularAdventures} from '../../../redux/actions/AdventureActions';
import {getPopularHotels} from '../../../redux/actions/HotelActions';
import {useDispatch} from 'react-redux';
import {ProfileScreen} from '../../screens/ProfileScreen/ProfileScreen';
import {HotelsStackScreen} from './HotelsStackScreen';
import {AdventuresStackScreen} from './AdventuresStackScreen';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularDestinations());
    dispatch(getPopularAdventures());
    dispatch(getPopularHotels());
  }, []);

  return (
    <Drawer.Navigator initialRouteName="Destinations">
      <Drawer.Screen name="Adventures" component={AdventuresStackScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Destinations" component={DestinationsCatalog} />
      <Drawer.Screen name="Hotels" component={HotelsStackScreen} />
    </Drawer.Navigator>
  );
};
