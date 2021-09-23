import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OnBoarding} from '../screens/Onboarding/OnBoarding';
import {HomeScreen} from '../screens/HomeScreen/HomeScreen';
import {StartScreen} from '../screens/StartScreen/StartScreen';
import {LoginScreen} from '../screens/Login/LoginScreen';
import {SingUpScreen} from '../screens/SingupScreen/SingUpScreen';
import {useSelector} from 'react-redux';
import {tokenSelector} from '../../redux/selectors/userSelector';
const Stack = createNativeStackNavigator();

export const LoginNavigation = () => {
  const token = useSelector(tokenSelector);
  return (
    <Stack.Navigator
      initialRouteName={token ? 'OnBoarding' : 'StartScreen'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SingUpScreen" component={SingUpScreen} />
    </Stack.Navigator>
  );
};
