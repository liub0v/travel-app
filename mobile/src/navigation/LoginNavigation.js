import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Onboarding} from '../screens/Onboarding/Onboarding';
import {HomeScreen} from '../screens/HomeScreen/HomeScreen';
import {StartScreen} from '../screens/StartScreen/StartScreen';
import {LoginScreen} from '../screens/Login/LoginScreen';
import {SingupScreen} from '../screens/SingupScreen/SingupScreen';
import {useSelector} from 'react-redux';
import {tokenSelector} from '../../redux/selectors/userSelector';
const Stack = createNativeStackNavigator();

export const LoginNavigation = () => {
  const token = useSelector(tokenSelector);
  console.log('TOKEN', token);
  return (
    <Stack.Navigator
      initialRouteName={token ? 'Onboarding' : 'LoginScreen'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SingupScreen" component={SingupScreen} />
    </Stack.Navigator>
  );
};
