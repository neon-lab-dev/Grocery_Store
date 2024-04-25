import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Center, Input, Text, View} from 'native-base';
import React, {useState} from 'react';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import {scaleFontSize} from '../../assets/scaling';

interface PersonalDetailsProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'PersonalDetails'>;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const isContinueDisabled = name === '' || email === '' || mobileNo === '';

  return (
    <View flex={1} bgColor={'accent.50'}>
      <View p={5}>
        <Text
          fontFamily={'Inter'}
          fontSize={scaleFontSize(16)}
          fontWeight={500}
          mb={2}>
          Full Name*
        </Text>
        <Input
          value={name}
          onChangeText={txt => setName(txt)}
          variant={'filled'}
          rounded={15}
          mb={5}
          bg={'accent.100'}
          _focus={{borderColor: 'primary.500'}}
          fontFamily={'Inter'}
          fontSize={scaleFontSize(16)}
          placeholderTextColor={'accent.400'}
          placeholder={'Enter Here'}
        />
        <Text
          fontFamily={'Inter'}
          fontSize={scaleFontSize(16)}
          fontWeight={500}
          mb={2}>
          Email ID*
        </Text>
        <Input
          value={email}
          onChangeText={txt => setEmail(txt)}
          variant={'filled'}
          rounded={15}
          mb={5}
          bg={'accent.100'}
          _focus={{borderColor: 'primary.500'}}
          fontFamily={'Inter'}
          fontSize={scaleFontSize(16)}
          placeholderTextColor={'accent.400'}
          placeholder={'Enter Here'}
          keyboardType="email-address"
        />
        <Text
          mb={2}
          fontFamily={'Inter'}
          fontSize={scaleFontSize(16)}
          fontWeight={500}>
          Mobile Number*
        </Text>
        <Input
          InputLeftElement={
            <Text fontSize="sm" marginLeft={5}>
              +91
            </Text>
          }
          variant={'filled'}
          value={mobileNo}
          onChangeText={txt => setMobileNo(txt)}
          rounded={15}
          bg={'accent.100'}
          _focus={{borderColor: 'primary.500'}}
          fontFamily={'Inter'}
          fontSize={scaleFontSize(16)}
          placeholderTextColor={'accent.400'}
          placeholder={'Enter Here'}
          mb={5}
          keyboardType="number-pad"
        />
        <Text
          mb={2}
          fontFamily={'Inter'}
          fontSize={scaleFontSize(16)}
          fontWeight={500}>
          Secondary Mobile Number(Optional)
        </Text>
        <Input
          variant={'filled'}
          rounded={15}
          mb={5}
          bg={'accent.100'}
          _focus={{borderColor: 'primary.500'}}
          fontFamily={'Inter'}
          fontSize={scaleFontSize(16)}
          placeholderTextColor={'accent.400'}
          placeholder={'Enter Here'}
        />
      </View>
      <View flex={1} justifyContent={'flex-end'}>
        <View
          h={100}
          borderTopLeftRadius={14}
          borderTopRightRadius={14}
          bg={'white'}
          shadow={1}>
          <Center flex={1} px={5}>
            <Button
              w={'100%'}
              h={50}
              rounded={12}
              bg={isContinueDisabled ? 'accent.200' : 'primary.500'}
              _text={{
                fontFamily: 'Inter',
                fontSize: scaleFontSize(20),
                fontWeight: 600,
                color: isContinueDisabled ? 'accent.400' : 'white',
              }}
              colorScheme={'orange'}
              disabled={isContinueDisabled}
              onPress={() => {}}>
              Save
            </Button>
          </Center>
        </View>
      </View>
    </View>
  );
};

export default PersonalDetails;
