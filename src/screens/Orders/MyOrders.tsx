import * as React from 'react';
import {View} from 'native-base';
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
    <View mt={5}>
      {Array.from({length: 4}).map((_, index) => (
        <OrderComponent key={index} onPress={handlePress} />
      ))}
    </View>
  );
};

export default Orders;
