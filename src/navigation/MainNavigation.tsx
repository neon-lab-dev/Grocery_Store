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
import {useDispatch, useSelector} from 'react-redux';

export type RootStackParamList = {
  Splash: undefined;
  Auth: NavigatorScreenParams<AuthNavigatorParamList>;
  App: NavigatorScreenParams<AppNavigatorParamList>;
};

export type AuthNavigatorParamList = {
  Login: undefined;
  OTP: {phoneNo: string};
  PersonalDetails: undefined;
  Home: undefined;
  Categories: undefined;
  Settings: undefined;
  CategoryProducts: undefined;
  Payment: undefined;
  Splash: undefined;
};

export type AppNavigatorParamList = {
  Categories: undefined;
  CategoryProducts: undefined;
  Payment: undefined;
  ProductDetails: undefined;
  Home: undefined;
  Search: undefined;
  Settings: undefined;
  OrderSuccess: undefined;
  PersonalDetails: undefined;
  Addresses: undefined;
  AddAddress: undefined;
  Help: undefined;
  FAQ: undefined;
  Orders: undefined;
  SingleOrder: undefined;
  Cart: undefined;
  Splash: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation: React.FC = () => {
  // const user = useSelector(state => state.user);
  // const isLoggedIn = false;
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={AuthNavigation}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="App"
          component={AppNavigation}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
