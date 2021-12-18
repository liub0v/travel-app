import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {GuidesScreen} from '../screens/GuidesScreen/GuidesScreen';
import {AddGuideScreen} from '../screens/AddGuideScreen/AddGuideScreen';
import {EditButton} from '../../navigation/TabNavigation';
import {useNavigation} from '@react-navigation/native';
import {EditGuideScreen} from '../screens/EditGuideScreen/EditGuideScreen';
import {GuideScreen} from '../../screens/GuideScreen/GuideScreen';
import {Add} from '../../components/Add/Add';
import {HeaderBackButton} from '@react-navigation/elements';
import colors from '../../constants/colors';
const GuidesStack = createNativeStackNavigator();

export function GuidesStackScreen() {
  const navigation = useNavigation();
  return (
    <GuidesStack.Navigator initialRouteName="GuidesScreen">
      <GuidesStack.Screen
        options={{
          headerTitle: 'Guides',
          headerBackTitle: '',
          headerShown: true,
          headerRight: props => (
            <Add
              handler={() => {
                navigation.openDrawer();
              }}
            />
          ),
          headerLeft: () => (
            <HeaderBackButton
              tintColor={colors.white}
              onPress={() => {
                navigation.navigate('Profile');
              }}
            />
          ),
        }}
        name="GuidesScreen"
        component={GuidesScreen}
      />
      <GuidesStack.Screen
        options={{
          headerTitle: 'Add guide',
          headerBackTitle: '',
        }}
        name="AddGuideScreen"
        component={AddGuideScreen}
      />
      <GuidesStack.Screen
        options={{
          headerTitle: 'Edit guide',
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
