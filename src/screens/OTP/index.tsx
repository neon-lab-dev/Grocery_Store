import React from 'react';
import {View, Text, Center} from 'native-base';
import {ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './style';
import OTP from '../../components/OTP/OTP_component';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigatorParamList} from '../../navigation/MainNavigation';
import {horizontalScale, scaleFontSize} from '../../assets/scaling';

interface OTPScreenProps {
  navigation: StackNavigationProp<AuthNavigatorParamList, 'OTP'>;
}

const OTPScreen: React.FC<OTPScreenProps> = ({navigation, route}) => {
  const handleOtpComplete = () => {
    navigation.replace('PersonalDetails');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/20450388_Vitamins.png')}
      style={styles.imageBackground}
      imageStyle={styles.image}>
      <View h={300} w={'100%'} position={'absolute'} top={40}>
        <LinearGradient
          colors={['rgba(255,247,237,0.7)', 'rgba(255,247,237,0.7)']}
          style={styles.gradient}>
          <Center>
            <Text
              fontFamily={'Inter_SemiBold'}
              fontSize={scaleFontSize(20)}
              color={'accent.800'}>
              We've sent you a Verification Code
            </Text>
            <Text
              fontFamily={'Inter_SemiBold'}
              fontSize={scaleFontSize(20)}
              color={'accent.800'}>
              {route.params.phoneNo}
            </Text>
          </Center>
          <OTP countdown={60} onOtpComplete={handleOtpComplete} />
        </LinearGradient>
      </View>
    </ImageBackground>
  );
};

export default OTPScreen;
