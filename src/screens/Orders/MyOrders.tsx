import * as React from 'react';
import {ScrollView, View} from 'native-base';
import {OrderComponent} from '../../components/Orders/Order_Component';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';

interface OrdersProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Orders'>;
}

const Orders: React.FC<OrdersProps> = ({navigation}) => {
  const handlePress = () => {
    navigation.navigate('SingleOrder');
  };
  return (
    <ScrollView flex={1} bgColor={'accent.50'} pt={5}>
      {Array.from({length: 4}).map((_, index) => (
        <OrderComponent
          key={index}
          onPress={handlePress}
          length={3}
          index={index}
        />
      ))}
    </ScrollView>
  );
};

export default Orders;
