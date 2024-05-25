import {Text, View, Image, Center, ChevronRightIcon, Button} from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  horizontalScale,
  scaleFontSize,
} from '../../assets/scaling';
import {Colors} from '../../constants/colors';
import {SvgXml} from 'react-native-svg';
import {width} from '../../assets/scaling';
import {location} from '../../assets/images/icons/location';
import {Pressable, StyleSheet} from 'react-native';
import ImageCarousel from '../../components/Carousel/ImageCarousel';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import {walletIcon} from '../../assets/images/icons/walletIcon';
import {receiptIcon} from '../../assets/images/icons/receiptIcon';
import {rightOrangeArrowIcon} from '../../assets/images/icons/rightOrangeArrow';
import { getSelectedAddress } from '../../api/localstorage';
import Loader from '../../components/Loader/Loader';
interface OrderSuccessProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'OrderSuccess'>;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ route,navigation }) => {
  const { item,Method} = route.params;
const ItemCount=item.boughtProductDetailsList.length;
var saving =0;
var boughtPrice =0;
item.boughtProductDetailsList.forEach(
  (item: { boughtPrice: number; savings: number}) => {
    boughtPrice += item.boughtPrice;
    saving += item.savings;
  },
);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [selectAddress, setSelectAddress] = useState({});
  const gotoOrderDetails = () => {
    navigation.navigate('SingleOrder',{data:item});
  };
  const gotoHome = () => {
    navigation.navigate('Home');
  };
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
    <View style={{flex: 1, backgroundColor: '#F9FAFB'}}>
      <View style={{alignSelf: 'center'}}>
        <Image
          alt="OrderAnimation"
          style={{
            marginTop: width < 380 ? 28 : 45,
            width: width < 380 ? 120 : 140,
            height: width < 380 ? 120 : 140,
          }}
          source={require('../../assets/images/icons/orderSuccess.gif')}
        />
      </View>
      <Text
        style={styles.OrderText}
        mt={width < 380 ? 0 : 2}
        // fontFamily={'Inter_Medium'}
        fontSize={width < 380 ? 'xl' : '2xl'}>
        Order Has been Placed Successfully
      </Text>
      <View
        h={16}
        borderRadius={10}
        marginRight={width < 380 ? 4 : 4}
        marginLeft={width < 380 ? 4 : 4}
        bg={'white'}
        flexDir={'row'}
        mt={width < 380 ? 12 : 12}
        alignItems={'center'}
        px={2}>
        <Center
          borderRadius={100}
          bg={'primary.400'}
          h={width < 380 ? 10 : 12}
          w={width < 380 ? 10 : 12}
          mr={2}>
          <SvgXml xml={location} height={20} width={20} />
        </Center>
        <View>
          <Text
            fontSize={width < 380 ? 14 : 16}
            color={'accent.900'}
            fontFamily={'Inter_Medium'}>
            Delivering to
          </Text>
          <Text
            fontSize={width < 380 ? 10 : 12}
            color={'accent.400'}
            fontFamily={'Inter_Medium'}>
            {`${selectAddress?.addressLine1},${selectAddress?.landmark},${selectAddress?.city},${selectAddress?.state}`}
          </Text>
        </View>
      </View>
      <View
        h={12}
        borderRadius={10}
        marginRight={width < 380 ? 4 : 4}
        marginLeft={width < 380 ? 4 : 4}
        bg={'white'}
        flexDir={'row'}
        mt={width < 380 ? 6 : 5}
        alignItems={'center'}
        px={2}>
        <SvgXml xml={walletIcon} height={24} width={24} />
        <View flexDir={'row'}>
          <Text
            fontSize={width < 380 ? 14 : 15}
            color={'accent.500'}
            ml={1}
            fontWeight={500}
            // fontFamily={'Inter_Medium'}
            >
            Payment Method
          </Text>
          <Text
            fontSize={width < 380 ? 14 : 15}
            color={'primary.500'}
            fontWeight={500}
            // fontFamily={'Inter_Medium'}
            ml={width < 380 ? 12 : 24}>
           {Method=='one'? 'Cash on Delivery':'Pay Online'} 
          </Text>
        </View>
      </View>
      <View
        h={12}
        borderRadius={10}
        marginRight={width < 380 ? 4 : 4}
        marginLeft={width < 380 ? 4 : 4}
        bg={'white'}
        flexDir={'row'}
        mt={width < 380 ? 6 : 4}
        mb={width < 380 ? 6 : 8}
        alignItems={'center'}
        px={2}>
        <SvgXml xml={receiptIcon} height={20} width={20} />
        <View flexDir={'row'} alignItems={'center'} justifyContent={'center'}>
          <Text
            fontSize={width < 380 ? 14 : 16}
            color={'accent.500'}
            ml={1}
            fontWeight={500}
            // fontFamily={'Inter_Medium'}
            >
            {ItemCount} items | ₹{boughtPrice}
          </Text>
          <Center
            rounded={6}
            bg={'success.400'}
            w={'auto'}
            h={5}
            px={1.5}
            ml={1.5}>
            <Text
              fontWeight={500}
              // fontFamily={'Inter_Medium'}
              fontSize={width < 380 ? 9 : 11}
              color={'white'}>
              SAVED ₹{saving}
            </Text>
          </Center>
          <Pressable onPress={gotoOrderDetails}>
            <Text
              fontSize={width < 380 ? 12 : 14}
              color={'primary.500'}
              fontWeight={500}
              // fontFamily={'Inter_Medium'}
              ml={width < 380 ? 3 : 12}>
              View Details
            </Text>
          </Pressable>
          <View ml={horizontalScale(1)} alignItems={'center'}>
            <SvgXml xml={rightOrangeArrowIcon} height={14} width={14} />
          </View>
        </View>
      </View>
      <ImageCarousel />
      <View h={100} w={width} bg={'white'} mt={width < 380 ? 6 : 3}>
        <Center flex={1} px={5}>
          <Button
            onPress={gotoHome}
            w={'100%'}
            h={50}
            rounded={12}
            colorScheme={'transparent'}
            bg={'primary.500'}
            _text={{
              fontSize: scaleFontSize(20),
              color: 'white',
              fontFamily: 'Inter_SemiBold',
            }}>
            Back to Home
          </Button>
        </Center>
      </View>
      <Loader isOpen={loaderVisible} />

    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  OrderText: {
    color: Colors.accent[700],
    fontSize: width < 380 ? 27 : 34,
    fontWeight: '600',
    textAlign: 'center',
  },
});
