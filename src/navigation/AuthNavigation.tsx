import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Login from '../screens/Login';

const Stack = createStackNavigator<AuthNavigatorParamList>();

export const AuthNavigation: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
