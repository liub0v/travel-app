import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AdventuresScreen} from '../screens/AdventuresScreen/AdventuresScreen';
import {AdventureStackScreen} from '../../navigation/AdventureStackScreen';
import {EditAdventureScreen} from '../screens/EditAdventureScreen/EditAdventureScreen';
import {AddAdventureScreen} from '../screens/AddAdventureScreen/AddAdventureScreen';
import {Add} from '../../components/Add/Add';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/elements';
import colors from '../../constants/colors';
const AdventuresStack = createNativeStackNavigator();

export function AdventuresStackScreen() {
  const navigation = useNavigation();
  return (
    <AdventuresStack.Navigator initialRouteName="HotelsScreen">
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
        name="AdventuresScreen"
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
      {AdventureStackScreen(AdventuresStack)}
    </AdventuresStack.Navigator>
  );
}
