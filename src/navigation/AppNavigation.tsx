/* eslint-disable react/no-unstable-nested-components */
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {AppNavigatorParamList, RootStackParamList} from './MainNavigation';
import {Center, ChevronLeftIcon, Text, View} from 'native-base';
import {Settings} from '../screens/Settings';
import PersonalDetails from '../screens/PersonalDetails';
import Orders from '../screens/Orders/MyOrders';
import SingleOrder from '../screens/Orders/single_order';
import Delivered from '../components/Delivered';
import {horizontalScale} from '../assets/scaling';
import Categories from '../screens/Categories';
import Home from '../screens/Home';
import OrderSuccess from '../screens/Orders/Order-Success';
import SavedAddress from '../screens/Address/saved_address';
import AddAddress from '../screens/Address/add_address';
import Home from '../screens/Home';
import Search from '../screens/Search';
import {SvgXml} from 'react-native-svg';
import {filter} from '../assets/images/icons/filter';
import Cart from '../screens/Cart';

type AppNavigationProps = {
  navigation: StackNavigationProp<RootStackParamList, 'App'>;
};

const Stack = createStackNavigator<AppNavigatorParamList>();

export const AppNavigation: React.FC<AppNavigationProps> = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={() => ({headerStyle: {height: 100}})}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={({navigation}) => ({
          headerStyle: {height: 100},
          headerTitleAlign: 'center',
          headerLeft: () => (
            <ChevronLeftIcon
              size={'md'}
              ml={5}
              color={'black'}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccess}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="PersonalDetails"
        component={PersonalDetails}
        options={({navigation}) => ({
          headerTitle: 'Personal Details',
          headerStyle: {height: 100},
          headerTitleAlign: 'center',
          headerLeft: () => (
            <ChevronLeftIcon
              size={'md'}
              ml={5}
              color={'black'}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={({navigation}) => ({
          headerTitle: 'My Orders',
          headerStyle: {height: 100},
          headerTitleAlign: 'center',
          headerLeft: () => (
            <ChevronLeftIcon
              size={'md'}
              ml={5}
              color={'black'}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="SingleOrder"
        component={SingleOrder}
        options={({navigation}) => ({
          headerTitle: () => (
            <View>
              <Text fontSize={'fs18'}>Order #189073202237</Text>
              <Text fontSize={'fs12'} color={'accent.400'}>
                Placed at 07/03/2024 at 09:12PM
              </Text>
            </View>
          ),
          headerStyle: {height: 100},
          headerTitleAlign: 'left',
          headerLeft: () => (
            <ChevronLeftIcon
              size={'md'}
              ml={5}
              color={'black'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => <Delivered mr={3} h={horizontalScale(25)} />,
        })}
      />
      <Stack.Screen
        name="Addresses"
        component={SavedAddress}
        options={({navigation}) => ({
          headerTitle: 'Saved Addresses',
          headerStyle: {height: 100},
          headerTitleAlign: 'center',
          headerLeft: () => (
            <ChevronLeftIcon
              size={'md'}
              ml={5}
              color={'black'}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddAddress"
        component={AddAddress}
        options={({navigation}) => ({
          headerTitle: 'Add Address',
          headerStyle: {height: 100},
          headerTitleAlign: 'center',
          headerLeft: () => (
            <ChevronLeftIcon
              size={'md'}
              ml={5}
              color={'black'}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={({navigation}) => ({
          headerStyle: {height: 100},
          headerTitleAlign: 'center',
          headerLeft: () => (
            <ChevronLeftIcon
              size={'md'}
              ml={5}
              color={'black'}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={({navigation}) => ({
          headerStyle: {height: 100},
          headerTitleAlign: 'center',
          headerLeft: () => (
            <ChevronLeftIcon
              size={'md'}
              ml={5}
              color={'black'}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
