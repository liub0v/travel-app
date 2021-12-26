import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AdventuresScreen} from '../screens/AdventuresScreen/AdventuresScreen';
import {EditAdventureScreen} from '../screens/EditAdventureScreen/EditAdventureScreen';
import {AddAdventureScreen} from '../screens/AddAdventureScreen/AddAdventureScreen';
import {Add} from '../../components/Add/Add';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/elements';
import colors from '../../constants/colors';
import {AdventureScreen} from '../../screens/AdventureScreen/AdventureScreen';
import {ReviewsScreen} from '../../screens/ReviewsScreen/ReviewsScreen';
import {Edit} from '../../components/Edit/Edit';
import {ErrorScreen} from '../../screens/ErrorScreen/ErrorScreen';

const AdventuresStack = createNativeStackNavigator();

export function AdventuresStackScreen() {
  const navigation = useNavigation();
  return (
    <AdventuresStack.Navigator
      screenOptions={{headerTintColor: colors.white, headerBackTitle: ''}}
      initialRouteName="Adventures">
      <AdventuresStack.Screen
        options={{
          headerTitle: 'Adventures',
          headerBackTitle: '',
          headerShown: true,
          headerRight: props => (
            <Add
              handler={() => {
                navigation.navigate('AddAdventureScreen');
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
        name="Adventures"
        component={AdventuresScreen}
      />
      <AdventuresStack.Screen
        options={{
          headerTitle: 'Edit adventure',
          headerBackTitle: '',
        }}
        name="EditAdventureScreen"
        component={EditAdventureScreen}
      />
      <AdventuresStack.Screen
        options={{
          headerTitle: 'Add adventure',
          headerBackTitle: '',
        }}
        name="AddAdventureScreen"
        component={AddAdventureScreen}
      />
      <AdventuresStack.Screen
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerTitle: '',
          headerBackTitle: '',
          headerRight: props => (
            <Edit
              handler={() => {
                navigation.navigate('EditAdventureScreen');
              }}
            />
          ),
        }}
        name="AdventureScreen"
        component={AdventureScreen}
      />
      <AdventuresStack.Screen
        options={{
          headerTitle: 'Reviews',
          headerBackTitle: '',
        }}
        name="ReviewsScreen"
        component={ReviewsScreen}
      />
      <AdventuresStack.Screen
        options={{
          headerShown: false,
        }}
        name="ErrorScreen"
        component={ErrorScreen}
      />
    </AdventuresStack.Navigator>
  );
}
