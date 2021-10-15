import React, {useEffect} from 'react';
import {View, Image, TouchableWithoutFeedback} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ExploreScreen} from '../screens/ExploreScreen/ExploreScreen';
import {InboxScreen} from '../screens/InboxScreen/InboxScreen';
import {TripsScreen} from '../screens/TripsScreen/TripsScreen';
import {ProfileScreen} from '../screens/ProfileScreen/ProfileScreen';
import {SavedScreen} from '../screens/SavedScreen/SavedScreen';
import {useNavigation} from '@react-navigation/native';
import exploreIcon from '../../assets/images/exploreIcon.png';
import exploreActiveIcon from '../../assets/images/exploreActiveIcon.png';
import profileIcon from '../../assets/images/profileIcon.png';
import profileActiveIcon from '../../assets/images/profileActiveIcon.png';
import savedIcon from '../../assets/images/savedIcon.png';
import savedActiveIcon from '../../assets/images/savedActiveIcon.png';
import inboxIcon from '../../assets/images/inboxIcon.png';
import inboxActiveIcon from '../../assets/images/inboxActiveIcon.png';
import tripsIcon from '../../assets/images/tripsIcon.png';
import tripsActiveIcon from '../../assets/images/tripsActiveIcon.png';
import editIcon from '../../assets/images/editIcon.png';
import {useDispatch} from 'react-redux';
import {getDestinations} from '../../redux/actions/DestinationActions';

const Tab = createBottomTabNavigator();

const EditBottom = ({navigation}) => {
  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 20,
          width: 20,
        }}>
        <Image source={editIcon} />
      </View>
    </TouchableWithoutFeedback>
  );
};
export const TabNavigation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDestinations());
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      backBehavior="none"
      screenOptions={() => ({
        tabBarActiveTintColor: '#219653',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          borderTopWidth: 0,
        },

        headerStyle: {
          shadowOffset: {
            height: 0,
          },
        },
        headerTitleStyle: {
          fontFamily: 'MontserratExtraBold',
          fontSize: 28,
        },
      })}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image height={20} width={20} source={exploreActiveIcon} />
            ) : (
              <Image height={20} width={20} source={exploreIcon} />
            ),
        }}
        name="Explore"
        component={ExploreScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image height={20} width={20} source={tripsActiveIcon} />
            ) : (
              <Image height={20} width={20} source={tripsIcon} />
            ),
        }}
        name="Trips"
        component={TripsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image height={20} width={20} source={savedActiveIcon} />
            ) : (
              <Image height={20} width={20} source={savedIcon} />
            ),
        }}
        name="Saved"
        component={SavedScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image height={20} width={20} source={inboxActiveIcon} />
            ) : (
              <Image height={20} width={20} source={inboxIcon} />
            ),
        }}
        name="Inbox"
        component={InboxScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image height={20} width={20} source={profileActiveIcon} />
            ) : (
              <Image height={20} width={20} source={profileIcon} />
            ),
          headerRight: props => <EditBottom navigation={navigation} />,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
