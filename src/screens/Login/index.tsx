import React, {useState} from 'react';
import {View, Button, Input, Text, Image} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';
import {styles} from './style';
import {AuthNavigatorParamList} from '../../navigation/MainNavigation';
import {Alert} from 'react-native';
import {scaleFontSize, verticalScale} from '../../assets/scaling';

type Props = {
  navigation: StackNavigationProp<AuthNavigatorParamList, 'Login'>;
};

const Login: React.FC<Props> = ({navigation}) => {
  const [phoneNo, setPhoneNo] = useState('');

  const handleContinue = () => {
    if (phoneNo.length === 10) {
      navigation.navigate('OTP');
    } else {
      Alert.alert('Enter valid phone number');
    }
  };
  return (
    <View flex={1} bg="primary.50">
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
          fontFamily={'Inter'}
          fontSize={scaleFontSize(28)}
          fontWeight={600}
          color={'accent.800'}>
          Fresh Picks Just a Tap Away!
        </Text>
        <Text
          fontFamily={'Inter'}
          fontSize={scaleFontSize(16)}
          fontWeight={400}
          color="accent.500">
          Enter your phone number to receive an OTP.
        </Text>
        <Input
          InputLeftElement={
            <Text
              fontFamily={'Inter'}
              fontSize={scaleFontSize(18)}
              fontWeight={500}
              marginLeft={5}>
              +91
            </Text>
          }
          bg="white"
          borderColor={'accent.100'}
          marginTop={5}
          rounded={20}
          _focus={{
            borderColor: 'primary.500',
          }}
          h={verticalScale(50)}
          fontFamily={'Inter'}
          fontSize={scaleFontSize(18)}
          keyboardType="number-pad"
          maxLength={10}
          blurOnSubmit
          value={phoneNo}
          onChangeText={setPhoneNo}
        />
        <Button
          w="100%"
          marginTop={2}
          rounded={12}
          h={verticalScale(40)}
          colorScheme={'orange'}
          bg="primary.500"
          onPress={handleContinue}
          _text={{
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: scaleFontSize(18),
          }}>
          Continue
        </Button>
        <View style={styles.footer}>
          <Text
            fontFamily={'Inter'}
            fontSize={scaleFontSize(12)}
            fontWeight={400}
            color="accent.400">
            By proceeding, you agree to our{' '}
          </Text>
          <Text
            fontFamily={'Inter'}
            fontSize={scaleFontSize(12)}
            fontWeight={400}
            fontSize={10}
            color="accent.400"
            underline>
            Terms & Conditions and Privacy policy.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
