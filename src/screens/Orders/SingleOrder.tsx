/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Center,
  ChevronLeftIcon,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'native-base';
import * as React from 'react';
import {SvgXml} from 'react-native-svg';
import {timer} from '../../assets/images/icons/time-svgrepo';
import {location} from '../../assets/images/icons/location';
import {SingleOrderCard} from '../../components/Orders/SingleOrderCard';
import {horizontalScale, scaleFontSize} from '../../assets/scaling';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import {deliveryMan} from '../../assets/images/icons/deliveryMan';
import {phone} from '../../assets/images/icons/phone';
import {CallNumber} from '../../utils/launchIntents';

interface SingleOrderProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'SingleOrder'>;
}

const SingleOrder: React.FC<SingleOrderProps> = ({navigation}) => {
  const [orderStatus, setOrderStatus] = React.useState('Out For Delivery');
  const [orderInfo, setOrderInfo] = React.useState({
    receivedStatus: 'Order Received',
    deliveredStatus: 'Delivering to',
    color: '#EAB308',
    time: '10:20PM, 8 Mar, 2024',
  });
  React.useEffect(() => {
    switch (orderStatus) {
      case 'Processing':
        setOrderInfo({
          receivedStatus: 'Order Received',
          deliveredStatus: 'Delivering to',
          color: '#EAB308',
          time: '10:20PM, 8 Mar, 2024',
        });
        break;
      case 'Packaging':
        setOrderInfo({
          receivedStatus: 'Order Packaging',
          deliveredStatus: 'Delivering to',
          color: '#4455EF',
          time: '01:15 AM, 9 Mar, 2024',
        });
        break;
      case 'Out For Delivery':
        setOrderInfo({
          receivedStatus: 'On the Way',
          deliveredStatus: 'Delivering to',
          color: '#F97316',
          time: '09:15 AM, 9 Mar, 2024',
        });
        break;
      case 'Delivered':
        setOrderInfo({
          receivedStatus: 'Order Arrived at',
          deliveredStatus: 'Delivered to',
          color: '#22C55E',
          time: '09:15 AM, 9 Mar, 2024',
        });
        break;
      default:
        setOrderStatus('Processing');
        setOrderInfo({
          receivedStatus: 'Order Received',
          deliveredStatus: 'Delivering to',
          color: '#EAB308',
          time: '10:20PM, 8 Mar, 2024',
        });
        break;
    }
  }, [orderStatus]);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitleComponent,
      headerLeft: headerLeftComponent,
      headerRight: headerRightComponent,
    });
  }, [orderStatus, orderInfo]);

  const headerTitleComponent = () => (
    <View>
      <Text fontSize={'fs18'}>Order #189073202237</Text>
      <Text fontSize={'fs12'} color={'accent.400'}>
        Placed at 07/03/2024 at 09:12PM
      </Text>
    </View>
  );

  const headerLeftComponent = () => (
    <ChevronLeftIcon
      size={'md'}
      ml={5}
      color={'black'}
      onPress={() => navigation.goBack()}
    />
  );
  const headerRightComponent = () => (
    <Center
      rounded={4}
      bg={orderInfo.color}
      w={'auto'}
      p={1}
      mr={horizontalScale(10)}>
      <Text fontSize={'fs12'} color={'white'}>
        {orderStatus}
      </Text>
    </Center>
  );
  return (
    <ScrollView flex={1}>
      {(orderStatus === 'Out For Delivery' || orderStatus === 'Delivered') && (
        <View
          bg={'white'}
          borderRadius={100}
          p={3}
          mx={5}
          mt={5}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <View flexDir={'row'} alignItems={'center'}>
            <Center
              bgColor={'primary.50'}
              p={3}
              borderRadius={100}
              borderWidth={1}
              borderColor={'primary.500'}>
              <SvgXml xml={deliveryMan} height={20} width={20} />
            </Center>
            <View ml={1}>
              <Text fontSize={scaleFontSize(16)}>John Doe</Text>
              <Text fontSize={scaleFontSize(14)} color={'accent.600'}>
                TN 23 AC 2942
              </Text>
            </View>
          </View>
          {orderStatus === 'Out For Delivery' && (
            <Pressable onPress={() => CallNumber(1234567890)}>
              <Center
                borderWidth={4}
                bg={'primary.500'}
                borderColor={'#FED7AA'}
                borderRadius={100}
                p={1}>
                <SvgXml xml={phone} height={34} width={34} />
              </Center>
            </Pressable>
          )}
        </View>
      )}
      <View
        h={20}
        bg={'white'}
        flexDir={'row'}
        alignItems={'center'}
        px={5}
        mt={5}>
        <Center borderRadius={100} bg={'primary.400'} h={10} w={10} mr={2}>
          <SvgXml xml={timer} height={20} width={20} />
        </Center>
        <View>
          <Text fontSize={'fs16'}>{orderInfo.receivedStatus}</Text>
          <Text fontSize={'fs12'} color={'accent.400'}>
            {orderInfo.time}
          </Text>
        </View>
      </View>
      <View
        h={20}
        bg={'white'}
        flexDir={'row'}
        mt={0.5}
        mb={4}
        alignItems={'center'}
        px={5}>
        <Center borderRadius={100} bg={'primary.400'} h={10} w={10} mr={2}>
          <SvgXml xml={location} height={20} width={20} />
        </Center>
        <View>
          <Text fontSize={'fs16'}>{orderInfo.deliveredStatus}</Text>
          <Text fontSize={'fs12'} color={'accent.400'}>
            No. 46, 1st floor, near police
          </Text>
        </View>
      </View>
      <View bg={'white'}>
        <SingleOrderCard />
        <SingleOrderCard />
        <View
          borderStyle={'dashed'}
          borderWidth={1}
          borderRadius={1}
          borderColor={'accent.100'}
        />
        <View px={5}>
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
              <Text fontSize={'fs14'}>₹87.49</Text>
            </Center>
          </View>
          <View flexDir={'row'} justifyContent={'space-between'}>
            <Text fontSize={'fs12'} color={'accent.500'}>
              Incl. all taxes and charges
            </Text>
            <Center
              rounded={4}
              bg={'success.400'}
              w={'auto'}
              h={6}
              px={2}
              mb={5}>
              <Text fontSize={'fs10'} color={'white'}>
                SAVING ₹9.51
              </Text>
            </Center>
          </View>
        </View>
      </View>
      <Center mb={horizontalScale(50)}>
        <Button
          variant={'outline'}
          colorScheme={'orange'}
          mt={5}
          w={horizontalScale(300)}
          h={50}
          alignSelf={'center'}
          rounded={16}
          _text={{fontSize: 15, color: 'error.300'}}
          onPress={() => CallNumber(1234567890)}>
          Need Help?
        </Button>
      </Center>
    </ScrollView>
  );
};

export default SingleOrder;