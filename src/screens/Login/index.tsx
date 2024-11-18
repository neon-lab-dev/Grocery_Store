import React, {useEffect, useState} from 'react';
import {View, Button, Input, Text, KeyboardAvoidingView} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';
import {styles} from './style';
import {AuthNavigatorParamList} from '../../navigation/MainNavigation';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import LinearGradient from 'react-native-linear-gradient';
import validators from '../../utils/validators';
import {Linking, Platform} from 'react-native';
import {sendOtp} from '../../api/auth';
import Loader from '../../components/Loader/Loader';
import {toast} from '../../components/Toast/Toast';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {setNetworkStatus} from '../../redux/slices/networkSlice';
import {Image} from 'react-native-svg';

type Props = {
  navigation: StackNavigationProp<AuthNavigatorParamList, 'Login'>;
};

const Login: React.FC<Props> = ({navigation}) => {
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const isConnected: boolean = useSelector(
    (state: any) => state.network.isConnected,
  );

  const openURL = async (url: string): Promise<void> => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      dispatch(setNetworkStatus(state.isConnected));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const handleContinue = async (): Promise<void> => {
    if (isConnected) {
      if (validators.isPhoneNumber(phoneNo)) {
        setIsLoading(true);
        try {
          const response = await sendOtp(phoneNo);
          if (response.statusCode === 200 || response.statusCode === 400) {
            toast.showToast(response.responseBody.message);
            navigation.navigate('OTP', {phoneNo});
          } else {
            toast.showToast(response.message);
          }
        } catch (error: any) {
          toast.showToast('Something Went Wrong, Try Again');
        }
        setIsLoading(false);
      } else {
        toast.showToast('Enter Valid Mobile Number');
      }
    } else {
      toast.showToast('Please Check Your Internet Connection');
    }
  };

  return (
    <>
      <Loader isOpen={isLoading} />
      <View flex={1}>
        {/* <View style={styles.imageBackground}>
          <Image
            source={require('../../assets/images/SplashScreen/background.png')}
            style={styles.image}
            resizeMode="cover"
            alt="Top Image"
          />
        </View> */}
        <View style={styles.inputSection}>
          <Text
            fontFamily={'Inter_SemiBold'}
            fontSize={scaleFontSize(26)}
            color={'accent.800'}
            lineHeight={33.89}
            letterSpacing={-0.05}>
            Login/SignUp
          </Text>
          {/* <Text
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(15)}
            color="accent.500"
            lineHeight={20}
            letterSpacing={-0.03}>
            Enter your phone number to receive an OTP.
          </Text> */}
          <Input
            InputLeftElement={
              <Text
                fontFamily={'Inter_Medium'}
                fontSize={scaleFontSize(26)}
                py={verticalScale(20)}
                pl={horizontalScale(20)}
                lineHeight={33.89}
                letterSpacing={-0.03}
                color={'accent.700'}>
                +91
              </Text>
            }
            bg="white"
            borderColor={'accent.100'}
            marginTop={verticalScale(10)}
            rounded={20}
            _focus={{
              borderColor: 'accent.100',
              bgColor: 'white',
            }}
            color={'accent.700'}
            py={verticalScale(20)}
            fontFamily={'Inter_Medium'}
            fontSize={scaleFontSize(26)}
            lineHeight={33.89}
            letterSpacing={-0.03}
            keyboardType="number-pad"
            maxLength={10}
            blurOnSubmit
            value={phoneNo}
            onChangeText={(text: string) => setPhoneNo(text)}
          />
          <LinearGradient
            colors={['#7C3AED', '#8745F8']}
            style={styles.linearGradient}
            start={{y: 0.0, x: 0.0}}
            end={{y: 1.0, x: 0.0}}>
            <Button
              w="100%"
              py={verticalScale(15)}
              rounded={12}
              colorScheme={'transparent'}
              bg="transparent"
              onPress={phoneNo.length === 10 ? handleContinue : undefined}
              _text={{
                fontFamily: 'Inter_Medium',
                fontSize: scaleFontSize(18),
                lineHeight: 21.78,
                letterSpacing: -0.04,
              }}>
              Continue
            </Button>
          </LinearGradient>

          <View style={styles.footer}>
            <Text
              fontFamily={'Inter_Regular'}
              fontSize={scaleFontSize(10)}
              color="accent.400"
              lineHeight={14.4}
              letterSpacing={-0.03}>
              By proceeding, you agree to our{' '}
            </Text>
            <Text
              onPress={() =>
                openURL(
                  'https://grocerystore-blond.vercel.app/terms-and-conditions.html',
                )
              }
              fontFamily={'Inter_Regular'}
              fontSize={scaleFontSize(10)}
              color="accent.500"
              underline
              lineHeight={14.4}
              letterSpacing={-0.03}>
              Terms & Conditions
            </Text>
            <Text
              paddingX={1}
              fontFamily={'Inter_Regular'}
              fontSize={scaleFontSize(10)}
              color="accent.500"
              lineHeight={14.4}
              letterSpacing={-0.03}>
              and
            </Text>
            <Text
              onPress={() =>
                openURL(
                  'https://grocerystore-blond.vercel.app/privacy-policy.html',
                )
              }
              fontFamily={'Inter_Regular'}
              fontSize={scaleFontSize(10)}
              color="accent.500"
              underline
              lineHeight={14.4}
              letterSpacing={-0.03}>
              Privacy policy.
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default Login;
