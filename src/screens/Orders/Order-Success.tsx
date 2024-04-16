import {Text, View, Image, Center, ChevronRightIcon, Button} from 'native-base';
import React from 'react';
import {horizontalScale, verticalScale} from '../../assets/scaling';
import {Colors} from '../../constants/colors';
import {SvgXml} from 'react-native-svg';
import {width} from '../../assets/scaling';
import {location} from '../../assets/images/icons/location';
import {StyleSheet} from 'react-native';
import ImageCarousel from '../../components/Carousel/ImageCarousel';

const OrderSuccess = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#F9FAFB'}}>
      <View style={{alignSelf: 'center'}}>
        <Image
          alt="OrderAnimation"
          style={{marginTop: verticalScale(25), width: 120, height: 120}}
          source={require('../../assets/images/Order-Success.png')}
        />
      </View>
      <Text style={styles.OrderText} fontSize={'xl'}>
        Order Has been Placed Successfully
      </Text>
      <View
        h={16}
        borderRadius={10}
        marginRight={3}
        marginLeft={3}
        bg={'white'}
        flexDir={'row'}
        mt={12}
        alignItems={'center'}
        px={2}>
        <Center borderRadius={100} bg={'primary.400'} h={10} w={10} mr={2}>
          <SvgXml xml={location} height={20} width={20} />
        </Center>
        <View>
          <Text fontSize={'fs14'} color={'accent.900'} fontWeight={500}>
            Delivering to
          </Text>
          <Text fontSize={'fs10'} color={'accent.400'} fontWeight={500}>
            No.46, 1st floor, near police
          </Text>
        </View>
      </View>
      <View
        h={12}
        borderRadius={10}
        marginRight={3}
        marginLeft={3}
        bg={'white'}
        flexDir={'row'}
        mt={4}
        alignItems={'center'}
        px={2}>
        <Image
          style={{height: 16, width: 16}}
          alt="PaymentIcon"
          source={require('../../assets/images/icons/PaymentIcon.png')}
        />
        <View flexDir={'row'}>
          <Text fontSize={'fs14'} color={'accent.500'} ml={1} fontWeight={500}>
            Payment Method
          </Text>
          <Text
            fontSize={'fs14'}
            color={'primary.500'}
            fontWeight={500}
            ml={16}>
            Cash on Delivery
          </Text>
        </View>
      </View>
      <View
        h={12}
        borderRadius={10}
        marginRight={3}
        marginLeft={3}
        bg={'white'}
        flexDir={'row'}
        mt={4}
        mb={4}
        alignItems={'center'}
        px={2}>
        <Image
          style={{height: 16, width: 16}}
          alt="PaymentIcon"
          source={require('../../assets/images/icons/WalletIcon.png')}></Image>
        <View flexDir={'row'} alignItems={'center'} justifyContent={'center'}>
          <Text fontSize={'fs14'} color={'accent.500'} ml={1} fontWeight={500}>
            2 items | ₹87.49
          </Text>
          <Center
            rounded={6}
            bg={'success.400'}
            w={'auto'}
            h={5}
            px={2}
            ml={0.5}>
            <Text fontSize={'fs10'} color={'white'}>
              SAVED ₹9.51
            </Text>
          </Center>
          <Text fontSize={'fs12'} color={'primary.500'} fontWeight={500} ml={6}>
            View Details
          </Text>
          <View>
            <Image
              alt="smallright"
              source={require('../../assets/images/icons/smallright.png')}></Image>
          </View>
        </View>
      </View>
      <ImageCarousel />
      <View h={100} w={width} bg={'white'} mt={4}>
        <Center flex={1} px={5}>
          <Button
            w={'100%'}
            h={50}
            rounded={12}
            bg={'primary.500'}
            _text={{
              fontSize: 'lg',
              color: 'white',
              fontWeight: '600',
            }}>
            Back to Home
          </Button>
        </Center>
      </View>
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  OrderText: {
    color: Colors.accent[700],
    fontSize: 27,
    fontWeight: '600',
    textAlign: 'center',
  },
});
