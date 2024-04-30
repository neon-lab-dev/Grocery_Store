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
import TextInput from '../../components/input';
import {
  CommonActions,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/slices/auth.slice';

type AddPersonalDetailsProps = {
  navigation: StackNavigationProp<AuthNavigatorParamList, 'PersonalDetails'>;
};

export const AddPersonalDetails: React.FC<AddPersonalDetailsProps> = ({}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const isContinueDisabled = name === '' || email === '';
  const nameErrorShown = !validators.stringWithSpace(name);
  const emailErrorShown = !validators.isEmail(email);
  const mobileNoErrorShown =
    mobileNo.length !== 0 && !validators.isPhoneNumber(mobileNo);
  const dispatch = useDispatch();
  const handleContinue = () => {
    if (nameErrorShown || emailErrorShown || mobileNoErrorShown) {
      setIsClicked(true);
    } else {
      dispatch(login('User'));
    }
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
          borderColor={nameErrorShown ? 'error.300' : 'accent.100'}
          isErrorShown={isClicked && nameErrorShown}
        />
        {isClicked && nameErrorShown && (
          <Text
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(14)}
            color={'#EF4444'}
            mt={-verticalScale(10)}>
            Enter Valid Name*
          </Text>
        )}
        <Text fontFamily={'Inter_Medium'} fontSize={scaleFontSize(16)} mb={2}>
          Email ID*
        </Text>
        <TextInput
          value={email}
          placeholder="Enter Here"
          setValue={setEmail}
          keyboardType="email-address"
          isErrorShown={isClicked && emailErrorShown}
        />
        {isClicked && emailErrorShown && (
          <Text
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(14)}
            color={'#EF4444'}
            mt={-verticalScale(10)}>
            Enter Valid Email*
          </Text>
        )}
        <Text fontFamily={'Inter_Medium'} fontSize={scaleFontSize(16)} mb={2}>
          Secondary Mobile Number(Optional)
        </Text>
        <TextInput
          placeholder="Enter Here"
          value={mobileNo}
          setValue={setMobileNo}
          maxLength={10}
          isErrorShown={isClicked && mobileNoErrorShown}
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
        />
        {isClicked && mobileNoErrorShown && (
          <Text
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(14)}
            color={'#EF4444'}
            mt={-verticalScale(10)}>
            Enter Valid Mobile Number*
          </Text>
        )}
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
