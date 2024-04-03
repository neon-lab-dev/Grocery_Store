import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Login from '../screens/Login';
import {AuthNavigatorParamList} from './MainNavigation';
import OTPScreen from '../screens/OTP';
import {AddPersonalDetails} from '../screens/AddPersonalDetails';

const Stack = createStackNavigator<AuthNavigatorParamList>();

export const AuthNavigation: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OTP"
        component={OTPScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PersonalDetails"
        component={AddPersonalDetails}
        options={{
          headerTitle: 'Personal Details',
          headerStyle: {height: 100},
          headerLeft: () => null,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
