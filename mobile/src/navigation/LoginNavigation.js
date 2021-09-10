import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Onboarding} from '../screens/Onboarding/Onboarding';
import {HomeScreen} from '../screens/HomePage/HomeScreen';
import {StartScreen} from '../screens/StartPage/StartScreen';
import {LoginScreen} from '../screens/Login/LoginScreen';
const Stack = createNativeStackNavigator();

export const LoginNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};
