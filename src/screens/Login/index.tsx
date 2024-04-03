import React from 'react';
import {View, Button, Input, Text, Image} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';
import {styles} from './style';
import {AuthNavigatorParamList} from '../../navigation/MainNavigation';

type Props = {
  navigation: StackNavigationProp<AuthNavigatorParamList, 'Login'>;
};

const Login: React.FC<Props> = ({navigation}) => {
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
        <Text bold fontSize="fs24">
          Fresh Picks Just a Tap Away!
        </Text>
        <Text fontSize="fs14" color="accent.400">
          Enter your phone number to receive an OTP.
        </Text>
        <Input
          InputLeftElement={
            <Text fontSize="lg" marginLeft={5}>
              +91
            </Text>
          }
          bg="common.white"
          marginTop={5}
          rounded={13}
          fontSize="lg"
          keyboardType="number-pad"
          maxLength={10}
          blurOnSubmit
        />
        <Button
          size="md"
          w="100%"
          marginTop={2}
          rounded={13}
          bg="primary.500"
          onPress={() => {
            navigation.navigate('OTP');
          }}>
          Continue
        </Button>
        <View style={styles.footer}>
          <Text fontSize={10} color="accent.400">
            By proceeding, you agree to our{' '}
          </Text>
          <Text fontSize={10} color="accent.400" underline>
            Terms & Conditions and Privacy policy.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
