import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {DestinationsCatalog} from '../../screens/DestinationsCatalogScreen/DestinationsCatalog';
import EditDestinationScreen from '../screens/EditDestinationScreen/EditDestinationScreen';
import AddDestinationScreen from '../screens/AddDestinationScreen/AddDestinationScreen';
import {Add} from '../../components/Add/Add';
import {HeaderBackButton} from '@react-navigation/elements';
import colors from '../../constants/colors';
import {ErrorScreen} from '../../screens/ErrorScreen/ErrorScreen';
const DestinationStack = createNativeStackNavigator();

export function DestinationStackScreen() {
  const navigation = useNavigation();
  return (
    <DestinationStack.Navigator
      screenOptions={{headerTintColor: colors.white, headerBackTitle: ''}}
      initialRouteName="Destinations">
      <DestinationStack.Screen
        options={{
          headerTitle: 'Destinations',
          headerBackTitle: '',
          headerShown: true,
          headerRight: props => (
            <Add
              handler={() => {
                navigation.navigate('AddDestinationScreen');
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
        name="Destinations"
        component={DestinationsCatalog}
      />
      <DestinationStack.Screen
        options={{
          headerTitle: 'Edit destination',
          headerBackTitle: '',
        }}
        name="EditDestinationScreen"
        component={EditDestinationScreen}
      />
      <DestinationStack.Screen
        options={{
          headerTitle: 'Add destination',
          headerBackTitle: '',
        }}
        name="AddDestinationScreen"
        component={AddDestinationScreen}
      />
      <DestinationStack.Screen
        options={{
          headerShown: false,
        }}
        name="ErrorScreen"
        component={ErrorScreen}
      />
    </DestinationStack.Navigator>
  );
}
