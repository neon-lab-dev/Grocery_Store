import {Button, Center, Image, Modal, Text, View} from 'native-base';
import React from 'react';
import SettingsOption from '../../components/Settings/SettingsOptionComponent';
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
import {CallNumber} from '../../utils/launchIntents';
import {SvgXml} from 'react-native-svg';
import {accountIcon} from '../../assets/images/icons/account_circle';
import {close} from '../../assets/images/icons/close';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/slices/auth.slice';
interface SettingsProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Settings'>;
}
export const Settings: React.FC<SettingsProps> = ({navigation}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const dispatch = useDispatch();
  const gotoPersonalDetails = () => {
    navigation.navigate('PersonalDetails');
  };
  const gotoHelp = () => {
    CallNumber(1234567890);
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
  const handleLogOut = () => {
    dispatch(logout());
  };
  return (
    <View flex={1} bgColor={'accent.50'}>
      <View
        flexDir={'row'}
        height={100}
        alignItems={'center'}
        bg={'white'}
        px={horizontalScale(20)}
        mb={verticalScale(5)}>
        <Center
          bg={'primary.500'}
          borderRadius={100}
          overflow={'hidden'}
          p={horizontalScale(10)}
          mr={horizontalScale(10)}>
          <SvgXml xml={accountIcon} height={27} width={27} />
        </Center>
        <View>
          <Text
            fontFamily={'Inter_SemiBold'}
            fontSize={scaleFontSize(20)}
            color={'accent.800'}
            lineHeight={24.2}
            letterSpacing={-0.01}>
            Salmaan Ahmed
          </Text>
          <Text
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(14)}
            color={'accent.600'}
            lineHeight={16.94}
            letterSpacing={-0.04}>
            96000 16417
          </Text>
        </View>
      </View>
      <Modal isOpen={modalVisible} size={'full'} onClose={onclose}>
        <Modal.Content
          mb={0}
          bg={'white'}
          mt={'auto'}
          h={'50%'}
          px={horizontalScale(15)}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}>
          <View>
            <View style={styles.selectOverLayBox}>
              <Pressable onPress={onclose}>
                <SvgXml xml={close} height={24} width={24} />
              </Pressable>
            </View>
            <View alignItems={'center'}>
              <Text style={[styles.SuggestText]}>Suggest Products</Text>
            </View>
            <View alignItems={'center'} mb={verticalScale(15)}>
              <Text style={styles.Text}>
                Lorem ipsum dolor sit amet consectetur. Quam diam lacus.
              </Text>
            </View>
            <TextInput
              textAlignVertical="top"
              placeholder="Enter Here"
              placeholderTextColor={'#9CA3AF'}
              style={{
                height: 160,
                backgroundColor: '#F3F4F6',
                borderRadius: 15,
                paddingTop: verticalScale(15),
                paddingHorizontal: horizontalScale(15),
                marginBottom: verticalScale(15),
                fontFamily: 'Inter_Medium',
                fontSize: scaleFontSize(16),
                lineHeight: 19.36,
                letterSpacing: -0.04,
              }}
            />
            <Center>
              <Button
                w={'100%'}
                py={verticalScale(15)}
                rounded={12}
                colorScheme={'transparent'}
                bg={'primary.500'}
                _text={{
                  fontFamily: 'Inter_SemiBold',
                  fontSize: scaleFontSize(20),
                  lineHeight: 24.2,
                  letterSpacing: -0.04,
                }}
                onPress={() => {}}>
                Send
              </Button>
            </Center>
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
      <Center flex={1}>
        <Button
          onPress={handleLogOut}
          variant={'outline'}
          px={horizontalScale(30)}
          py={verticalScale(14)}
          alignItems={'center'}
          rounded={16}
          borderWidth={2}
          borderColor={'accent.200'}
          colorScheme={'muted'}
          _text={{
            fontFamily: 'Inter_Medium',
            fontSize: scaleFontSize(18),
            color: 'error.300',
            lineHeight: 21.78,
            letterSpacing: -0.04,
          }}>
          Log Out
        </Button>
      </Center>
    </View>
  );
};

export const styles = StyleSheet.create({
  selectOverLayBox: {
    paddingVertical: verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  SuggestText: {
    fontFamily: 'Inter_SemiBold',
    fontSize: scaleFontSize(20),
    color: '#1F2937',
    lineHeight: 24.2,
    letterSpacing: -0.01,
  },
  Text: {
    fontFamily: 'Inter_Regular',
    fontSize: scaleFontSize(12),
    color: '#1F2937',
    lineHeight: 16.8,
    letterSpacing: -0.03,
  },
});
