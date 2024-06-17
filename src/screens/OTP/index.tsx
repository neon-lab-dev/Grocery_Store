import React, {useEffect, useState} from 'react';
import {View, Text, Center} from 'native-base';
import {ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './style';
import OTP from '../../components/OTP/OTP_component';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigatorParamList} from '../../navigation/MainNavigation';
import {scaleFontSize} from '../../assets/scaling';
import {sendOtp, verifyOTP} from '../../api/auth';
import {toast} from '../../components/Toast/Toast';
import Loader from '../../components/Loader/Loader';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/slices/auth.slice';
import NetInfo from '@react-native-community/netinfo';

interface OTPScreenProps {
  navigation: StackNavigationProp<AuthNavigatorParamList, 'OTP'>;
}

const OTPScreen: React.FC<OTPScreenProps> = ({navigation, route}) => {
  const [OTPValue, setOTPValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setConnected] = useState(true);

  const dispatch = useDispatch();
  const handleOtpComplete = (otp: string) => {
    setOTPValue(otp);
  };

  const handleOTP = async () => {
    if (isConnected) {
      setIsLoading(true);
      try {
        const response = await verifyOTP(OTPValue, route.params.phoneNo);
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
          toast.showToast('Something Went Wrong, Try Again');
        }
      } catch (error: any) {
        toast.showToast('Enter Valid Mobile Number');
      }
      setIsLoading(false);
    } else {
      toast.showToast('Please Show Your Internet Connection');
    }
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

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnected(state.isInternetReachable);
      if (!state.isInternetReachable) {
        toast.showToast('Please Check Your Internet Connection');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
