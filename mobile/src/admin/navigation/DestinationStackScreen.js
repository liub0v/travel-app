import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {DestinationsCatalog} from '../../screens/DestinationsCatalogScreen/DestinationsCatalog';
import EditDestinationScreen from '../screens/EditDestinationScreen/EditDestinationScreen';
import AddDestinationScreen from '../screens/AddDestinationScreen/AddDestinationScreen';
import {Add} from '../../components/Add/Add';
import {HeaderBackButton} from '@react-navigation/elements';
import colors from '../../constants/colors';
const DestinationStack = createNativeStackNavigator();

export function DestinationStackScreen() {
  const navigation = useNavigation();
  return (
    <DestinationStack.Navigator initialRouteName="DestinationsCatalog">
      <DestinationStack.Screen
        options={{
          headerTitle: 'Destinations',
          headerBackTitle: '',
          headerShown: true,
          headerRight: props => (
            <Add
              handler={() => {
                navigation.navigate('AddDestinationsScreen');
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
        name="DestinationsCatalog"
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
    </DestinationStack.Navigator>
  );
}
