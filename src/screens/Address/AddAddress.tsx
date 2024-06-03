import {Button, Center, Pressable, ScrollView, Text, View} from 'native-base';
import React, {useRef, useState} from 'react';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import validators from '../../utils/validators';
<<<<<<< HEAD
import TextInput from '../../components/Input';
=======
import SelectAddress from '../../components/SelectingAddress';
import TextInput from '../../components/input';
>>>>>>> latesstst/develop
import Loader from '../../components/Loader/Loader';
import {toast} from '../../components/Toast/Toast';
import {addAddress, updateAddress} from '../../api/auth_routes';

const AddAddress = ({route, navigation}) => {
  const {location, title} = route.params;
  const [landmark, setLandmark] = useState(
    title === 'Edit' ? location.landmark : '',
  );
  const [address, setAddress] = useState(
    title === 'Edit' ? location.addressLine1 : '',
  );
  const [city, setCity] = useState(title === 'Edit' ? location.city : '');
  const [state, setState] = useState(title === 'Edit' ? location.state : '');
  const [pincode, setPincode] = useState(
    title === 'Edit' ? location.pincode : '',
  );
  const [selectedLabel, setSelectedLabel] = useState(
    title === 'Edit' ? location.addressName : '',
  );
  const label = ['Home', 'Work', 'Other'];
  const [isClicked, setIsClicked] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const isContinueDisabled =
    landmark === '' ||
    address === '' ||
    city === '' ||
    state === '' ||
    pincode === '' ||
    selectedLabel === '';
  const landmarkErrorShown = landmark === '';
  const addressErrorShown = !validators.isAddress(address);
  const cityErrorShown = !validators.stringWithSpace(city);
  const stateErrorShown = !validators.stringWithSpace(state);
  const pincodeErrorShown = !validators.isPinCode(pincode);

  const ScrollViewRef = useRef<ScrollView>(null);

  const saveAddress = async () => {
    setLoaderVisible(true);
    try {
      const response = await addAddress({
        addressLine1: address,
        landmark: landmark,
        city: city,
        state: state,
        pincode: pincode,
        addressName: selectedLabel,
        primaryAddress: false,
      });
      // console.log(response);
      setLoaderVisible(false);
      navigation.goBack();
      toast.showToast(response.message || response.errorMessage);
    } catch (error) {}
  };

  const editAddress = async () => {
    setLoaderVisible(true);
    try {
      const getResponse = await updateAddress({
        addressLine1: address,
        addressLine2: null,
        addressName: selectedLabel,
        city: city,
        id: location.id,
        landmark: landmark,
        pincode: pincode,
        primaryAddress: true,
        state: state,
      });
      // console.log(getResponse);
      setLoaderVisible(false);
      navigation.goBack();
      toast.showToast(getResponse.message || getResponse.errorMessage);
    } catch (error) {}
  };

  return (
    <View
      flex={1}
      bgColor={'accent.50'}
      justifyContent={'space-between'}
      flexShrink={1}>
      <ScrollView
        flex={1}
        contentContainerStyle={{paddingBottom: verticalScale(30)}}
        px={horizontalScale(20)}
        py={verticalScale(20)}>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(16)}
          fontWeight={500}
          mb={verticalScale(5)}
          lineHeight={19.36}
          letterSpacing={-0.04}>
          Landmark*
        </Text>
        <TextInput
          value={landmark}
          setValue={setLandmark}
          placeholder="Enter Here"
          isErrorShown={isClicked && landmarkErrorShown}
        />
        {isClicked && landmarkErrorShown && (
          <Text
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(14)}
            color={'#EF4444'}
            mt={-verticalScale(12)}
            lineHeight={16.8}
            letterSpacing={-0.03}>
            Enter a Landmark*
          </Text>
        )}
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(16)}
          mb={verticalScale(5)}
          lineHeight={19.36}
          letterSpacing={-0.04}>
          Address*
        </Text>
        <TextInput
          value={address}
          setValue={setAddress}
          placeholder="Enter Here"
          isErrorShown={isClicked && addressErrorShown}
        />
        {isClicked && addressErrorShown && (
          <Text
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(14)}
            color={'#EF4444'}
            mt={-verticalScale(12)}
            lineHeight={16.8}
            letterSpacing={-0.03}>
            Enter a Valid Address*
          </Text>
        )}
        <View flexDir={'row'}>
          <View flex={0.5} mr={horizontalScale(10)}>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(16)}
              mb={verticalScale(5)}
              lineHeight={19.36}
              letterSpacing={-0.04}>
              City*
            </Text>
            <TextInput
              value={city}
              setValue={setCity}
              placeholder="Enter Here"
              isErrorShown={isClicked && cityErrorShown}
            />
            {isClicked && cityErrorShown && (
              <Text
                fontFamily={'Inter_Regular'}
                fontSize={scaleFontSize(14)}
                color={'#EF4444'}
                mt={-verticalScale(12)}
                lineHeight={16.8}
                letterSpacing={-0.03}>
                Enter a Valid City*
              </Text>
            )}
          </View>
          <View flex={0.5}>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(16)}
              mb={verticalScale(5)}
              lineHeight={19.36}
              letterSpacing={-0.04}>
              State*
            </Text>
            <TextInput
              value={state}
              setValue={setState}
              placeholder="Enter Here"
              isErrorShown={isClicked && stateErrorShown}
            />
            {isClicked && stateErrorShown && (
              <Text
                fontFamily={'Inter_Regular'}
                fontSize={scaleFontSize(14)}
                color={'#EF4444'}
                mt={-verticalScale(12)}
                lineHeight={16.8}
                letterSpacing={-0.03}>
                Enter a Valid State*
              </Text>
            )}
          </View>
        </View>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(16)}
          mb={verticalScale(5)}
          lineHeight={19.36}
          letterSpacing={-0.04}>
          Pincode*
        </Text>
        <TextInput
          value={pincode}
          setValue={setPincode}
          placeholder="Enter Here"
          isErrorShown={isClicked && pincodeErrorShown}
          onFocus={() => ScrollViewRef.current?.scrollToEnd()}
        />
        {isClicked && pincodeErrorShown && (
          <Text
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(14)}
            color={'#EF4444'}
            mt={-verticalScale(12)}
            lineHeight={16.8}
            letterSpacing={-0.03}>
            Enter a Valid Pincode*
          </Text>
        )}
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(16)}
          mb={verticalScale(5)}
          lineHeight={19.36}
          letterSpacing={-0.04}>
          Label*
        </Text>
        <View flexDir={'row'}>
          {label.map((item, index) => (
            <Pressable
              key={index}
              borderRadius={100}
              borderWidth={1}
              mr={horizontalScale(10)}
              py={verticalScale(7)}
              px={horizontalScale(15)}
              borderColor={
                selectedLabel === item ? 'primary.500' : 'accent.200'
              }
              bgColor={selectedLabel === item ? 'primary.500' : 'accent.100'}
              alignItems={'center'}
              onPress={() => setSelectedLabel(item)}>
              <Text
                fontFamily={'Inter_Medium'}
                fontWeight={500}
                fontSize={scaleFontSize(16)}
                lineHeight={19.36}
                letterSpacing={-0.04}
                color={selectedLabel === item ? 'white' : 'accent.400'}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
        {/* <Modal isOpen={true} size={'full'}>
          <Modal.Content
            mb={0}
            mt={'auto'}
            borderTopLeftRadius={12}
            borderTopRightRadius={12}>
            <SelectAddress />
          </Modal.Content>
        </Modal> */}
      </ScrollView>
      <View
        h={100}
        w={'100%'}
        borderTopLeftRadius={14}
        borderTopRightRadius={14}
        bg={'white'}
        shadow={1}>
        <Center flex={1} px={horizontalScale(15)}>
          <Button
            w={'100%'}
            py={verticalScale(15)}
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
            onPress={title === 'Edit' ? editAddress : saveAddress}>
            Save Address
          </Button>
        </Center>
      </View>
      <Loader isOpen={loaderVisible} />
    </View>
  );
};

export default AddAddress;
