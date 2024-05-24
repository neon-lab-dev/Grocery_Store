import * as React from 'react';
import {ScrollView, View} from 'native-base';
import {OrderComponent} from '../../components/Orders/Order_Component';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import {getOrders} from '../../api/auth_routes';
import {FlatList} from 'react-native';

interface OrdersProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Orders'>;
}

const Orders: React.FC<OrdersProps> = ({navigation}) => {
  const [productsList, setProductList] = React.useState([]);
  const handlePress = data => {
    navigation.navigate('SingleOrder', {order: data});
  };

  React.useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      console.log(response);
      setProductList(response);
      console.log('productList', productsList);
    } catch (error) {}
  };
  return (
    <View flex={1} bgColor={'accent.50'} pt={5}>
      {/* {Array.from({length: 4}).map((_, index) => (
        <OrderComponent
          key={index}
          onPress={handlePress}
          length={3}
          index={index}
        />
      ))} */}
      <FlatList
        data={productsList}
        renderItem={({item, index}) => (
          <OrderComponent
            data={item}
            key={item.id}
            onPress={handlePress}
            length={productsList}
            index={index}
          />
        )}
      />
    </View>
  );
};

export default Orders;
