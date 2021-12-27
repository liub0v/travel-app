import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ProfileScreen} from '../screens/ProfileScreen/ProfileScreen';
import {EditProfileScreen} from '../screens/EditProfileScreen/EditProfileScreen';
import {useNavigation} from '@react-navigation/native';
import {EditButton} from './TabNavigation';
import colors from '../constants/colors';
import {ErrorScreen} from '../screens/ErrorScreen/ErrorScreen';

const ProfileStack = createNativeStackNavigator();

export function ProfileStackScreen() {
  const navigation = useNavigation();
  return (
    <ProfileStack.Navigator
      screenOptions={{headerTintColor: colors.white, headerBackTitle: ''}}
      initialRouteName="ProfileScreen">
      <ProfileStack.Screen
        options={{
          headerRight: () => (
            <EditButton
              handler={() => {
                navigation.navigate('EditProfileScreen');
              }}
            />
          ),
          headerTitle: 'Profile',
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <ProfileStack.Screen
        options={{
          headerShown: false,
        }}
        name="ErrorScreen"
        component={ErrorScreen}
      />
      <ProfileStack.Screen
        options={{
          headerTitle: 'Edit Profile',
          headerBackTitle: '',
        }}
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
}
