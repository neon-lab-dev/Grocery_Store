import {Button, Center, Text, View} from 'native-base';
import * as React from 'react';
import {SvgXml} from 'react-native-svg';
import {timer} from '../../assets/images/icons/time-svgrepo';
import {location} from '../../assets/images/icons/address-location-map';
import {SingleOrderCard} from './single_order_card';
import {horizontalScale} from '../../assets/scaling';

const SingleOrder: React.FC = () => {
  return (
    <View>
      <View
        h={20}
        bg={'white'}
        flexDir={'row'}
        mt={5}
        alignItems={'center'}
        px={5}>
        <Center borderRadius={100} bg={'primary.400'} h={10} w={10} mr={2}>
          <SvgXml xml={timer} height={20} width={20} />
        </Center>
        <View>
          <Text fontSize={'fs16'}>Order Arrived at</Text>
          <Text fontSize={'fs12'} color={'accent.400'}>
            07/03/2024 at 09:12PM
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
          <Text fontSize={'fs16'}>Delivered to</Text>
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
              rounded={8}
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
      <Center>
        <Button
          variant={'outline'}
          mt={5}
          w={horizontalScale(300)}
          h={50}
          alignSelf={'center'}
          rounded={16}
          _text={{fontSize: 15, color: 'error.300'}}>
          Need Help?
        </Button>
      </Center>
    </View>
  );
};

export default SingleOrder;
