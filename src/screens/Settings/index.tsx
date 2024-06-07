/* eslint-disable react-native/no-inline-styles */
import {Button, Center, Image, Modal, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';

import SettingsOption from '../../components/Settings/SettingsOptionComponent';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {bulb} from '../../assets/images/icons/bulb';
import {shoppingBag} from '../../assets/images/icons/shopping-bag';
import {locationAlt} from '../../assets/images/icons/location-alt';
import {comment} from '../../assets/images/icons/comment';
import {user} from '../../assets/images/icons/user';
import {Keyboard, KeyboardEvent, Pressable, TextInput} from 'react-native';

import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import {CallNumber} from '../../utils/launchIntents';
import {SvgXml} from 'react-native-svg';
import {accountIcon} from '../../assets/images/icons/account_circle';
import {close} from '../../assets/images/icons/close';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/slices/auth.slice';
import {toast} from '../../components/Toast/Toast';
import Loader from '../../components/Loader/Loader';
import {createSuggestion, getOrders} from '../../api/auth_routes';
import {REACT_APP_PHONE_NO} from '@env';
interface SettingsProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Settings'>;
  route: any;
}

export const Settings: React.FC<SettingsProps> = ({navigation, route}) => {
  const [showError, setShowError] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [resMsg, setResMsg] = useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [suggestion, setSuggestion] = useState('');
  const userDetails = route.params.userDetails;

  useEffect(() => {
    getOrders();
    function onKeyboardDidShow(e: KeyboardEvent) {
      setKeyboardHeight(e.endCoordinates.height);
      setIsClicked(true);
    }

    function onKeyboardDidHide() {
      setKeyboardHeight(0);
      setIsClicked(false);
    }

    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide,
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (userDetails) {
      setName(userDetails.name);
      setPhoneNo(userDetails.primaryPhoneNo);
    }
  }, [userDetails]);
  const dispatch = useDispatch();
  const gotoPersonalDetails = () => {
    navigation.navigate('PersonalDetails');
  };
  const gotoHelp = () => {
    CallNumber(REACT_APP_PHONE_NO);
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
    navigation.reset({
      index: 0,
      routes: [{name: 'Auth'}],
    });
  };

  const sendSuggestion = async () => {
    if (suggestion.length === 0) {
      setShowError(true);
    } else {
      setModalVisible(false);
      setLoaderVisible(true);
      try {
        const message = await createSuggestion(suggestion);
        setSuggestion('');
        setLoaderVisible(false);
        // console.log(message);
        toast.showToast(message.message);
      } catch {
        toast.showToast({
          title: resMsg,
        });
      }
    }
  };
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
                {name}
              </Text>
              <Text
                fontFamily={'Inter_Regular'}
                fontSize={scaleFontSize(14)}
                color={'accent.600'}
                lineHeight={16.94}
                letterSpacing={-0.04}>
                {phoneNo}
              </Text>
            </View>
          </View>
          <Modal isOpen={modalVisible} size={'full'} onClose={onclose}>
            <Modal.Content
              mb={keyboardHeight}
              bg={'white'}
              mt={'auto'}
              h={'50%'}
              px={horizontalScale(15)}
              borderTopLeftRadius={28}
              borderTopRightRadius={28}>
              <View flex={1}>
                <View style={styles.selectOverLayBox}>
                  <Pressable onPress={onclose}>
                    <SvgXml xml={close} height={24} width={24} />
                  </Pressable>
                </View>
                <View alignItems={'center'} mb={verticalScale(8)}>
                  <Text style={[styles.SuggestText]}>Suggest Products</Text>
                </View>
                <View alignItems={'center'} mb={verticalScale(15)}>
                  <Text style={styles.Text}>
                    Lorem ipsum dolor sit amet consectetur. Quam diam lacus.
                  </Text>
                </View>
                <TextInput
                  value={suggestion}
                  onChangeText={e => setSuggestion(e)}
                  onFocus={() => setIsClicked(true)}
                  onBlur={() => setIsClicked(false)}
                  textAlignVertical="top"
                  placeholder="Enter Here"
                  placeholderTextColor={'#9CA3AF'}
                  style={{
                    flex: 1,
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
                {showError && (
                  <Text
                    fontFamily={'Inter_Regular'}
                    fontSize={scaleFontSize(15)}
                    color={'#EF4444'}
                    mb={verticalScale(4)}
                    lineHeight={16.8}
                    letterSpacing={-0.03}>
                    Suggestion field cannot be Empty*
                  </Text>
                )}

                <Button
                  mb={verticalScale(10)}
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
                    color: 'primary.50',
                  }}
                  onPress={sendSuggestion}>
                  Send
                </Button>
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
          <Loader isOpen={loaderVisible} />
        </View>
      )}
    </>
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
