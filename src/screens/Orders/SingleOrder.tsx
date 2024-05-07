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
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import {deliveryMan} from '../../assets/images/icons/deliveryMan';
import {phone} from '../../assets/images/icons/phone';
import {CallNumber} from '../../utils/launchIntents';
import GoBack from '../../components/Navigation/GoBack';

interface SingleOrderProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'SingleOrder'>;
}

const SingleOrder: React.FC<SingleOrderProps> = ({navigation}) => {
  const [orderStatus, setOrderStatus] = React.useState('Packaging');
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

  return (
    <View flex={1} bgColor={'accent.50'}>
      <View
        bgColor={'white'}
        h={100}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        borderBottomWidth={1}
        borderBottomColor={'accent.100'}>
        <View flexDir={'row'} alignItems={'center'}>
          <GoBack onPress={() => navigation.goBack()} />
          <View ml={horizontalScale(8)} style={{gap: verticalScale(2)}}>
            <Text
              fontFamily={'Inter_Medium'}
              color={'accent.800'}
              fontSize={scaleFontSize(18)}
              lineHeight={21.78}
              letterSpacing={-0.04}>
              Order #189073202237
            </Text>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(12)}
              color={'accent.400'}
              lineHeight={14.52}
              letterSpacing={-0.04}>
              Placed at 07/03/2024 at 09:12PM
            </Text>
          </View>
        </View>
        <Center
          rounded={4}
          bg={orderInfo.color}
          py={verticalScale(4)}
          px={horizontalScale(6)}
          mr={horizontalScale(20)}>
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={scaleFontSize(12)}
            color={'white'}
            lineHeight={14.52}
            letterSpacing={-0.04}>
            {orderStatus}
          </Text>
        </Center>
      </View>
      <ScrollView flex={1} bgColor={'accent.50'}>
        {(orderStatus === 'Out For Delivery' ||
          orderStatus === 'Delivered') && (
          <View
            bg={'white'}
            borderRadius={100}
            borderWidth={1}
            borderColor={'accent.100'}
            p={3}
            mx={horizontalScale(15)}
            mt={verticalScale(15)}
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
              <View ml={horizontalScale(10)} style={{gap: verticalScale(2)}}>
                <Text
                  fontFamily={'Inter_Medium'}
                  fontSize={scaleFontSize(16)}
                  color={'accent.900'}
                  lineHeight={19.36}
                  letterSpacing={-0.04}>
                  John Doe
                </Text>
                <Text
                  fontFamily={'Inter_Medium'}
                  fontSize={scaleFontSize(14)}
                  color={'accent.600'}
                  lineHeight={16.94}
                  letterSpacing={-0.04}>
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
          h={verticalScale(60)}
          bg={'white'}
          flexDir={'row'}
          alignItems={'center'}
          px={horizontalScale(20)}
          mt={verticalScale(15)}
          style={{gap: horizontalScale(12)}}>
          <Center borderRadius={100} bg={'primary.400'} h={10} w={10}>
            <SvgXml xml={timer} height={20} width={20} />
          </Center>
          <View style={{gap: verticalScale(2)}}>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(16)}
              color={'accent.900'}
              lineHeight={19.36}
              letterSpacing={-0.04}>
              {orderInfo.receivedStatus}
            </Text>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(12)}
              color={'accent.400'}
              lineHeight={14.52}
              letterSpacing={-0.04}>
              {orderInfo.time}
            </Text>
          </View>
        </View>
        <View
          h={verticalScale(60)}
          bg={'white'}
          flexDir={'row'}
          mt={verticalScale(1)}
          mb={verticalScale(15)}
          alignItems={'center'}
          px={horizontalScale(20)}
          style={{gap: horizontalScale(12)}}>
          <Center borderRadius={100} bg={'primary.400'} h={10} w={10}>
            <SvgXml xml={location} height={20} width={20} />
          </Center>
          <View style={{gap: verticalScale(2)}}>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(16)}
              color={'accent.900'}
              lineHeight={19.36}
              letterSpacing={-0.04}>
              {orderInfo.deliveredStatus}
            </Text>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(12)}
              color={'accent.400'}
              lineHeight={14.52}
              letterSpacing={-0.04}>
              No. 46, 1st floor, near police
            </Text>
          </View>
        </View>
        <View bg={'white'}>
          <SingleOrderCard />
          <View borderWidth={1} borderColor={'accent.100'} />
          <SingleOrderCard />
          <View
            borderStyle={'dashed'}
            borderWidth={1}
            borderColor={'#D1D5DB'}
          />
          <View
            px={horizontalScale(20)}
            py={verticalScale(20)}
            style={{gap: 10}}>
            <Text
              fontFamily={'Inter_SemiBold'}
              fontSize={scaleFontSize(20)}
              color={'accent.900'}
              lineHeight={24.2}
              letterSpacing={-0.01}>
              Bill Summary
            </Text>
            <View flexDir={'row'} justifyContent={'space-between'}>
              <Text
                fontFamily={'Inter_Medium'}
                fontSize={scaleFontSize(14)}
                color={'accent.500'}
                lineHeight={16.94}
                letterSpacing={-0.04}>
                Item Total
              </Text>
              <Text
                fontFamily={'Inter_Medium'}
                fontSize={scaleFontSize(14)}
                color={'accent.800'}
                lineHeight={16.94}
                letterSpacing={-0.04}>
                ₹33
              </Text>
            </View>
            <View flexDir={'row'} justifyContent={'space-between'}>
              <Text
                fontFamily={'Inter_Medium'}
                fontSize={scaleFontSize(14)}
                color={'accent.500'}
                lineHeight={16.94}
                letterSpacing={-0.04}>
                Delivery Charge
              </Text>
              <Text
                fontFamily={'Inter_Medium'}
                fontSize={scaleFontSize(14)}
                color={'accent.800'}
                lineHeight={16.94}
                letterSpacing={-0.04}>
                ₹25
              </Text>
            </View>
            <View borderWidth={1} borderRadius={1} borderColor={'accent.100'} />
            <View flexDir={'row'} justifyContent={'space-between'}>
              <View
                my={verticalScale(1)}
                justifyContent={'center'}
                style={{gap: 2}}>
                <Text
                  fontFamily={'Inter_Medium'}
                  fontSize={scaleFontSize(14)}
                  color={'accent.900'}
                  lineHeight={16.94}
                  letterSpacing={-0.04}>
                  Total Bill
                </Text>
                <Text
                  fontFamily={'Inter_Regular'}
                  fontSize={scaleFontSize(12)}
                  color={'accent.500'}
                  lineHeight={14.4}
                  letterSpacing={-0.03}>
                  Incl. all taxes and charges
                </Text>
              </View>
              <View style={{gap: 4}}>
                <View flexDir={'row'} alignItems={'center'} style={{gap: 4}}>
                  <Text
                    fontFamily={'Inter_Regular'}
                    fontSize={scaleFontSize(10)}
                    color={'accent.500'}
                    strikeThrough
                    lineHeight={12.1}
                    letterSpacing={-0.04}>
                    ₹87.49
                  </Text>
                  <Text
                    fontFamily={'Inter_SemiBold'}
                    fontSize={scaleFontSize(14)}
                    color={'accent.800'}
                    lineHeight={16.94}
                    letterSpacing={-0.04}>
                    ₹87.49
                  </Text>
                </View>
                <Center
                  rounded={4}
                  bg={'#4ADE80'}
                  py={verticalScale(4)}
                  px={horizontalScale(6)}>
                  <Text
                    fontFamily={'Inter_Medium'}
                    fontSize={scaleFontSize(10)}
                    color={'white'}
                    lineHeight={12.1}
                    letterSpacing={-0.04}>
                    SAVING ₹9.51
                  </Text>
                </Center>
              </View>
            </View>
          </View>
        </View>
        <View flex={1} mb={horizontalScale(50)} mx={horizontalScale(20)}>
          <Button
            borderWidth={2}
            borderColor={'accent.200'}
            variant={'outline'}
            colorScheme={'muted'}
            mt={verticalScale(30)}
            px={horizontalScale(36)}
            w={'100%'}
            py={verticalScale(15)}
            rounded={16}
            _text={{
              fontFamily: 'Inter_Medium',
              fontSize: scaleFontSize(20),
              color: '#EF4444',
              lineHeight: 24.2,
              letterSpacing: -0.04,
            }}
            onPress={() => CallNumber(1234567890)}>
            Need Help?
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default SingleOrder;
