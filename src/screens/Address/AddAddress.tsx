import {Button, Center, Input, Modal, Pressable, Text, View} from 'native-base';
import React, {useState} from 'react';
import {scaleFontSize, width} from '../../assets/scaling';
import validators from '../../utils/validators';
import SelectAddress from '../../components/SelectingAddress';

const AddAddress = () => {
  const [landmark, setLandmark] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const label = ['Home', 'Work', 'Other'];
  const isContinueDisabled =
    landmark === '' ||
    address === '' ||
    city === '' ||
    state === '' ||
    pincode === '' ||
    selectedLabel === '';
  return (
    <View
      flex={1}
      bgColor={'accent.50'}
      justifyContent={'space-between'}
      flexShrink={1}>
      <View p={5}>
        <Text
          fontFamily={'Inter'}
          fontSize={scaleFontSize(16)}
          fontWeight={500}
          mb={2}>
          Landmark*
        </Text>
        <Input
          value={landmark}
          onChangeText={txt => setLandmark(txt)}
          variant={'filled'}
          rounded={15}
          mb={5}
          bg={'accent.100'}
          _focus={{borderColor: 'primary.500'}}
          fontFamily={'Inter'}
          fontSize={scaleFontSize(16)}
          fontWeight={500}
          placeholderTextColor={'accent.400'}
          placeholder={'Enter Here'}
        />
        <Text
          fontFamily={'Inter'}
          fontSize={scaleFontSize(16)}
          fontWeight={500}
          mb={2}>
          Address*
        </Text>
        <Input
          value={address}
          onChangeText={txt => setAddress(txt)}
          variant={'filled'}
          rounded={15}
          mb={5}
          bg={'accent.100'}
          _focus={{borderColor: 'primary.500'}}
          fontFamily={'Inter'}
          fontSize={scaleFontSize(16)}
          fontWeight={500}
          placeholderTextColor={'accent.400'}
          placeholder={'Enter Here'}
        />
        <View flexDir={'row'}>
          <View flex={0.5} mr={5}>
            <Text
              fontFamily={'Inter'}
              fontSize={scaleFontSize(16)}
              fontWeight={500}
              mb={2}>
              City*
            </Text>
            <Input
              value={city}
              onChangeText={txt => setCity(txt)}
              w={'auto'}
              variant={'filled'}
              rounded={15}
              mb={5}
              bg={'accent.100'}
              _focus={{borderColor: 'primary.500'}}
              fontFamily={'Inter'}
              fontSize={scaleFontSize(16)}
              fontWeight={500}
              placeholderTextColor={'accent.400'}
              placeholder={'Enter Here'}
            />
          </View>
          <View flex={0.5}>
            <Text
              fontFamily={'Inter'}
              fontSize={scaleFontSize(16)}
              fontWeight={500}
              mb={2}>
              State*
            </Text>
            <Input
              value={state}
              onChangeText={txt => setState(txt)}
              w={'auto'}
              variant={'filled'}
              rounded={15}
              mb={5}
              bg={'accent.100'}
              _focus={{borderColor: 'primary.500'}}
              fontFamily={'Inter'}
              fontSize={scaleFontSize(16)}
              fontWeight={500}
              placeholderTextColor={'accent.400'}
              placeholder={'Enter Here'}
            />
          </View>
        </View>
        <Text
          fontFamily={'Inter'}
          fontSize={scaleFontSize(16)}
          fontWeight={500}
          mb={2}>
          Pincode*
        </Text>
        <Input
          value={pincode}
          onChangeText={txt => setPincode(txt)}
          variant={'filled'}
          rounded={15}
          mb={5}
          bg={'accent.100'}
          _focus={{borderColor: 'primary.500'}}
          fontFamily={'Inter'}
          fontSize={scaleFontSize(16)}
          fontWeight={500}
          placeholderTextColor={'accent.400'}
          placeholder={'Enter Here'}
          keyboardType="number-pad"
        />
        <Text
          fontFamily={'Inter'}
          fontSize={scaleFontSize(16)}
          fontWeight={500}
          mb={2}>
          Label*
        </Text>
        <View flexDir={'row'}>
          {label.map((item, index) => (
            <Pressable
              key={index}
              borderRadius={100}
              borderWidth={1}
              mr={3}
              py={2}
              px={4}
              borderColor={selectedLabel === item ? 'accent.400' : 'accent.200'}
              bgColor={selectedLabel === item ? 'accent.200' : 'accent.100'}
              alignItems={'center'}
              onPress={() => setSelectedLabel(item)}>
              <Text
                fontFamily={'Inter'}
                fontSize={scaleFontSize(16)}
                fontWeight={500}
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
      </View>
      <View
        h={100}
        w={width}
        borderTopLeftRadius={14}
        borderTopRightRadius={14}
        bg={'white'}
        shadow={1}>
        <Center flex={1} px={5}>
          <Button
            w={'100%'}
            h={50}
            rounded={12}
            colorScheme={'orange'}
            bg={isContinueDisabled ? 'accent.200' : 'primary.500'}
            _text={{
              fontFamily: 'Inter',
              fontSize: scaleFontSize(20),
              color: isContinueDisabled ? 'accent.400' : 'white',
            }}
            disabled={isContinueDisabled}
            onPress={() => {}}>
            Save Address
          </Button>
        </Center>
      </View>
    </View>
  );
};

export default AddAddress;
