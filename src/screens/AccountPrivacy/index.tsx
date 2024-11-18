import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigatorParamList} from '../../navigation/MainNavigation';
import {StyleSheet, Text, View} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling.ts';
import SettingsOption from '../../components/Settings/SettingsOptionComponent';
import {deleteIcon} from '../../assets/images/icons/delete.js';

type AccountPrivacyProps = {
  navigation: StackNavigationProp<AuthNavigatorParamList, 'Account Privacy'>;
};

export const AccountPrivacy: React.FC<AccountPrivacyProps> = ({
  navigation,
  route,
}) => {
  return (
    <View style={{paddingHorizontal: horizontalScale(10)}}>
      <Text style={styles.headingText}>Account Privacy</Text>
      <Text style={styles.matter}>
        Welcome to EasyNeeds! At EasyNeeds, we value your privacy and are
        committed to protecting your personal information. This Privacy Policy
        outlines how we collect, use, and safeguard your data while providing
        our services.
      </Text>
      <Text style={[styles.matter, {marginTop: verticalScale(5)}]}>
        Information We Collect Personal Information: Name, contact details,
        address, and payment information provided during registration and order
        placement. Usage Data: Details about how you use our app, including
        browsing patterns, device information, and app performance.
      </Text>
      {/* <Text style={[styles.matter, {marginTop: verticalScale(5)}]}>
        How We Use Your Information To process your orders and deliver products
        efficiently. To improve our app's functionality and user experience. To
        send notifications, promotional offers, and updates.
      </Text> */}
      <Text style={[styles.matter, {marginTop: verticalScale(5)}]}>
        Data Security We implement robust security measures to protect your data
        from unauthorized access or disclosure. However, no system is entirely
        foolproof, and we cannot guarantee absolute security.
      </Text>
      <Text style={[styles.matter, {marginTop: verticalScale(5)}]}>
        Sharing Your Information We do not sell or share your personal data with
        third parties except as required for service delivery, legal compliance,
        or fraud prevention.
      </Text>
      <Text style={[styles.matter, {marginTop: verticalScale(5)}]}>
        Your Rights Access and update your personal information. Request
        deletion of your data (subject to legal or operational constraints).
        Contact Us For questions or concerns about this policy, reach out to us
        at 8595090886.
      </Text>
      <View style={{marginTop: verticalScale(10)}}>
        <SettingsOption
          name="Request to delete account"
          iconSVG={deleteIcon}
          onPress={() => navigation.navigate('Delete Account')}
        />
      </View>
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
  },
  matter: {
    color: 'black',
    fontSize: scaleFontSize(14),
    lineHeight: verticalScale(18),
    fontWeight: '400',
  },
});
