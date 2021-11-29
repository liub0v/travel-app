import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DestinationsCatalog} from '../../screens/DestinationsCatalogScreen/DestinationsCatalog';
import {HotelsStackScreen} from './HotelsStackScreen';
import {AdventuresStackScreen} from './AdventuresStackScreen';
import {useSelector} from 'react-redux';
import {
  profileInfoSelector,
  userInfoSelector,
  userSelector,
} from '../../../redux/selectors/UserSelector';
import {GuidesStackScreen} from './GuidesStackScreen';
import {ProfileStackScreen} from '../../navigation/ProfileStackScreen';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  const user = useSelector(userSelector);
  const profileInfo = useSelector(profileInfoSelector);
  const userInfo = useSelector(userInfoSelector);
  return (
    <Drawer.Navigator initialRouteName="Destinations">
      <Drawer.Screen name="Adventures" component={AdventuresStackScreen} />
      <Drawer.Screen
        name="Profile"
        component={ProfileStackScreen}
        initialParams={{profileInfo, userInfo}}
      />
      <Drawer.Screen name="Destinations" component={DestinationsCatalog} />
      <Drawer.Screen name="Hotels" component={HotelsStackScreen} />
      <Drawer.Screen name="Guides" component={GuidesStackScreen} />
    </Drawer.Navigator>
  );
};
