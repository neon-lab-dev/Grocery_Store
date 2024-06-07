import {Button, Center, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectConnectionStatus,
  setConnectionStatus,
} from '../../redux/slices/networkSlice.ts';
import NetInfo from '@react-native-community/netinfo';
import {RootState} from './store';
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
import {login} from '../../redux/slices/auth.slice';
import {signUp} from '../../api/auth';
import {toast} from '../../components/Toast/Toast';
import Loader from '../../components/Loader/Loader';

type AddPersonalDetailsProps = {
  navigation: StackNavigationProp<AuthNavigatorParamList, 'PersonalDetails'>;
};

export const AddPersonalDetails: React.FC<AddPersonalDetailsProps> = ({
  navigation,
  route,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isContinueDisabled = name === '' || email === '';
  const nameErrorShown = !validators.stringWithSpace(name);
  const emailErrorShown = !validators.isEmail(email);
  const mobileNoErrorShown =
    mobileNo.length !== 0 && !validators.isPhoneNumber(mobileNo);
  const dispatch = useDispatch();
  const isInternetReachable = useSelector((state: RootState) =>
    selectConnectionStatus(state),
  );

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setConnectionStatus(state.isInternetReachable));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  const handleContinue = async () => {
    if (nameErrorShown || emailErrorShown || mobileNoErrorShown) {
      setIsClicked(true);
    } else {
      setIsLoading(true);
      try {
        const response = await signUp(
          name,
          email,
          route.params.phoneNo,
          mobileNo,
        );
        if (response.statusCode === 200) {
          toast.showToast(response.message);
          dispatch(login(response.responseBody.token));
          navigation.reset({
            index: 0,
            routes: [{name: 'App'}],
          });
        } else {
          toast.showToast(response.errorMessage);
        }
      } catch (error: any) {
        toast.showToast(error.message);
      }
      setIsLoading(false);
    }
  };

  return (
    <View flex={1} bgColor={'accent.50'} justifyContent={'space-between'}>
      <Loader isOpen={isLoading} />
      <View px={horizontalScale(20)} py={verticalScale(20)}>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(16)}
          mb={verticalScale(5)}
          lineHeight={19.36}
          letterSpacing={-0.04}
          color={'#1F2937'}>
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
            mt={-verticalScale(10)}
            lineHeight={16.8}
            letterSpacing={-0.03}>
            Enter Valid Name*
          </Text>
        )}
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(16)}
          mb={2}
          lineHeight={19.36}
          letterSpacing={-0.04}
          color={'#1F2937'}>
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
            mt={-verticalScale(10)}
            lineHeight={16.8}
            letterSpacing={-0.03}>
            Enter Valid Email*
          </Text>
        )}
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(16)}
          mb={2}
          lineHeight={19.36}
          letterSpacing={-0.04}
          color={'#1F2937'}>
          Secondary Mobile Number(Optional)
        </Text>
        <TextInput
          placeholder="Enter Here"
          value={mobileNo}
          setValue={setMobileNo}
          isErrorShown={isClicked && mobileNoErrorShown}
          leftElement={
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(16)}
              lineHeight={19.36}
              letterSpacing={-0.04}
              color={'accent.800'}
              py={verticalScale(12)}
              pl={horizontalScale(15)}
              mr={horizontalScale(-5)}>
              +91
            </Text>
          }
          maxLength={10}
        />
        {isClicked && mobileNoErrorShown && (
          <Text
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(14)}
            color={'#EF4444'}
            mt={-verticalScale(10)}
            lineHeight={16.8}
            letterSpacing={-0.03}>
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
              color: isContinueDisabled ? 'accent.400' : 'primary.50',
              lineHeight: 24.2,
              letterSpacing: -0.04,
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
