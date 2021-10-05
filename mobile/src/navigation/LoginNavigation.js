import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/HomeScreen/HomeScreen';
import {StartScreen} from '../screens/StartScreen/StartScreen';
import {LoginScreen} from '../screens/Login/LoginScreen';
import {SingUpScreen} from '../screens/SingupScreen/SingUpScreen';
import {useSelector} from 'react-redux';
import {
  isOnboardingSelector,
  tokenSelector,
} from '../../redux/selectors/userSelector';
import {OnBoarding} from '../screens/OnBoarding/OnBoarding';
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
      {token ? (
        <>
          {isOnboarding && (
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
          )}
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          {/*<Stack.Screen name="StartScreen" component={StartScreen} />*/}
          {/*<Stack.Screen name="LoginScreen" component={LoginScreen} />*/}
          {/*<Stack.Screen name="SingUpScreen" component={SingUpScreen} />*/}
        </>
      )}
    </Stack.Navigator>
  );
};
