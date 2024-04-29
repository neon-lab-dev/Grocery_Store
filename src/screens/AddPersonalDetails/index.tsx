import {Button, Center, Text, View} from 'native-base';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigatorParamList} from '../../navigation/MainNavigation';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
  width,
} from '../../assets/scaling';
import validators from '../../utils/validators';
import TextInput from '../../components/Input';

type AddPersonalDetailsProps = {
  navigation: StackNavigationProp<AuthNavigatorParamList, 'PersonalDetails'>;
};

export const AddPersonalDetails: React.FC<AddPersonalDetailsProps> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const isContinueDisabled =
    mobileNo.length === 0
      ? !validators.stringDigitWithSpace(name) || !validators.isEmail(email)
      : !validators.stringDigitWithSpace(name) ||
        !validators.isEmail(email) ||
        !validators.isPhoneNumber(mobileNo);
  const handleContinue = () => {
    console.log('Logged In');
  };

  return (
    <View flex={1} bgColor={'accent.50'} justifyContent={'space-between'}>
      <View px={horizontalScale(20)} py={verticalScale(20)}>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(16)}
          mb={verticalScale(5)}>
          Full Name*
        </Text>
        <TextInput
          value={name}
          placeholder="Enter Here"
          setValue={setName}
          validation={validators.stringWithSpace(name)}
          validationError="Enter a Valid Name*"
          required
        />

        <Text fontFamily={'Inter_Medium'} fontSize={scaleFontSize(16)} mb={2}>
          Email ID*
        </Text>
        <TextInput
          value={email}
          placeholder="Enter Here"
          setValue={setEmail}
          keyboardType="email-address"
          validation={validators.isEmail(email)}
          validationError="Enter a Valid Email*"
          required
        />
        <Text fontFamily={'Inter_Medium'} fontSize={scaleFontSize(16)} mb={2}>
          Secondary Mobile Number(Optional)
        </Text>
        <TextInput
          placeholder="Enter Here"
          value={mobileNo}
          setValue={setMobileNo}
          maxLength={10}
          leftElement={
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(16)}
              py={verticalScale(12)}
              pl={horizontalScale(15)}
              mr={horizontalScale(-5)}>
              +91
            </Text>
          }
          validation={validators.isPhoneNumber(mobileNo)}
          validationError="Enter Valid Phone Number*"
        />
      </View>
      <View
        h={100}
        w={width}
        borderTopLeftRadius={14}
        borderTopRightRadius={14}
        bg={'white'}
        shadow={1}>
        <Center flex={1} px={horizontalScale(20)}>
          <Button
            w={'100%'}
            py={verticalScale(12)}
            rounded={12}
            colorScheme={'transparent'}
            bg={isContinueDisabled ? 'accent.200' : 'primary.500'}
            _text={{
              fontFamily: 'Inter_SemiBold',
              fontSize: scaleFontSize(20),
              color: isContinueDisabled ? 'accent.400' : 'white',
            }}
            disabled={isContinueDisabled}
            onPress={handleContinue}>
            Continue
          </Button>
        </Center>
      </View>
    </View>
  );
};
