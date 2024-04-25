import {Text, View, Image, Center, ChevronRightIcon, Button} from 'native-base';
import React from 'react';
import {horizontalScale, verticalScale} from '../../assets/scaling';
import {Colors} from '../../constants/colors';
import {SvgXml} from 'react-native-svg';
import {width} from '../../assets/scaling';
import {location} from '../../assets/images/icons/location';
import {Pressable, StyleSheet} from 'react-native';
import ImageCarousel from '../../components/Carousel/ImageCarousel';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
interface OrderSuccessProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'OrderSuccess'>;
}
const OrderSuccess: React.FC<OrderSuccessProps> = ({navigation}) => {
  const gotoOrderDetails = () => {
    navigation.navigate('SingleOrder');
  };
  const gotoHome = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={{flex: 1, backgroundColor: '#F9FAFB'}}>
      <View style={{alignSelf: 'center'}}>
        <Image
          alt="OrderAnimation"
          style={{marginTop: (width<380)?(28):(45), width: (width<380)?(120):(140), height: (width<380)?(120):(140)}}
          source={require('../../assets/images/Order-Success.png')}
        />
      </View>
      <Text style={styles.OrderText} mt={(width<380)?(0):(2)} fontSize={'xl'}>
        Order Has been Placed Successfully
      </Text>
      <View
        h={16}
        borderRadius={10}
        marginRight={(width<380)?(4):(4)}
        marginLeft={(width<380)?(4):(4)}
        bg={'white'}
        flexDir={'row'}
        mt={(width<380)?(12):(12)}
        alignItems={'center'}
        px={2}>
        <Center borderRadius={100} bg={'primary.400'} h={(width<380)?(10):(12)} w={(width<380)?(10):(12)} mr={2}>
          <SvgXml xml={location} height={20} width={20} />
        </Center>
        <View>
          <Text fontSize={(width<380)?(14):(16)} color={'accent.900'} fontWeight={500}>
            Delivering to
          </Text>
          <Text fontSize={(width<380)?(10):(12)} color={'accent.400'} fontWeight={500}>
            No.46, 1st floor, near police
          </Text>
        </View>
      </View>
      <View
        h={12}
        borderRadius={10}
        marginRight={(width<380)?(4):(4)}
        marginLeft={(width<380)?(4):(4)}
        bg={'white'}
        flexDir={'row'}
        mt={(width<380)?(6):(5)}
        alignItems={'center'}
        px={2}>
        <Image
          style={{height: 20, width: 20}}
          alt="PaymentIcon"
          source={require('../../assets/images/icons/PaymentIcon.png')}
        />
        <View flexDir={'row'}>
          <Text fontSize={(width<380)?(14):(15)} color={'accent.500'} ml={1} fontWeight={500}>
            Payment Method
          </Text>
          <Text
            fontSize={(width<380)?(14):(15)}
            color={'primary.500'}
            fontWeight={500}
            ml={(width<380)?(12):(20)}>
            Cash on Delivery
          </Text>
        </View>
      </View>
      <View
        h={12}
        borderRadius={10}
        marginRight={(width<380)?(4):(4)}
        marginLeft={(width<380)?(4):(4)}
        bg={'white'}
        flexDir={'row'}
        mt={(width<380)?(6):(4)}
        mb={(width<380)?(6):(4)}
        alignItems={'center'}
        px={2}>
        <Image
          style={{height: 20, width: 20}}
          alt="PaymentIcon"
          source={require('../../assets/images/icons/WalletIcon.png')}></Image>
        <View flexDir={'row'} alignItems={'center'} justifyContent={'center'}>
          <Text fontSize={(width<380)?(14):(16)} color={'accent.500'} ml={1} fontWeight={500}>
            2 items | ₹87.49
          </Text>
          <Center
            rounded={6}
            bg={'success.400'}
            w={'auto'}
            h={5}
            px={1.5}
            ml={1.5}>
            <Text fontSize={(width<380)?(9):(11)} color={'white'}>
              SAVED ₹9.51
            </Text>
          </Center>
          <Pressable onPress={gotoOrderDetails}>
            <Text
              fontSize={(width<380)?(12):(14)}
              color={'primary.500'}
              fontWeight={500}
              ml={(width<380)?(3):(6)}>
              View Details
            </Text>
          </Pressable>
          <View>
            <Image
              alt="smallright"
              source={require('../../assets/images/icons/smallright.png')}></Image>
          </View>
        </View>
      </View>
      <ImageCarousel />
      <View h={100} w={width} bg={'white'} mt={(width<380)?(6):(4)}>
        <Center flex={1} px={5}>
          <Button
          onPress={gotoHome}
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
    fontSize: (width<380)?(27):(32),
    fontWeight: '600',
    textAlign: 'center',

  },
});
