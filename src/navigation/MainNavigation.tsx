/**
 * CHECK FOR USER AUTHENTICATION
 * UNAUTHENTICATED -> REDIRECT TO AUTHNAVIGATION
 * AUTHENTICATED -> REDIRECT TO APPNAVIGATION
 */
import React from 'react';
// import {useSelector} from 'react-redux';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthNavigation';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/Splash';

export type RootStackParamList = {
  Splash: undefined;
  Auth: NavigatorScreenParams<AuthNavigatorParamList>;
  App: NavigatorScreenParams<AppNavigatorParamList>;
};

export type AuthNavigatorParamList = {
  Login: undefined;
  OTP: undefined;
  PersonalDetails: undefined;
  Home: undefined
  Categories:undefined
};

export type AppNavigatorParamList = {
  Categories:undefined;
  Settings: undefined;
  Home: undefined;
  OrderSuccess: undefined;
  PersonalDetails: undefined;
  Help: undefined;
  FAQ: undefined;
  Orders: undefined;
  SingleOrder: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation: React.FC = () => {
  // const user = useSelector(state => state.user);
  const isLoggedIn = true;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" options={{headerShown: false}}>
          {props => <Splash {...props} isLoggedIn={isLoggedIn} />}
        </Stack.Screen>
        {!isLoggedIn ? (
          <Stack.Screen
            name="Auth"
            component={AuthNavigation}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="App"
            component={AppNavigation}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
