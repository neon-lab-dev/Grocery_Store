import {Button, Center, Image, Modal, Text, View} from 'native-base';
import React from 'react';
import SettingsOption from './settings_options_component';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {bulb} from '../../assets/images/icons/bulb';
import {shoppingBag} from '../../assets/images/icons/shopping-bag';
import {locationAlt} from '../../assets/images/icons/location-alt';
import {comment} from '../../assets/images/icons/comment';
import {user} from '../../assets/images/icons/user';
import {Pressable, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import {Colors} from '../../constants/colors';
interface SettingsProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Settings'>;
}
export const Settings: React.FC<SettingsProps> = ({navigation}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
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
  const SuggestProductOverlay = () => {
    setModalVisible(true);
  };
  const onclose = () => {
    setModalVisible(false);
  };
  const gotoSplash = () => {
    navigation.navigate('Splash');
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
      <Modal isOpen={modalVisible} size={'full'}>
        <Modal.Content
          mb={0}
          bg={'white'}
          mt={'auto'}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}>
          <View>
            <View style={styles.selectOverLayBox}>
              <Pressable onPress={onclose}>
                <Image
                  alt="image"
                  source={require('../../assets/images/icons/close.png')}
                  style={{marginRight: 20}}
                />
              </Pressable>
            </View>
            <View style={styles.addBox}>
              <Text style={[styles.SuggestText]}>Suggest Products</Text>
            </View>
            <View>
              <Text style={styles.Text}>
                Lorem ipsum dolor sit amet consectetur. Quam diam lacus.
              </Text>
            </View>
            <TextInput
              textAlignVertical="top"
              placeholder="Enter Here"
              placeholderTextColor={Colors.accent[400]}
              style={{
                height: 160,
                backgroundColor: Colors.accent[200],
                borderRadius: 15,
                margin: 15,
                marginBottom: 5,
              }}
            />
            <View
              h={100}
              borderTopLeftRadius={14}
              borderTopRightRadius={14}
              bg={'white'}>
              <Center flex={1} px={5}>
                <Button
                  w={'100%'}
                  h={50}
                  rounded={12}
                  bg={'primary.500'}
                  _text={{fontSize: 'lg', fontWeight: '600'}}
                  onPress={() => {}}>
                  Send
                </Button>
              </Center>
            </View>
          </View>
        </Modal.Content>
      </Modal>
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
        onPress={SuggestProductOverlay}
      />
      <View flex={1} justifyContent={'center'}>
        <Button
        onPress={gotoSplash}
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

export const styles = StyleSheet.create({
  selectOverLayBox: {
    width: '100%',
    height: 72,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: horizontalScale(20),
    alignItems: 'center',
  },
  SuggestText: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(20),
    fontWeight: '700',
    color: '#1F2937',
    marginRight: horizontalScale(15),
  },
  Text: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(11),
    fontWeight: '400',
    alignSelf: 'center',
    color: '#1F2937',
  },
  addBox: {
    width: '100%',
    borderRadius: horizontalScale(12),
    borderColor: 'rgba(243, 244, 246, 1.0)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
