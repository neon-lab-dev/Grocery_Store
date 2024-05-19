import {StackNavigationProp} from '@react-navigation/stack';
import {
  Button,
  Center,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import TextInput from '..//../components/Input';
import validators from '../../utils/validators';
import {Platform} from 'react-native';
import {fetchUserData, updateUserData} from '../../api/auth_routes';
import {AuthAPIClient2} from '../../api/axios.config';
import {toast} from '../../components/Toast/Toast';

interface PersonalDetailsProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'PersonalDetails'>;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({navigation}) => {
  const [originalName, setOriginalName] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');
  const [originalMobileNo, setOriginalMobileNo] = useState('');
  const [originalSecondaryMobileNo, setOriginalSecondaryMobileNo] =
    useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [secondaryMobileNo, setSecondaryMobileNo] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const isContinueDisabled = name === '' || email === '' || mobileNo === '';
  const nameErrorShown = !validators.stringWithSpace(name);
  const emailErrorShown = !validators.isEmail(email);
  const mobileNoErrorShown = !validators.isPhoneNumber(mobileNo);
  const [isLoading, setIsLoading] = useState(false);
  const secondaryMobileNoErrorShown =
    secondaryMobileNo.length !== 0 &&
    !validators.isPhoneNumber(secondaryMobileNo);
  const scrollViewRef = React.useRef<ScrollView>(null);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetchUserData();
      if (response.responseBody) {
        setOriginalName(response.responseBody.name);
        setOriginalEmail(response.responseBody.email);
        setOriginalMobileNo(response.responseBody.primaryPhoneNo);
        setOriginalSecondaryMobileNo(
          response.responseBody.secondaryPhoneNo || '',
        );

        setName(response.responseBody.name);
        setEmail(response.responseBody.email);
        setMobileNo(response.responseBody.primaryPhoneNo);
        setSecondaryMobileNo(response.responseBody.secondaryPhoneNo || '');
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    try {
      setIsLoading(true);
      setIsClicked(true);
      const updatedFields: {[key: string]: any} = {};
      if (name !== originalName) {
        updatedFields.name = name;
      }
      if (email !== originalEmail) {
        updatedFields.email = email;
      }
      if (mobileNo !== originalMobileNo) {
        updatedFields.primaryPhoneNo = mobileNo;
      }
      if (secondaryMobileNo !== originalSecondaryMobileNo) {
        updatedFields.secondaryPhoneNo = secondaryMobileNo;
      }
      if (Object.keys(updatedFields).length === 0) {
        setIsLoading(false);
        return;
      }

      const response = await updateUserData(updatedFields);
      if (response.responseBody) {
        toast.showToast(response.message);
        navigation.goBack();
      } else {
        toast.showToast('Something went wrong, try again later');
      }
    } catch (error) {
      console.log(error);
    }
    setIsClicked(false);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      {isLoading ? (
        <View
          flex={1}
          bgColor={'accent.300'}
          alignItems={'center'}
          justifyContent={'center'}>
          <Image
            alt="loading"
            source={require('../../assets/images/icons/loading.gif')}
            h={250}
            w={250}
          />
        </View>
      ) : (
        <KeyboardAvoidingView
          flex={1}
          bgColor={'accent.50'}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            flex={1}
            flexGrow={1}
            ref={scrollViewRef}
            px={horizontalScale(20)}
            py={verticalScale(20)}
            _contentContainerStyle={{paddingBottom: verticalScale(30)}}>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(16)}
              mb={verticalScale(5)}
              lineHeight={19.36}
              letterSpacing={-0.04}>
              Full Name*
            </Text>
            <TextInput
              value={name}
              placeholder="Enter Here"
              setValue={setName}
              isErrorShown={isClicked && nameErrorShown}
            />
            {isClicked && nameErrorShown && (
              <Text
                fontFamily={'Inter_Regular'}
                fontSize={scaleFontSize(14)}
                color={'#EF4444'}
                mt={-verticalScale(12)}
                lineHeight={16.8}
                letterSpacing={-0.03}>
                Enter Valid Name*
              </Text>
            )}
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(16)}
              mb={verticalScale(5)}
              lineHeight={19.36}
              letterSpacing={-0.04}>
              Email ID*
            </Text>
            <TextInput
              value={email}
              placeholder="Enter Here"
              setValue={setEmail}
              isErrorShown={isClicked && emailErrorShown}
            />
            {isClicked && emailErrorShown && (
              <Text
                fontFamily={'Inter_Regular'}
                fontSize={scaleFontSize(14)}
                color={'#EF4444'}
                mt={-verticalScale(12)}
                lineHeight={16.8}
                letterSpacing={-0.03}>
                Enter Valid Email*
              </Text>
            )}
            <Text
              mb={verticalScale(5)}
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(16)}
              lineHeight={19.36}
              letterSpacing={-0.04}>
              Mobile Number*
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
                  mr={horizontalScale(-5)}
                  lineHeight={19.36}
                  letterSpacing={-0.04}
                  color={'accent.800'}>
                  +91
                </Text>
              }
            />
            {isClicked && mobileNoErrorShown && (
              <Text
                fontFamily={'Inter_Regular'}
                fontSize={scaleFontSize(14)}
                color={'#EF4444'}
                mt={-verticalScale(12)}
                lineHeight={16.8}
                letterSpacing={-0.03}>
                Enter Valid Mobile Number*
              </Text>
            )}
            <Text
              mb={verticalScale(5)}
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(16)}
              lineHeight={19.36}
              letterSpacing={-0.04}>
              Secondary Mobile Number(Optional)
            </Text>
            <TextInput
              placeholder="Enter Here"
              value={secondaryMobileNo}
              setValue={setSecondaryMobileNo}
              maxLength={10}
              isErrorShown={isClicked && secondaryMobileNoErrorShown}
              leftElement={
                <Text
                  fontFamily={'Inter_Medium'}
                  fontSize={scaleFontSize(16)}
                  py={verticalScale(12)}
                  pl={horizontalScale(15)}
                  mr={horizontalScale(-5)}
                  lineHeight={19.36}
                  letterSpacing={-0.04}
                  color={'accent.800'}>
                  +91
                </Text>
              }
              onFocus={() => scrollViewRef.current?.scrollToEnd()}
            />
            {isClicked && secondaryMobileNoErrorShown && (
              <Text
                fontFamily={'Inter_Regular'}
                fontSize={scaleFontSize(14)}
                color={'#EF4444'}
                mt={-verticalScale(12)}
                lineHeight={16.8}
                letterSpacing={-0.03}>
                Enter Valid Mobile Number*
              </Text>
            )}
          </ScrollView>
          <View
            h={verticalScale(80)}
            borderTopLeftRadius={14}
            borderTopRightRadius={14}
            bg={'white'}
            w={'100%'}
            alignSelf={'flex-end'}
            shadow={1}>
            <Center flex={1} px={horizontalScale(20)}>
              <Button
                w={'100%'}
                py={verticalScale(15)}
                rounded={12}
                bg={isContinueDisabled ? 'accent.200' : 'primary.500'}
                _text={{
                  fontSize: scaleFontSize(20),
                  fontFamily: 'Inter_SemiBold',
                  color: isContinueDisabled ? 'accent.400' : 'primary.50',
                  lineHeight: 24.2,
                  letterSpacing: -0.04,
                }}
                colorScheme={'transparent'}
                disabled={isContinueDisabled}
                onPress={updateUser}>
                Save
              </Button>
            </Center>
          </View>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default PersonalDetails;
