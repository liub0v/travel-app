import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {GuidesScreen} from '../screens/GuidesScreen/GuidesScreen';
import {ProfileScreen} from '../../screens/ProfileScreen/ProfileScreen';
import {AddGuideScreen} from '../screens/AddGuideScreen/AddGuideScreen';
import {EditButton} from '../../navigation/TabNavigation';
import {useNavigation} from '@react-navigation/native';
import {EditGuideScreen} from '../screens/EditGuideScreen/EditGuideScreen';
import {GuideScreen} from '../../screens/GuideScreen/GuideScreen';
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
          headerTitle: 'EditProfile',
          headerBackTitle: '',
        }}
        name="EditGuideScreen"
        component={EditGuideScreen}
      />
      <GuidesStack.Screen
        options={({route}) => ({
          headerTitle: '',
          headerBackTitle: '',
          headerRight: props => (
            <EditButton
              handler={() => {
                navigation.navigate('EditGuideScreen', {route});
              }}
            />
          ),
        })}
        name="GuideScreen"
        component={GuideScreen}
      />
    </GuidesStack.Navigator>
  );
}
