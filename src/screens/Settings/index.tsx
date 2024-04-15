import {Button, Center, Image, Text, View} from 'native-base';
import React from 'react';
import SettingsOption from './settings_options_component';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {bulb} from '../../assets/images/bulb';
import {shoppingBag} from '../../assets/images/shopping-bag';
import {locationAlt} from '../../assets/images/location-alt';
import {comment} from '../../assets/images/comment';
import {user} from '../../assets/images/user';
import {verticalScale} from '../../assets/scaling';

interface SettingsProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Settings'>;
}
export const Settings: React.FC<SettingsProps> = ({navigation}) => {
  const gotoPersonalDetails = () => {
    navigation.navigate('PersonalDetails');
  };
  const gotoHelp = () => {
    navigation.navigate('Help');
  };
  const gotoOrders = () => {
    navigation.navigate('Orders');
  };
  const gotoAddress = () => {
    navigation.navigate('Addresses');
  };
  return (
    <View flex={1}>
      <View
        flexDir={'row'}
        height={100}
        alignItems={'center'}
        bg={'white'}
        px={5}
        mb={2}
        mt={0.4}>
        <Center bg={'primary.500'} borderRadius={100} h={10} w={10} mr={2}>
          <Image
            source={require('../../assets/images/account_circle.png')}
            alt="avatar"
            borderRadius={100}
            resizeMode="contain"
          />
        </Center>
        <View>
          <Text bold fontSize={'lg'}>
            Salmaan Ahmed
          </Text>
          <Text fontSize={'sm'}>96000 16417</Text>
        </View>
      </View>
      <SettingsOption
        name="Orders"
        iconSVG={shoppingBag}
        onPress={gotoOrders}
      />
      <SettingsOption
        name="Customer Support and FAQ"
        iconSVG={comment}
        onPress={gotoHelp}
      />
      <SettingsOption
        name="Addresses"
        iconSVG={locationAlt}
        onPress={gotoAddress}
      />
      <SettingsOption
        name="Profile"
        iconSVG={user}
        onPress={gotoPersonalDetails}
      />
      <SettingsOption
        name="Suggest Product"
        iconSVG={bulb}
        onPress={() => {}}
      />
      <View flex={1} justifyContent={'center'}>
        <Button
          variant={'outline'}
          mt={5}
          w={100}
          h={50}
          alignSelf={'center'}
          rounded={16}
          _text={{fontSize: 15, color: 'error.300'}}>
          Log Out
        </Button>
      </View>
    </View>
  );
};
