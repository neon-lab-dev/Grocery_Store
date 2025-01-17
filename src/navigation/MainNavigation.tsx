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
import {useSelector} from 'react-redux';

export type RootStackParamList = {
  Splash: undefined;
  Auth: NavigatorScreenParams<AuthNavigatorParamList>;
  App: NavigatorScreenParams<AppNavigatorParamList>;
};

export type AuthNavigatorParamList = {
  Login: undefined;
  OTP: {phoneNo: string};
  PersonalDetails: {phoneNo: string};
};

export type AppNavigatorParamList = {
  Categories: undefined;
  CategoryProducts: {
    SubCategory: string;
    categoryIndex: number;
    subCategoryIndex: number;
  };
  Payment: undefined;
  ProductDetails: undefined;
  Home: undefined;
  Search: undefined;
  Settings: undefined;
  OrderSuccess: {item: undefined; Method: string};
  PersonalDetails: undefined;
  Addresses: undefined;
  AddAddress: undefined;
  Help: undefined;
  FAQ: undefined;
  Orders: undefined;
  SingleOrder: {order: string};
  Cart: undefined;
  Splash: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation: React.FC = () => {
  const user = useSelector(state => state.user);
  const isLoggedIn = false;
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={AuthNavigation}
          options={{headerShown: false}}
        />
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
