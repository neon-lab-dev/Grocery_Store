import {
  Button,
  Center,
  Input,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'native-base';
import React, {useRef, useState} from 'react';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
  width,
} from '../../assets/scaling';
import validators from '../../utils/validators';
import SelectAddress from '../../components/SelectingAddress';
import TextInput from '../../components/input';

const AddAddress = () => {
  const [landmark, setLandmark] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const label = ['Home', 'Work', 'Other'];
  const [isClicked, setIsClicked] = useState(false);
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
          mb={verticalScale(5)}>
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
            mt={-verticalScale(10)}>
            Enter a Landmark*
          </Text>
        )}
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(16)}
          mb={verticalScale(5)}>
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
            mt={-verticalScale(10)}>
            Enter a Valid Address*
          </Text>
        )}
        <View flexDir={'row'}>
          <View flex={0.5} mr={horizontalScale(10)}>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(16)}
              mb={verticalScale(5)}>
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
                mt={-verticalScale(10)}>
                Enter a Valid City*
              </Text>
            )}
          </View>
          <View flex={0.5}>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(16)}
              mb={verticalScale(5)}>
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
                mt={-verticalScale(10)}>
                Enter a Valid State*
              </Text>
            )}
          </View>
        </View>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(16)}
          mb={verticalScale(5)}>
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
            mt={-verticalScale(10)}>
            Enter a Valid Pincode*
          </Text>
        )}
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(16)}
          mb={verticalScale(5)}>
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
              borderColor={selectedLabel === item ? 'accent.400' : 'accent.200'}
              bgColor={selectedLabel === item ? 'accent.200' : 'accent.100'}
              alignItems={'center'}
              onPress={() => setSelectedLabel(item)}>
              <Text
                fontFamily={'Inter_Medium'}
                fontSize={scaleFontSize(16)}
                color={selectedLabel === item ? 'accent.700' : 'accent.400'}>
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
            py={verticalScale(13)}
            rounded={12}
            colorScheme={'transparent'}
            bg={isContinueDisabled ? 'accent.200' : 'primary.500'}
            _text={{
              fontFamily: 'Inter_SemiBold',
              fontSize: scaleFontSize(20),
              color: isContinueDisabled ? 'accent.400' : 'white',
            }}
            disabled={isContinueDisabled}
            onPress={() => setIsClicked(true)}>
            Save Address
          </Button>
        </Center>
      </View>
    </View>
  );
};

export default AddAddress;
