import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HotelsScreen} from '../screens/HotelsListScreen/HotelsScreen';
import {HotelStackScreen} from '../../navigation/HotelStackScreen';
import {AddHotelScreen} from '../screens/AddHotelScreen/AddHotelScreen';
import {Add} from '../../components/Add/Add';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/elements';
import colors from '../../constants/colors';
const HotelsStack = createNativeStackNavigator();

export function HotelsStackScreen() {
  const navigation = useNavigation();
  return (
    <HotelsStack.Navigator initialRouteName="HotelsScreen">
      <HotelsStack.Screen
        options={{
          headerTitle: 'Hotels',
          headerBackTitle: '',
          headerShown: true,
          headerRight: props => (
            <Add
              handler={() => {
                navigation.navigate('AddHotelScreen');
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
        name="HotelsScreen"
        component={HotelsScreen}
      />
      <HotelsStack.Screen
        options={{
          headerTitle: 'Add hotel',
          headerBackTitle: '',
        }}
        name="AddHotelScreen"
        component={AddHotelScreen}
      />

      {HotelStackScreen(HotelsStack)}
    </HotelsStack.Navigator>
  );
}
