import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {GuidesScreen} from '../screens/GuidesScreen/GuidesScreen';
import {ProfileScreen} from '../../screens/ProfileScreen/ProfileScreen';
import {AddGuideScreen} from '../screens/AddGuideScreen/AddGuideScreen';
const GuidesStack = createNativeStackNavigator();

export function GuidesStackScreen() {
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
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </GuidesStack.Navigator>
  );
}
