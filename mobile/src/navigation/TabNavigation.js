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
import {getPopularDestinations} from '../../redux/actions/DestinationActions';
import {getPopularAdventures} from '../../redux/actions/AdventureActions';
import {getHotels} from '../../redux/actions/HotelActions';
import {DestinationsCatalog} from '../screens/DestinationsCatalogScreen/DestinationsCatalog';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AdventuresCatalog} from '../screens/AdventuresCatalogScreen/AdventuresCatalog';
import {AdventureScreen} from '../screens/AdventureScreen/AdventureScreen';
import arrow from '../../assets/images/next.png';
import {Like} from '../components/Like/Like';

const Tab = createBottomTabNavigator();

const EditButton = ({navigation}) => {
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
const ExploreStack = createNativeStackNavigator();

function ExploreStackScreen() {
  const {goBack} = useNavigation();

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
        name="DestinationsCatalog"
        component={DestinationsCatalog}
      />
      <ExploreStack.Screen
        name="AdventuresCatalog"
        component={AdventuresCatalog}
      />
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
    </ExploreStack.Navigator>
  );
}

export const TabNavigation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPopularDestinations());
    dispatch(getPopularAdventures());
    dispatch(getHotels());
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
        component={ExploreStackScreen}
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
          headerRight: props => <EditButton navigation={navigation} />,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
