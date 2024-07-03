import React, {FC, useEffect, useState} from 'react';
import {
  Alert,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {Box, Text, useToast} from 'native-base';
import {horizontalScale, scaleFontSize} from '../../assets/scaling';
import {Modal} from 'native-base';
import {styles} from './style';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import BillSummaryCard from '../../components/BillSummaryCard';
import PaymentPreferred from '../../components/PaymentPreferred';
import SelectAddress from '../../components/SelectingAddress';
import {SvgXml} from 'react-native-svg';
import {orangeLocation} from '../../assets/images/icons/orangeLocation';
import {orangeDownArrow} from '../../assets/images/icons/orangeDownArrow';
import {rightArrowIcon} from '../../assets/images/icons/rightArrow';
import {getSelectedAddress} from '../../api/localstorage';
import Loader from '../../components/Loader/Loader';
import {
  CreateOrders,
  ForcepaymentStatus,
  fetchpayment,
  paymentStatus,
} from '../../api/auth_routes';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {clearCart} from '../../redux/slices/actions';
import NetInfo, {refresh} from '@react-native-community/netinfo';
import {setNetworkStatus} from '../../redux/slices/networkSlice.ts';

interface Address {
  id: number;
  address: string;
}
interface PaymentProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Payment'>;
}

const Payment: FC<PaymentProps> = ({navigation, route}) => {
  const {deliveryCharges} = route.params;
  // console.log(deliveryCharges);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const [paymentLinkID, setPaymentLinkID] = useState('');
  const [value, setValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectAddress, setSelectAddress] = useState({});
  const [totalDiscountedPrice, setTotalDiscountedPrice] = React.useState(0);
  const cartItems = useSelector((state: any) => state.cart);
  const toast = useToast();
  const id = 'test-toast';
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const isConnected = useSelector(state => state.network.isConnected);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setNetworkStatus(state.isConnected));
      if (!isConnected) {
        toast.show('Please Check Your Internet Connection');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setValue('');
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text
            fontFamily={'Inter_SemiBold'}
            color={'#1F2937'}
            fontSize={scaleFontSize(18)}>
            Payment Methods
          </Text>
          <Text
            fontFamily={'Inter_SemiBold'}
            fontSize={scaleFontSize(12)}
            color={'#6B7280'}>
            {cartItemCount} Item | Total ₹{TotalPrice.toFixed(2)}
          </Text>
        </View>
      ),
    });
  }, [Navigation]);

  useEffect(() => {
    if (value === 'CASH_ON_DELIVERY') {
      setPaymentLinkID(value);
    } else if (value === 'PICKUP_AT_SHOP') {
      setPaymentLinkID(value);
    }
  }, [value]);

  var orderData = {
    paymentId: paymentLinkID,
    boughtProductDetailsList: cartItems.items.map(
      (item: {varietyList: any; id: any; quantity: any}) => ({
        varietyId: item.varietyList[0].id,
        boughtQuantity: item.quantity,
      }),
    ),
    shippingInfo: {
      id: selectAddress.id,
    },
    paymentMode: value,
  };
  const gotoOrderSuccess = async () => {
    if (orderData.paymentMode === '') {
      toast.show({
        id,
        duration: 3500,
        render: () => {
          return (
            <Box
              bg="primary.400"
              px="2"
              py="1"
              rounded="sm"
              mb={5}
              _text={{
                fontWeight: '500',
                color: 'white',
              }}>
              Please Select Payment Method
            </Box>
          );
        },
      });
    } else if (orderData.paymentMode === 'ONLINE_PAYMENT') {
      const dis = cartItems.items[0].description;
      try {
        const paymentLinkResponse = await fetchpayment(TotalPrice, dis);
        if (paymentLinkResponse.statusCode === 200) {
          const shortUrl =
            paymentLinkResponse.responseBody.additionalInfo.shortUrl;
          const paymentid = paymentLinkResponse.responseBody.paymentId;
          const paymentlinkid =
            paymentLinkResponse.responseBody.additionalInfo.paymentLinkId;
          setPaymentLinkID(paymentlinkid);
          handlePayment(shortUrl, paymentid, paymentlinkid);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (orderData.paymentMode != 'ONLINE_PAYMENT') {
      setLoaderVisible(true);
      try {
        const orderStatus = await CreateOrders(orderData);
        if (orderStatus?.data.statusCode === 200) {
          navigation.replace('OrderSuccess', {
            item: orderStatus?.data,
            Method: value,
          });
          dispatch(clearCart());
          setLoaderVisible(false);
        } else {
          setLoaderVisible(false);
          toast.show({
            id,
            duration: 2500,
            render: () => {
              return (
                <Box
                  bg="primary.400"
                  px="2"
                  py="1"
                  rounded="sm"
                  mb={5}
                  _text={{
                    fontWeight: '500',
                    color: 'white',
                  }}>
                  something went wrong
                </Box>
              );
            },
          });
        }
      } catch (error) {
        toast.show({
          id,
          duration: 2500,
          render: () => {
            return (
              <Box
                bg="primary.400"
                px="2"
                py="1"
                rounded="sm"
                mb={5}
                _text={{
                  fontWeight: '500',
                  color: 'white',
                }}>
                something went wrong
              </Box>
            );
          },
        });
      }
    }
  };

  const handlePayment = (
    shortUrl: string,
    paymentid: string,
    paymentlinkid: string,
  ) => {
    if (shortUrl) {
      Linking.openURL(shortUrl);
      monitorPaymentStatus(paymentid, paymentlinkid);
    } else {
      Alert.alert('Error', 'Unable to open payment link');
    }
  };

  const monitorPaymentStatus = (paymentId: string, paymentlinkid: string) => {
    setLoaderVisible(true);
    let intervalCount = 0;
    const intervalId = setInterval(async () => {
      const statusResponse = await paymentStatusCheck(paymentId);
      intervalCount += 1;
      if (statusResponse) {
        if (statusResponse === 'SUCCESS') {
          setLoaderVisible(false);
          clearInterval(intervalId);
          console.log('Payment successful');
          try {
            var orderData1 = {
              paymentId: paymentlinkid,
              boughtProductDetailsList: cartItems.items.map(
                (item: {varietyList: any; id: any; quantity: any}) => ({
                  varietyId: item.varietyList[0].id,
                  boughtQuantity: item.quantity,
                }),
              ),
              shippingInfo: {
                id: selectAddress.id,
              },
              paymentMode: value,
            };
            const orderStatus = await CreateOrders(orderData1);
            if (orderStatus?.data.statusCode === 200) {
              navigation.replace('OrderSuccess', {
                item: orderStatus?.data,
                Method: value,
              });
              dispatch(clearCart());
              setLoaderVisible(false);
            } else {
              setLoaderVisible(false);
              toast.show({
                id,
                duration: 2500,
                render: () => {
                  return (
                    <Box
                      bg="primary.400"
                      px="2"
                      py="1"
                      rounded="sm"
                      mb={5}
                      _text={{
                        fontWeight: '500',
                        color: 'white',
                      }}>
                      Payment is successful unable to create order
                    </Box>
                  );
                },
              });
            }
          } catch (error) {
            toast.show({
              id,
              duration: 2500,
              render: () => {
                return (
                  <Box
                    bg="primary.400"
                    px="2"
                    py="1"
                    rounded="sm"
                    mb={5}
                    _text={{
                      fontWeight: '500',
                      color: 'white',
                    }}>
                    Payment is successful unable to create order
                  </Box>
                );
              },
            });
          }
        } else if (statusResponse !== 'SUCCESS') {
          setLoaderVisible(true);
        }
      }
      if (intervalCount >= 40) {
        clearInterval(intervalId);
        setLoaderVisible(false);
        Alert.alert('', 'Click on get status to know payment status', [
          {
            text: 'Get status',
            onPress: () => {
              ForcepaymentStatusCheck(paymentId, paymentlinkid);
            },
          },
        ]);
      }
    }, 3000);
  };

  const paymentStatusCheck = async (paymentId: string) => {
    try {
      setLoaderVisible(true);
      const paymentResponse = await paymentStatus(paymentId);
      return paymentResponse.responseBody.paymentStatus;
    } catch (error) {
      console.log(error);
    }
  };

  const ForcepaymentStatusCheck = async (
    paymentId: string,
    paymentlinkid: string,
  ) => {
    try {
      setLoaderVisible(true);
      const paymentResponse = await ForcepaymentStatus(paymentId);
      if (paymentResponse) {
        if (paymentResponse === 'SUCCESS') {
          try {
            var orderData2 = {
              paymentId: paymentlinkid,
              boughtProductDetailsList: cartItems.items.map(
                (item: {varietyList: any; id: any; quantity: any}) => ({
                  varietyId: item.varietyList[0].id,
                  boughtQuantity: item.quantity,
                }),
              ),
              shippingInfo: {
                id: selectAddress.id,
              },
              paymentMode: value,
            };
            const orderStatus = await CreateOrders(orderData2);
            if (orderStatus?.data.statusCode === 200) {
              navigation.replace('OrderSuccess', {
                item: orderStatus?.data,
                Method: value,
              });
              dispatch(clearCart());
              setLoaderVisible(false);
            } else {
              setLoaderVisible(false);
              toast.show({
                id,
                duration: 2500,
                render: () => {
                  return (
                    <Box
                      bg="primary.400"
                      px="2"
                      py="1"
                      rounded="sm"
                      mb={5}
                      _text={{
                        fontWeight: '500',
                        color: 'white',
                      }}>
                      Payment is successful unable to create order
                    </Box>
                  );
                },
              });
            }
          } catch (error) {
            toast.show({
              id,
              duration: 2500,
              render: () => {
                return (
                  <Box
                    bg="primary.400"
                    px="2"
                    py="1"
                    rounded="sm"
                    mb={5}
                    _text={{
                      fontWeight: '500',
                      color: 'white',
                    }}>
                    Payment is successful unable to create order
                  </Box>
                );
              },
            });
          }
        } else if (paymentResponse !== 'SUCCESS') {
          setLoaderVisible(false);
          Alert.alert('', 'Something went wrong! Please try again', [
            {
              text: 'Try again',
              onPress: () => {
                navigation.navigate('Cart');
              },
            },
          ]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const gotoAddAddress = () => {
    setModalVisible(false);
    navigation.navigate('AddAddress', {title: 'Add'});
  };
  const cartItemCount = cartItems.items.length;
  React.useEffect(() => {
    let temp = 0;
    cartItems.items.forEach(
      (item: {varietyList: any[]; discountPrice: number; quantity: number}) => {
        temp += item.varietyList[0].price * item.quantity;
      },
    );
    setTotalDiscountedPrice(temp);
  }, [cartItems]);
  const TotalPrice = cartItems.totalPrice;
  useEffect(() => {
    selAddress();
  }, []);

  const selAddress = async () => {
    setLoaderVisible(true);
    const address = await getSelectedAddress();
    if (address != null) {
      setSelectAddress(address);
      setLoaderVisible(false);
    }
  };
  return (
    <ScrollView
      style={styles.mainContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['red']}
        />
      }
      scrollEnabled={false}>
      {/* Drop Down List  */}
      {/* Drop Down List  */}
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 12,
          backgroundColor: '#FFFFFF',
          borderWidth: horizontalScale(1.5),
          borderColor: '#F3F4F6',
          alignItems: 'center',
          paddingHorizontal: horizontalScale(17),
        }}>
        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <SvgXml xml={orangeLocation} height={20} width={20} />
          <Text
            numberOfLines={2}
            style={{
              fontSize: scaleFontSize(12),
              fontFamily: 'Inter_Medium',
              color: '#374151',
            }}>
            {selectAddress !== null
              ? `${selectAddress?.addressLine1},${selectAddress?.landmark},${selectAddress?.city},${selectAddress?.state}`
              : `Select the Address`}
          </Text>
        </View>
        <SvgXml xml={orangeDownArrow} height={20} width={20} />
      </Pressable>
      <View>
        <BillSummaryCard
          cutOffPrice={totalDiscountedPrice + deliveryCharges}
          deliveryCharge={deliveryCharges}
          itemPrice={TotalPrice}
          price={TotalPrice + deliveryCharges}
          savingPrice={totalDiscountedPrice - TotalPrice}
        />
        <PaymentPreferred setValue={setValue} value={value} />
      </View>
      <View style={styles.bottomLayout}>
        <Pressable onPress={gotoOrderSuccess}>
          <View style={styles.bottomCard}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
              }}>
              <Text style={styles.bottomCardText}>{cartItemCount} Item |</Text>
              {/* <View style={styles.straightLine} /> */}
              <Text style={[styles.bottomCardText, {fontFamily: 'Inter_Bold'}]}>
                ₹{(TotalPrice + deliveryCharges).toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles.bottomCardText,
                  {
                    fontSize: scaleFontSize(18),
                    fontFamily: 'Inter_SemiBold',
                    marginRight: horizontalScale(10),
                  },
                ]}>
                Pay Now
              </Text>
              <SvgXml xml={rightArrowIcon} height={15} width={9} />
            </View>
          </View>
        </Pressable>
      </View>
      <Modal
        isOpen={modalVisible}
        size={'full'}
        onClose={() => {
          setModalVisible(false);
          selAddress();
        }}>
        <Modal.Content
          mb={0}
          mt={'auto'}
          h={'60%'}
          borderTopLeftRadius={12}
          borderTopRightRadius={12}>
          <SelectAddress
            onClose={() => {
              setModalVisible(false);
              selAddress();
            }}
            onAddAddress={gotoAddAddress}
          />
        </Modal.Content>
      </Modal>
      <Loader isOpen={loaderVisible} />
    </ScrollView>
  );
};

export default Payment;
