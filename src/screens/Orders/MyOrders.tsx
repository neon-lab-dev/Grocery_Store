import * as React from 'react';
import {View, Image} from 'native-base';
import {OrderComponent} from '../../components/Orders/Order_Component';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import {getOrders} from '../../api/auth_routes';
import {FlatList, Text} from 'react-native';
import {verticalScale, scaleFontSize} from '../../assets/scaling';

interface OrdersProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Orders'>;
}

const Orders: React.FC<OrdersProps> = ({navigation}) => {
  const [productsList, setProductList] = React.useState<any[]>([]);
  const [loaderVisible, setLoaderVisible] = React.useState(true);
  const handlePress = (data: object) => {
    navigation.navigate('SingleOrder', {order: data});
  };

  React.useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoaderVisible(true);
      const response = await getOrders();
      setProductList(response);
      setLoaderVisible(false);
    } catch (error) {}
  };
  return (
    <>
      {loaderVisible ? (
        <View
          flex={1}
          bgColor={'accent.300'}
          alignItems={'center'}
          justifyContent={'center'}>
          <Image
            alt="loading"
            source={require('../../assets/images/icons/loading.gif')}
            h={250}
            w={250}
          />
        </View>
      ) : (
        <View flex={1} bgColor={'accent.50'} pt={5}>
          <FlatList
            ListEmptyComponent={
              <Text
                style={{
                  color: '#F97316',
                  textAlign: 'center',
                  fontSize: scaleFontSize(30),
                  marginTop: verticalScale(20),
                }}>
                No Orders!
              </Text>
            }
            data={productsList}
            renderItem={({item, index}) => (
              <OrderComponent
                data={item}
                key={item.id}
                onPress={handlePress}
                length={productsList.length}
                index={index}
              />
            )}
          />
        </View>
      )}
    </>
  );
};

export default Orders;
