import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ProfileScreen} from '../screens/ProfileScreen/ProfileScreen';
import {EditProfileScreen} from '../screens/EditProfileScreen/EditProfileScreen';
import {useNavigation, useRoute} from '@react-navigation/native';
import {EditButton} from './TabNavigation';

const ProfileStack = createNativeStackNavigator();

export function ProfileStackScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {userInfo, profileInfo} = route.params;
  return (
    <ProfileStack.Navigator initialRouteName="ProfileScreen">
      <ProfileStack.Screen
        options={{
          headerRight: props => (
            <EditButton
              handler={() => {
                navigation.navigate('EditProfileScreen', {});
              }}
            />
          ),
        }}
        name="ProfileScreen"
        component={ProfileScreen}
        initialParams={{userInfo, profileInfo}}
      />
      <ProfileStack.Screen
        options={{
          headerTitle: 'EditProfile',
          headerBackTitle: '',
        }}
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
}
