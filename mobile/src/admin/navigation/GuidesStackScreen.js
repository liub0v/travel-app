import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {GuidesScreen} from '../screens/GuidesScreen/GuidesScreen';
import {ProfileScreen} from '../../screens/ProfileScreen/ProfileScreen';
import {AddGuideScreen} from '../screens/AddGuideScreen/AddGuideScreen';
import {EditButton} from '../../navigation/TabNavigation';
import {EditProfileScreen} from '../../screens/EditProfileScreen/EditProfileScreen';
import {useNavigation} from '@react-navigation/native';
const GuidesStack = createNativeStackNavigator();

export function GuidesStackScreen() {
  const navigation = useNavigation();
  return (
    <GuidesStack.Navigator initialRouteName="GuidesScreen">
      <GuidesStack.Screen
        options={{
          headerTitle: '',
          headerBackTitle: '',
          headerShown: false,
        }}
        name="GuidesScreen"
        component={GuidesScreen}
      />
      <GuidesStack.Screen
        options={{
          headerTitle: 'Add Guide',
          headerBackTitle: '',
        }}
        name="AddGuideScreen"
        component={AddGuideScreen}
      />
      <GuidesStack.Screen
        options={{
          headerTitle: '',
          headerBackTitle: '',
          headerRight: props => (
            <EditButton
              handler={() => {
                navigation.navigate('EditGuideProfileScreen');
              }}
            />
          ),
        }}
        name="GuideProfileScreen"
        component={ProfileScreen}
      />
      <GuidesStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <GuidesStack.Screen
        options={{
          headerTitle: 'EditProfile',
          headerBackTitle: '',
        }}
        name="EditGuideProfileScreen"
        component={EditProfileScreen}
      />
    </GuidesStack.Navigator>
  );
}
