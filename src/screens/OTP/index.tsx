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
import {login} from '../../redux/slices/auth.slice';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {setNetworkStatus} from '../../redux/slices/networkSlice.ts';

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
  const isConnected = useSelector(state => state.network.isConnected);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setNetworkStatus(state.isConnected));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

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
          toast.showToast(response.message);
        }
      } catch (error: any) {
        toast.showToast('Enter Valid Mobile Number');
      }
      setIsLoading(false);
    } else {
      toast.showToast('Please Check Your Internet Connection');
    }
  };

  useEffect(() => {
    if (OTPValue.length === 4) {
      handleOTP();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [OTPValue]);

  const resendOTP = async () => {
    if (isConnected) {
      const response = await sendOtp(route.params.phoneNo);
      toast.showToast(response.responseBody.message);
    } else {
      toast.showToast('Please Check Your Internet Connection');
    }
  };

  return (
    <LinearGradient
      colors={['#7C3AED', '#8745F8']}
      // source={require('../../assets/images/20450388_Vitamins.png')}
      style={styles.imageBackground}
      // imageStyle={styles.image}
    >
      <Loader isOpen={isLoading} />
      <View h={300} w={'100%'} position={'absolute'} top={40}>
        <View style={styles.gradient}>
          <Center>
            <Text
              fontFamily={'Inter_SemiBold'}
              fontSize={scaleFontSize(20)}
              color={'#FFFFFF'}
              lineHeight={24.2}
              letterSpacing={-0.01}>
              Verification Code sent to
            </Text>
            <Text
              fontFamily={'Inter_SemiBold'}
              fontSize={scaleFontSize(20)}
              color={'#FFFFFF'}
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
        </View>
      </View>
    </LinearGradient>
  );
};

export default OTPScreen;
