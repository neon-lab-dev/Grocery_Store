import {
  Button,
  Center,
  ChevronRightIcon,
  Divider,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'native-base';
import * as React from 'react';
import {CartItemCard} from './cart_item_card';
import {scaleFontSize, verticalScale, width} from '../../assets/scaling';
import {SvgXml} from 'react-native-svg';
import {orangeLocation} from '../../assets/images/icons/orangeLocation';
import SelectAddress from '../../components/SelectingAddress';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import BillSummaryCard from '../../components/BillSummaryCard';
interface CartProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Cart'>;
}
const item = {
  name: 'Cadbury Bournville Rich Cocoa 70% Dark',
  image: require('../../assets/images/Product-Image/chocolate.png'),
  size: '200 g',
  quantity: 1,
  discount_price: 42,
  actual_price: 58,
};

const Cart: React.FC<CartProps> = ({navigation}) => {
  const isAddressPresent = true;
  const [modalVisible, setModalVisible] = React.useState(false);
  const gotoPayment = () => {
    navigation.navigate('Payment');
  };
  return (
    <View flex={1} justifyContent={'space-between'}>
      <ScrollView flex={0.8} mt={verticalScale(10)}>
        <View bg={'white'}>
          <CartItemCard item={item} />
          <CartItemCard item={item} />
          <CartItemCard item={item} />
          <CartItemCard item={item} />
          <CartItemCard item={item} />
        </View>
        {/* <View p={5} bgColor={'white'} borderRadius={14} m={5}>
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
        </View> */}
        <BillSummaryCard
          cutOffPrice={87.49}
          deliveryCharge={25}
          itemPrice={33}
          price={87.49}
          savingPrice={9.51}
        />
      </ScrollView>
      <Modal isOpen={modalVisible} size={'full'}>
        <Modal.Content
          mb={0}
          mt={'auto'}
          borderTopLeftRadius={12}
          borderTopRightRadius={12}>
          <SelectAddress
            onClose={() => setModalVisible(false)}
            navigation={navigation}
          />
        </Modal.Content>
      </Modal>
      <View
        flex={isAddressPresent ? 0.3 : 0.2}
        // h={isAddressPresent ? 150 : 100}
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
            <Pressable onPress={() => setModalVisible(true)}>
              <View flexDir={'row'} alignItems={'center'}>
                <SvgXml xml={orangeLocation} width={16} height={16} />
                <Text color={'primary.500'} ml={1} fontSize={scaleFontSize(18)}>
                  Change
                </Text>
              </View>
            </Pressable>
          </View>
        )}
        <Center flex={1} px={5}>
          <Button
            w={'100%'}
            h={50}
            rounded={12}
            colorScheme={'orange'}
            bg={'primary.500'}
            onPress={gotoPayment}>
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
