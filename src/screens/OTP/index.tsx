import React, {useEffect, useState} from 'react';
import {View, Text, Center} from 'native-base';
import {ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './style';
import OTP from '../../components/OTP/OTP_component';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigatorParamList} from '../../navigation/MainNavigation';
import {horizontalScale, scaleFontSize} from '../../assets/scaling';
import {APIClient} from '../../api/axios.config';
import {sendOtp, verifyOTP} from '../../api/auth';
import {toast} from '../../components/Toast/Toast';
import Loader from '../../components/Loader/Loader';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/slices/auth.slice';

interface OTPScreenProps {
  navigation: StackNavigationProp<AuthNavigatorParamList, 'OTP'>;
}

const OTPScreen: React.FC<OTPScreenProps> = ({navigation, route}) => {
  const [OTPValue, setOTPValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleOtpComplete = (otp: string) => {
    setOTPValue(otp);
  };

  const handleOTP = async () => {
    setIsLoading(true);
    try {
      const response = await verifyOTP(OTPValue, route.params.phoneNo);
      console.log(response);
      if (response.statusCode === 200) {
        if (!response.responseBody.existing) {
          navigation.replace('PersonalDetails', {
            phoneNo: route.params.phoneNo,
          });
        } else {
          dispatch(login(response.responseBody.token));
          navigation.reset({
            index: 0,
            routes: [{name: 'App'}],
          });
        }
      } else {
        toast.showToast(response.message);
      }
    } catch (error: any) {
      toast.showToast(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (OTPValue.length === 4) {
      handleOTP();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [OTPValue]);

  const resendOTP = async () => {
    const response = await sendOtp(route.params.phoneNo);
    toast.showToast(response.responseBody.message);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/20450388_Vitamins.png')}
      style={styles.imageBackground}
      imageStyle={styles.image}>
      <Loader isOpen={isLoading} />
      <View h={300} w={'100%'} position={'absolute'} top={40}>
        <LinearGradient
          colors={['rgba(255,247,237,0.7)', 'rgba(255,247,237,0.7)']}
          style={styles.gradient}>
          <Center>
            <Text
              fontFamily={'Inter_SemiBold'}
              fontSize={scaleFontSize(20)}
              color={'accent.800'}
              lineHeight={24.2}
              letterSpacing={-0.01}>
              We've sent you a Verification Code
            </Text>
            <Text
              fontFamily={'Inter_SemiBold'}
              fontSize={scaleFontSize(20)}
              color={'accent.800'}
              lineHeight={24.2}
              letterSpacing={-0.01}>
              {route.params.phoneNo}
            </Text>
          </Center>
          <OTP
            countdown={60}
            onOtpComplete={handleOtpComplete}
            resendOTP={resendOTP}
          />
        </LinearGradient>
      </View>
    </ImageBackground>
  );
};

export default OTPScreen;
