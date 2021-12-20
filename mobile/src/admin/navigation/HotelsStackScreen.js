import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HotelsScreen} from '../screens/HotelsListScreen/HotelsScreen';
import {AddHotelScreen} from '../screens/AddHotelScreen/AddHotelScreen';
import {Add} from '../../components/Add/Add';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/elements';
import colors from '../../constants/colors';
import {HotelScreen} from '../../screens/HotelScreen/HotelScreen';
import EditHotelScreen from '../screens/EditHotelScreen/EditHotelScreen';
import {EditGalleryScreen} from '../screens/EditGalleryScreen/EditGalleryScreen';
import {HotelGalleryScreen} from '../../screens/HotelGalleryScreen/HotelGalleryScreen';
import {Edit} from '../../components/Edit/Edit';
import {ReviewsScreen} from '../../screens/ReviewsScreen/ReviewsScreen';
import {ErrorScreen} from '../../screens/ErrorScreen/ErrorScreen';
const HotelsStack = createNativeStackNavigator();

export function HotelsStackScreen() {
  const navigation = useNavigation();
  return (
    <HotelsStack.Navigator
      screenOptions={{headerTintColor: colors.white, headerBackTitle: ''}}
      initialRouteName="HotelsScreen">
      <HotelsStack.Screen
        options={{
          headerTitle: 'Hotels',
          headerBackTitle: '',
          headerShown: true,
          headerRight: props => (
            <Add
              handler={() => {
                navigation.navigate('AddHotelScreen');
              }}
            />
          ),
          headerLeft: () => (
            <HeaderBackButton
              tintColor={colors.white}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
        name="HotelsScreen"
        component={HotelsScreen}
      />
      <HotelsStack.Screen
        options={{
          headerTitle: 'Add hotel',
          headerBackTitle: '',
        }}
        name="AddHotelScreen"
        component={AddHotelScreen}
      />

      <HotelsStack.Screen
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerBackTitle: '',
          headerTitle: '',
        }}
        name="EditHotelScreen"
        component={EditHotelScreen}
      />
      <HotelsStack.Screen
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerBackTitle: '',
          headerTitle: '',
        }}
        name="EditGalleryScreen"
        component={EditGalleryScreen}
      />
      <HotelsStack.Screen
        options={{
          headerBackTitle: '',
          headerTitle: 'Gallery',
        }}
        name="HotelGalleryScreen"
        component={HotelGalleryScreen}
      />
      <HotelsStack.Screen
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerTitle: '',
          headerRight: props => (
            <Edit
              handler={() => {
                navigation.navigate('EditHotelScreen');
              }}
            />
          ),
        }}
        name="HotelScreen"
        component={HotelScreen}
      />
      <HotelsStack.Screen
        options={{
          headerTitle: 'Reviews',
          headerBackTitle: '',
        }}
        name="ReviewsScreen"
        component={ReviewsScreen}
      />
      <HotelsStack.Screen
        options={{
          headerShown: false,
        }}
        name="ErrorScreen"
        component={ErrorScreen}
      />
    </HotelsStack.Navigator>
  );
}
