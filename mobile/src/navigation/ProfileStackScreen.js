import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ProfileScreen} from '../screens/ProfileScreen/ProfileScreen';
import {EditProfileScreen} from '../screens/EditProfileScreen/EditProfileScreen';
import {useNavigation} from '@react-navigation/native';
import {EditButton} from './TabNavigation';
import colors from '../constants/colors';

const ProfileStack = createNativeStackNavigator();

export function ProfileStackScreen() {
  const navigation = useNavigation();
  return (
    <ProfileStack.Navigator
      screenOptions={{headerTintColor: colors.white, headerBackTitle: ''}}
      initialRouteName="ProfileScreen">
      <ProfileStack.Screen
        options={{
          headerRight: props => (
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
          headerTitle: 'Edit Profile',
          headerBackTitle: '',
        }}
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
}
