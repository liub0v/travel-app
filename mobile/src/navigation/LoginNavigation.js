import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StartScreen} from '../screens/AuthScreens/StartScreen/StartScreen';
import {LoginScreen} from '../screens/AuthScreens/LoginScreen/LoginScreen';
import {SingUpScreen} from '../screens/AuthScreens/SingupScreen/SingUpScreen';
import {useSelector} from 'react-redux';
import {
  isOnboardingSelector,
  tokenSelector,
} from '../../redux/selectors/userSelector';
import {OnBoarding} from '../screens/Onboarding/OnBoarding';
import {ExploreScreen} from '../screens/ExploreScreen/ExploreScreen';
const Stack = createNativeStackNavigator();

export const LoginNavigation = () => {
  const token = useSelector(tokenSelector);
  const isOnboarding = useSelector(isOnboardingSelector);
  console.log(isOnboarding);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SingUpScreen" component={SingUpScreen} />
      )}
    </Stack.Navigator>
  );
};
