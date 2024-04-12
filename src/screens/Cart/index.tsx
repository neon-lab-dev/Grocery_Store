import {
  Button,
  Center,
  ChevronRightIcon,
  Divider,
  ScrollView,
  Text,
  View,
} from 'native-base';
import * as React from 'react';
import {CartItemCard} from './cart_item_card';
import {scaleFontSize, verticalScale, width} from '../../assets/scaling';
import {SvgXml} from 'react-native-svg';
import {orangeLocation} from '../../assets/images/icons/orangeLocation';

const item = {
  name: 'Cadbury Bournville Rich Cocoa 70% Dark',
  image: require('../../assets/images/Product-Image/chocolate.png'),
  size: '200 g',
  quantity: 1,
  discount_price: 42,
  actual_price: 58,
};

const Cart: React.FC = ({navigation}) => {
  const isAddressPresent = false;
  const gotoAddAddress = () => {
    navigation.navigate('AddAddress');
  };
  return (
    <View flex={1} justifyContent={'space-between'}>
      <ScrollView h={300} my={verticalScale(20)}>
        <View bg={'white'} flexShrink={1}>
          <CartItemCard item={item} />
          <CartItemCard item={item} />
          <CartItemCard item={item} />
          <CartItemCard item={item} />
        </View>
      </ScrollView>
      <View p={5} bgColor={'white'} borderRadius={14} m={5}>
        <Text fontSize={'fs20'}>Bill Summary</Text>
        <View flexDir={'row'} justifyContent={'space-between'}>
          <Text fontSize={'fs14'} color={'accent.500'}>
            Item Total
          </Text>
          <Text fontSize={'fs14'}>₹33</Text>
        </View>
        <View flexDir={'row'} justifyContent={'space-between'}>
          <Text fontSize={'fs14'} color={'accent.500'}>
            Delivery Charge
          </Text>
          <Text fontSize={'fs14'}>₹25</Text>
        </View>
        <View
          borderWidth={1}
          borderRadius={1}
          borderColor={'accent.100'}
          my={2}
        />
        <View flexDir={'row'} justifyContent={'space-between'} pt={1}>
          <Text fontSize={'fs14'}>Total Bill</Text>
          <Center flexDir={'row'}>
            <Text fontSize={'fs10'} color={'accent.500'} strikeThrough pr={1}>
              ₹87.49
            </Text>
            <Text bold fontSize={'fs14'}>
              ₹87.49
            </Text>
          </Center>
        </View>
        <View flexDir={'row'} justifyContent={'space-between'}>
          <Text fontSize={'fs12'} color={'accent.500'}>
            Incl. all taxes and charges
          </Text>
          <Center rounded={8} bg={'success.400'} w={'auto'} h={6} px={2}>
            <Text fontSize={'fs10'} color={'white'}>
              SAVING ₹9.51
            </Text>
          </Center>
        </View>
      </View>
      <View
        h={isAddressPresent ? 150 : 100}
        w={width}
        borderTopLeftRadius={14}
        borderTopRightRadius={14}
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
              <Text fontSize={scaleFontSize(18)}>Deliver to</Text>
              <Text fontSize={scaleFontSize(12)} color={'accent.500'}>
                1st Floor, ABC street, XYZ City
              </Text>
            </View>
            <View flexDir={'row'} alignItems={'center'}>
              <SvgXml xml={orangeLocation} width={16} height={16} />
              <Text color={'primary.500'} ml={1} fontSize={scaleFontSize(18)}>
                Change
              </Text>
            </View>
          </View>
        )}
        <Center flex={1} px={5}>
          <Button
            w={'100%'}
            h={50}
            rounded={12}
            bg={'primary.500'}
            onPress={!isAddressPresent ? gotoAddAddress : null}>
            <View
              w={'100%'}
              flexDir={'row'}
              justifyContent={'space-between'}
              px={5}>
              <View flexDir={'row'} alignItems={'center'}>
                <Text color={'white'} fontSize={scaleFontSize(20)}>
                  1 Item
                </Text>
                <Divider
                  orientation="vertical"
                  bgColor={'white'}
                  borderColor={'white'}
                  mx={1}
                  borderWidth={0.8}
                />
                <Text fontSize={scaleFontSize(20)} color={'white'}>
                  ₹42
                </Text>
              </View>
              <View flexDir={'row'} alignItems={'center'}>
                <Text color={'white'} mr={2} fontSize={scaleFontSize(18)}>
                  {isAddressPresent ? 'Proceed to pay' : 'Checkout'}
                </Text>
                <ChevronRightIcon color={'white'} />
              </View>
            </View>
          </Button>
        </Center>
      </View>
    </View>
  );
};

export default Cart;
