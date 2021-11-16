import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AdventuresCatalog} from '../../screens/AdventuresCatalogScreen/AdventuresCatalog';
import {DestinationsCatalog} from '../../screens/DestinationsCatalogScreen/DestinationsCatalog';
import {HotelsCatalog} from '../../screens/HotelsCatalogScreen/HotelsCatalog';
import {HotelsCatalogByDestination} from '../../screens/HotelsCatalogByDestinations/HotelsCatalogByDestination';
import {useEffect} from 'react';
import {getPopularDestinations} from '../../../redux/actions/DestinationActions';
import {getPopularAdventures} from '../../../redux/actions/AdventureActions';
import {getPopularHotels} from '../../../redux/actions/HotelActions';
import {useDispatch} from 'react-redux';

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
      {/*<Drawer.Screen name="Adventures" component={AdventuresCatalog} />*/}
      <Drawer.Screen name="Destinations" component={DestinationsCatalog} />
      <Drawer.Screen name="Hotels" component={HotelsCatalogByDestination} />
    </Drawer.Navigator>
  );
};
