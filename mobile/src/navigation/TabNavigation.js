import React, {useEffect} from 'react';
import {View, Image, TouchableWithoutFeedback} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {useDispatch} from 'react-redux';
import {getPopularDestinations} from '../../redux/actions/DestinationActions';
import {getPopularAdventures} from '../../redux/actions/AdventureActions';
import {getPopularHotels} from '../../redux/actions/HotelActions';

import {ExploreStackScreen} from './ExploreStackScreen';
import {SavedStackScreen} from './SavedStackScreen';
import {ProfileStackScreen} from './ProfileStackScreen';

import exploreIcon from '../../assets/images/exploreIcon.png';
import exploreActiveIcon from '../../assets/images/exploreActiveIcon.png';
import profileIcon from '../../assets/images/profileIcon.png';
import profileActiveIcon from '../../assets/images/profileActiveIcon.png';
import savedIcon from '../../assets/images/savedIcon.png';
import savedActiveIcon from '../../assets/images/savedActiveIcon.png';
import tripsIcon from '../../assets/images/tripsIcon.png';
import tripsActiveIcon from '../../assets/images/tripsActiveIcon.png';
import editIcon from '../../assets/images/editIcon.png';
import {TripsStackScreen} from './TripsStackScreen';

const Tab = createBottomTabNavigator();

export const EditButton = ({handler}) => {
  return (
    <TouchableWithoutFeedback onPress={handler}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 0,
          width: 20,
        }}>
        <Image source={editIcon} />
      </View>
    </TouchableWithoutFeedback>
  );
};
const TabBarIcon = ({focused, icon, activeIcon}) => {
  return (
    <>
      {focused ? (
        <Image height={20} width={20} source={activeIcon} />
      ) : (
        <Image height={20} width={20} source={icon} />
      )}
    </>
  );
};
export const TabNavigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularDestinations());
    dispatch(getPopularAdventures());
    dispatch(getPopularHotels());
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      backBehavior={'history'}
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
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              focused={focused}
              icon={exploreIcon}
              activeIcon={exploreActiveIcon}
            />
          ),
        }}
        name="Explore"
        component={ExploreStackScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              focused={focused}
              icon={tripsIcon}
              activeIcon={tripsActiveIcon}
            />
          ),
        }}
        name="Trips"
        component={TripsStackScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              focused={focused}
              icon={savedIcon}
              activeIcon={savedActiveIcon}
            />
          ),
        }}
        name="Saved"
        component={SavedStackScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              focused={focused}
              icon={profileIcon}
              activeIcon={profileActiveIcon}
            />
          ),
          headerShown: false,
        }}
        name="Profile"
        component={ProfileStackScreen}
      />
    </Tab.Navigator>
  );
};
