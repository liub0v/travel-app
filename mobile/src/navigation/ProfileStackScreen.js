import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ProfileScreen} from '../screens/ProfileScreen/ProfileScreen';
import {EditProfileScreen} from '../screens/EditProfileScreen/EditProfileScreen';
import {useRoute} from '@react-navigation/native';

const ProfileStack = createNativeStackNavigator();

export function ProfileStackScreen() {
  const route = useRoute();
  const user = route.params.user;
  return (
    <ProfileStack.Navigator initialRouteName="ProfileScreen">
      <ProfileStack.Screen
        options={{
          headerShown: false,
        }}
        name="ProfileScreen"
        component={ProfileScreen}
        initialParams={{user}}
      />
      <ProfileStack.Screen
        options={{
          headerTitle: 'EditProfile',
        }}
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
}
