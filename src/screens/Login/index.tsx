import React, {useState} from 'react';
import {
  View,
  Button,
  Input,
  Text,
  Image,
  KeyboardAvoidingView,
} from 'native-base';
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
import {Platform} from 'react-native';

type Props = {
  navigation: StackNavigationProp<AuthNavigatorParamList, 'Login'>;
};

const Login: React.FC<Props> = ({navigation}) => {
  const [phoneNo, setPhoneNo] = useState('');

  const handleContinue = () => {
    validators.isPhoneNumber(phoneNo)
      ? navigation.navigate('OTP', {phoneNo: phoneNo})
      : console.log('Enter Valid Mobile Number');
  };
  return (
    <KeyboardAvoidingView
      flex={1}
      bg="primary.50"
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.imageBackground}>
        <Image
          source={require('../../assets/images/20450388_Vitamins.png')}
          style={styles.image}
          resizeMode="cover"
          alt="Top Image"
        />
      </View>
      <View style={styles.inputSection}>
        <Text
          fontFamily={'Inter_SemiBold'}
          fontSize={scaleFontSize(26)}
          color={'accent.800'}
          lineHeight={33.89}
          letterSpacing={-0.05}>
          Fresh Picks Just a Tap Away!
        </Text>
        <Text
          fontFamily={'Inter_Regular'}
          fontSize={scaleFontSize(15)}
          color="accent.500"
          lineHeight={20}
          letterSpacing={-0.03}>
          Enter your phone number to receive an OTP.
        </Text>
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
          onChangeText={setPhoneNo}
        />
        <LinearGradient
          colors={['#FDBA74', '#F97316']}
          style={{
            borderRadius: 12,
            width: '100%',
            marginTop: verticalScale(10),
          }}
          start={{y: 0.0, x: 0.0}}
          end={{y: 1.0, x: 0.0}}>
          <Button
            w="100%"
            py={verticalScale(15)}
            rounded={12}
            colorScheme={'transparent'}
            bg="transparent"
            onPress={phoneNo.length === 10 ? handleContinue : null}
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
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(10)}
            color="accent.500"
            underline
            lineHeight={14.4}
            letterSpacing={-0.03}>
            Terms & Conditions and Privacy policy.
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
