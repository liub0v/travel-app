import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HotelsStackScreen} from './HotelsStackScreen';
import {AdventuresStackScreen} from './AdventuresStackScreen';
import {useSelector} from 'react-redux';
import {
  profileInfoSelector,
  userInfoSelector,
} from '../../../redux/selectors/UserSelector';
import {GuidesStackScreen} from './GuidesStackScreen';
import {ProfileScreen} from '../../screens/ProfileScreen/ProfileScreen';
import {DestinationStackScreen} from './DestinationStackScreen';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  const profileInfo = useSelector(profileInfoSelector);
  const userInfo = useSelector(userInfoSelector);

  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      backBehavior="history"
      screenOptions={{
        drawerActiveTintColor: colors.green,
        drawerActiveBackgroundColor: colors.screenBackground,
        drawerInactiveTintColor: colors.white,
        drawerLabelStyle: {
          fontFamily: fonts.normal,
          fontSize: 16,
        },
        drawerItemStyle: {
          marginTop: 12,
          marginLeft: 12,
          borderBottomWidth: 0.5,
          borderBottomColor: colors.grey,
        },
      }}>
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{profileInfo, userInfo}}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="Destinations"
        component={DestinationStackScreen}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="Adventures"
        component={AdventuresStackScreen}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="Hotels"
        component={HotelsStackScreen}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="Guides"
        component={GuidesStackScreen}
      />
    </Drawer.Navigator>
  );
};
