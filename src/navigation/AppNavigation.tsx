import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {AppNavigatorParamList, RootStackParamList} from './MainNavigation';
import Home from '../screens/Home';

type AppNavigationProps = {
  navigation: StackNavigationProp<RootStackParamList, 'App'>;
};

const Stack = createStackNavigator<AppNavigatorParamList>();

export const AppNavigation: React.FC<AppNavigationProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
