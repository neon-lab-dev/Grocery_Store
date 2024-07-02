import * as React from 'react';
import {View, Image} from 'native-base';
import {OrderComponent} from '../../components/Orders/Order_Component';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import {getOrders} from '../../api/auth_routes';
import {FlatList, Text} from 'react-native';
import {verticalScale, scaleFontSize} from '../../assets/scaling';
import Loader from '../../components/Loader/Loader';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {setNetworkStatus} from '../../redux/slices/networkSlice.ts';
import {toast} from '../../components/Toast/Toast';
import {height} from "../../assets/scaling.ts"

interface OrdersProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Orders'>;
}

const Orders: React.FC<OrdersProps> = ({navigation}) => {
  const [productsList, setProductList] = React.useState<any[]>([]);
  const [loaderVisible, setLoaderVisible] = React.useState(true);
  const dispatch = useDispatch();
  const isConnected = useSelector(state => state.network.isConnected);

  const handlePress = (data: object) => {
    navigation.navigate('SingleOrder', {order: data});
  };

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setNetworkStatus(state.isConnected));
      if (isConnected) {
        fetchOrders();
      } else {
        toast.showToast('Please Check Your Internet Connection');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, isConnected]);

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
          bgColor={'white'}
          alignItems={'center'}
          justifyContent={'center'}>
          <Loader isOpen={loaderVisible} />
        </View>
      ) : (
        <View flex={1} bgColor={'accent.50'} pt={5}>
          <FlatList
            ListEmptyComponent={
              <View height={verticalScale(450)} flex={1} justifyContent={'center'}  alignItems={'center'}>
              <Text
                style={{
                  color: '#F97316',
                  textAlign: 'center',
                  fontSize: scaleFontSize(30),
                  marginTop: verticalScale(20),
                }}
              >
                No Orders!
              </Text>
            </View>
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
