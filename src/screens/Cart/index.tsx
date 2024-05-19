import {
  Button,
  Center,
  ChevronRightIcon,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'native-base';
import * as React from 'react';
import {CartItemCard} from '../../components/Cart/CartItemCard';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
  width,
} from '../../assets/scaling';
import {SvgXml} from 'react-native-svg';
import {orangeLocation} from '../../assets/images/icons/orangeLocation';
import SelectAddress from '../../components/SelectingAddress';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import BillSummaryCard from '../../components/BillSummaryCard';
import {useIsFocused} from '@react-navigation/native';
import {rightArrowIcon} from '../../assets/images/icons/rightArrow';
import GoBack from '../../components/Navigation/GoBack';
import {useSelector} from 'react-redux';
import {CartItem} from '../../redux/slices';
import {getSelectedAddress} from '../../api/localstorage';
import Loader from '../../components/Loader/Loader';
interface CartProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Cart'>;
}

const Cart: React.FC<CartProps> = ({navigation}) => {
  const [loaderVisible, setLoaderVisible] = React.useState(false);
  const [selectAddress, setSelectAddress] = React.useState({});
  const [isCartEmpty, setisCartEmpty] = React.useState(Boolean);
  const [totalDiscountedPrice, setTotalDiscountedPrice] = React.useState(0);
  const cartItems = useSelector((state: any) => state.cart);
  // console.log(cartItems);
  let temp = 0;
  const cartItemCount = cartItems.items.length;
  React.useEffect(() => {
    let temp = 0;
    cartItems.items.forEach(
      (item: {varietyList: any[]; discountPrice: number; quantity: number}) => {
        temp += item.varietyList[0].discountPrice * item.quantity;
      },
    );
    setTotalDiscountedPrice(temp);
  }, [cartItems]);
  // console.log(totalDiscountedPrice)
  const TotalPrice = cartItems.totalPrice + 25;
  // console.log(cartItemCount,TotalPrice)
  // const totalPrice = useSelector((state:CartItem)=> state.cart.totalPrice);
  const isAddressPresent = true;
  React.useEffect(() => {
    selAddress();
    if (cartItemCount <= 0) {
      setisCartEmpty(true);
    } else {
      setisCartEmpty(false);
    }
  }, [cartItemCount]);

  const [modalVisible, setModalVisible] = React.useState(false);
  const gotoPayment = () => {
    navigation.navigate('Payment');
  };
  const gotoAddAddress = () => {
    navigation.navigate('AddAddress', {title: 'Add'});
  };
  const gotoHome = () => {
    navigation.popToTop();
  };

  return (
    <View flex={1} bgColor={'accent.50'}>
      <View
        bg={'white'}
        w={'100%'}
        h={128}
        flexDir={'row'}
        alignItems={'center'}
        borderBottomColor={'accent.100'}
        borderBottomWidth={1}>
        <View flex={0.5}>
          <GoBack onPress={() => navigation.goBack()} />
        </View>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(18)}
          color={'accent.800'}
          lineHeight={21.78}
          letterSpacing={-0.04}>
          {isCartEmpty ? 'Cart' : `Cart(${cartItemCount})`}
        </Text>
      </View>
      {isCartEmpty ? (
        <View flex={1} alignItems={'center'} justifyContent={'center'}>
          <Image
            alt="empty cart"
            source={require('../../assets/images/icons/empty-cart.png')}
            height={150}
            width={150}
          />
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={scaleFontSize(18)}
            color={'accent.700'}
            lineHeight={19.36}
            letterSpacing={-0.04}>
            Cart is Empty
          </Text>
        </View>
      ) : (
        <ScrollView flex={0.8}>
          <View bg={'white'} mt={verticalScale(15)}>
            {cartItems.items.map((data: {id: React.Key | null | undefined}) => (
              <CartItemCard key={data.id} item={data} />
            ))}
          </View>
          <BillSummaryCard
            cutOffPrice={totalDiscountedPrice}
            deliveryCharge={25}
            itemPrice={TotalPrice - 25}
            price={TotalPrice}
            savingPrice={totalDiscountedPrice - (TotalPrice - 25)}
          />
        </ScrollView>
      )}
      <Modal
        isOpen={modalVisible}
        size={'full'}
        onClose={() => setModalVisible(false)}>
        <Modal.Content
          mb={0}
          mt={'auto'}
          h={'60%'}
          bgColor={'white'}
          borderTopLeftRadius={12}
          borderTopRightRadius={12}>
          <SelectAddress
            onClose={() => setModalVisible(false)}
            onAddAddress={gotoAddAddress}
          />
        </Modal.Content>
      </Modal>
      {isCartEmpty ? (
        <View
          flex={0.2}
          w={width}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          bg={'white'}
          shadow={1}
          px={horizontalScale(15)}
          alignItems={'center'}
          justifyContent={'center'}>
          <Button
            w={'100%'}
            bg={'primary.500'}
            rounded={12}
            py={verticalScale(15)}
            colorScheme={'transparent'}
            onPress={gotoHome}
            _text={{
              fontFamily: 'Inter_SemiBold',
              fontSize: scaleFontSize(20),
              color: 'primary.50',
              lineHeight: 24.2,
              letterSpacing: -0.04,
            }}>
            Continue Shopping
          </Button>
        </View>
      ) : (
        <View
          flex={isAddressPresent ? 0.3 : 0.2}
          // h={isAddressPresent ? 150 : 100}
          w={width}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          bg={'white'}
          shadow={1}>
          {isAddressPresent && (
            <View
              flexDir={'row'}
              px={5}
              pt={5}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <View>
                <Text
                  color={'#000000'}
                  fontFamily={'Inter_Medium'}
                  fontSize={scaleFontSize(18)}
                  lineHeight={21.78}
                  letterSpacing={-0.04}>
                  Deliver to
                </Text>
                <Text
                  // numberOfLines={1}
                  style={{width: '90%'}}
                  // width={100}
                  fontFamily={'Inter_Medium'}
                  fontSize={scaleFontSize(12)}
                  color={'accent.600'}
                  lineHeight={14}
                  letterSpacing={-0.04}>
                  {selectAddress !== null
                    ? `${selectAddress?.addressLine1},${selectAddress?.landmark},${selectAddress?.city},${selectAddress?.state}`
                    : `Select the Address`}
                </Text>
              </View>
              <Pressable onPress={() => setModalVisible(true)}>
                <View flexDir={'row'} alignItems={'center'}>
                  <SvgXml xml={orangeLocation} width={16} height={16} />
                  <Text
                    fontFamily={'Inter_Regular'}
                    color={'primary.500'}
                    ml={1}
                    fontSize={scaleFontSize(18)}
                    lineHeight={21.78}
                    letterSpacing={-0.04}>
                    Change
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
          <Center flex={1} px={5}>
            <Button
              w={'100%'}
              py={verticalScale(15)}
              rounded={12}
              colorScheme={'transparent'}
              bg={'primary.500'}
              onPress={gotoPayment}>
              <View
                w={'100%'}
                flexDir={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                px={horizontalScale(5)}>
                <View flexDir={'row'} alignItems={'center'}>
                  <Text
                    color={'primary.50'}
                    fontFamily={'Inter_SemiBold'}
                    fontSize={scaleFontSize(20)}
                    lineHeight={24.2}
                    letterSpacing={-0.04}>
                    {cartItemCount} Item |{' '}
                  </Text>
                  <Text
                    fontFamily={'Inter_Bold'}
                    fontWeight={600}
                    fontSize={scaleFontSize(20)}
                    color={'primary.50'}
                    lineHeight={24.2}
                    letterSpacing={-0.04}>
                    ₹{TotalPrice.toFixed(2)}
                  </Text>
                </View>
                <View flexDir={'row'} alignItems={'center'}>
                  <Text
                    color={'primary.50'}
                    mr={horizontalScale(10)}
                    fontFamily={'Inter_SemiBold'}
                    fontSize={scaleFontSize(18)}
                    textAlign={'center'}
                    lineHeight={21.78}
                    letterSpacing={-0.04}>
                    {isAddressPresent ? 'Proceed to Pay' : 'Checkout'}
                  </Text>
                  <SvgXml xml={rightArrowIcon} height={15} width={15} />
                </View>
              </View>
            </Button>
          </Center>
        </View>
      )}
      <Loader isOpen={loaderVisible} />
    </View>
  );
};

export default Cart;
