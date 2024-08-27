import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigatorParamList} from '../../navigation/MainNavigation';
import {StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling.ts';
import {Pressable, View, Text, Alert, VStack, Box} from 'native-base';
import {SvgXml} from 'react-native-svg';
import {rightOrangeArrowIcon} from '../../assets/images/icons/rightOrangeArrow.js';
import {useEffect, useState} from 'react';
import {toast} from '../../components/Toast/Toast';
import {deleteUser} from '../../api/auth_routes/index.ts';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/slices/auth.slice.ts';
type DeleteAccountProps = {
  navigation: StackNavigationProp<AuthNavigatorParamList, 'Delete Account'>;
};

export const DeleteAccount: React.FC<DeleteAccountProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch();
  const [showError, setShowEror] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [Selection, setSelection] = useState('');
  const [alertShow, setAlertShow] = useState(false);

  const handleDeleteAccount = () => {
    setAlertShow(true);
  };

  useEffect(() => {
    const isLoggedIn = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      if (alertShow) {
        handleLogOut();
      }
    };
    isLoggedIn();
  }, [alertShow]);

  const handleLogOut = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{name: 'Auth'}],
    });
  };

  const deleteAccount = async () => {
    try {
      const response = await deleteUser();
      if (response === 200) {
        handleDeleteAccount();
      }
    } catch (error) {}
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          paddingHorizontal: horizontalScale(5),
          marginRight: horizontalScale(10),
        }}>
        {Selection.length > 0 ? (
          <Text style={styles.headingText}>{Selection}</Text>
        ) : (
          <Text style={styles.headingText}>Delete Account</Text>
        )}

        {Selection.length > 0 && (
          <Text
            style={{
              fontSize: scaleFontSize(14),
              fontWeight: '400',
              marginLeft: horizontalScale(20),
            }}>
            Do you have a feedback fo rus? we would like to hear from you!
            (optional)
          </Text>
        )}

        {Selection.length > 0 ? (
          <View style={styles.container}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Here"
              placeholderTextColor="#C7C7CD"
              value={suggestion}
              onChangeText={setSuggestion}
              multiline={true}
            />
            <Pressable
              onPress={deleteAccount}
              style={{
                borderRadius: 8,
                width: horizontalScale(300),
                height: verticalScale(51),
                backgroundColor: '#F97316',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#FFF7ED',
                  textAlign: 'center',
                  fontSize: scaleFontSize(16),
                  lineHeight: verticalScale(19),
                }}>
                Delete my account
              </Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() =>
                setSelection("I don't want to use the app anymore")
              }>
              <View
                mt={2}
                bg="white"
                px={horizontalScale(20)}
                py={verticalScale(15)}
                flexDir="row"
                justifyContent={'space-between'}
                alignItems="center"
                borderBottomColor={'accent.100'}
                borderBottomWidth={1}>
                {/* <SvgXml xml={iconSVG} width={18} height={18} /> */}
                <Text
                  fontFamily={'Inter_Regular'}
                  fontSize={scaleFontSize(14)}
                  color={'accent.800'}
                  ml={horizontalScale(10)}
                  lineHeight={16.8}
                  letterSpacing={-0.03}>
                  I don't want to use the app anymore
                </Text>
                <View flex={1} alignItems="flex-end">
                  <SvgXml xml={rightOrangeArrowIcon} width={9} height={15} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelection('I’m using a different account')}>
              <View
                mt={1}
                bg="white"
                px={horizontalScale(20)}
                py={verticalScale(15)}
                flexDir="row"
                alignItems="center"
                borderBottomColor={'accent.100'}
                borderBottomWidth={1}>
                {/* <SvgXml xml={iconSVG} width={18} height={18} /> */}
                <Text
                  fontFamily={'Inter_Regular'}
                  fontSize={scaleFontSize(14)}
                  color={'accent.800'}
                  ml={horizontalScale(10)}
                  lineHeight={16.8}
                  letterSpacing={-0.03}>
                  I’m using a different account
                </Text>
                <View flex={1} alignItems="flex-end">
                  <SvgXml xml={rightOrangeArrowIcon} width={9} height={15} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelection('I’m worried about my privacy')}>
              <View
                mt={1}
                bg="white"
                px={horizontalScale(20)}
                py={verticalScale(15)}
                flexDir="row"
                alignItems="center"
                borderBottomColor={'accent.100'}
                borderBottomWidth={1}>
                {/* <SvgXml xml={iconSVG} width={18} height={18} /> */}
                <Text
                  fontFamily={'Inter_Regular'}
                  fontSize={scaleFontSize(14)}
                  color={'accent.800'}
                  ml={horizontalScale(10)}
                  lineHeight={16.8}
                  letterSpacing={-0.03}>
                  I’m worried about my privacy
                </Text>
                <View flex={1} alignItems="flex-end">
                  <SvgXml xml={rightOrangeArrowIcon} width={9} height={15} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelection('Other')}>
              <View
                mt={1}
                bg="white"
                px={horizontalScale(20)}
                py={verticalScale(15)}
                flexDir="row"
                alignItems="center"
                borderBottomColor={'accent.100'}
                borderBottomWidth={1}>
                {/* <SvgXml xml={iconSVG} width={18} height={18} /> */}
                <Text
                  fontFamily={'Inter_Regular'}
                  fontSize={scaleFontSize(14)}
                  color={'accent.800'}
                  ml={horizontalScale(10)}
                  lineHeight={16.8}
                  letterSpacing={-0.03}>
                  Other
                </Text>
                <View flex={1} alignItems="flex-end">
                  <SvgXml xml={rightOrangeArrowIcon} width={9} height={15} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {alertShow && (
        <View style={{marginTop: 'auto'}}>
          <Alert w="100%" status="success">
            <VStack space={1} flexShrink={1} w="100%" alignItems="center">
              <Alert.Icon size="md" />
              <Text
                fontSize="md"
                fontWeight="medium"
                _dark={{
                  color: 'coolGray.800',
                }}>
                Account Deleted!
              </Text>

              <Box
                _text={{
                  textAlign: 'center',
                }}
                _dark={{
                  _text: {
                    color: 'coolGray.600',
                  },
                }}>
                All of your personal data and content associated with your
                account will be permanently deleted from our systems.
              </Box>
            </VStack>
          </Alert>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headingText: {
    fontSize: scaleFontSize(18),
    color: 'black',
    fontWeight: '700',
    lineHeight: 21,
    fontFamily: 'Inter_ExtraBold',
    marginVertical: verticalScale(10),
    marginLeft: horizontalScale(35),
  },
  matter: {
    color: 'black',
    fontSize: scaleFontSize(14),
    lineHeight: verticalScale(18),
    fontWeight: '400',
  },
  container: {
    justifyContent: 'center',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  textInput: {
    height: 150,
    width: 340,
    borderColor: '#E5E5EA',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    textAlignVertical: 'top', // Aligns text to the top for multiline TextInput
    backgroundColor: '#F5F5F7',
    // marginRight: horizontalScale(20),
  },
});
