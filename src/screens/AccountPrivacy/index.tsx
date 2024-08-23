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
        We "Grocery Store" (“Kirana Store”), are committed to protecting the
        privacy and security of your personal information. Your privacy is
        important to us and maintaining your trust is paramount.
      </Text>
      <Text style={[styles.matter, {marginTop: verticalScale(5)}]}>
        This privacy policy explains how we collect, use, process and disclose
        information about you. By using our website/ app/ platform and
        affiliated services, you consent to the terms of our privacy policy
        (“Privacy Policy”) in addition to our ‘Terms of Use.’ We encourage you
        to read this privacy policy to understand the collection, use, and
        disclosure of your information from time to time, to keep yourself
        updated with the changes and updates that we make to this policy.
      </Text>
      <Text style={[styles.matter, {marginTop: verticalScale(5)}]}>
        This privacy policy describes our privacy practices for all websites,
        products and services that are linked to it. However this policy does
        not apply to those affiliates and partners that have their own privacy
        policy. In such situations, we recommend that you read the privacy
        policy on the applicable site.
      </Text>
      <Text style={[styles.matter, {marginTop: verticalScale(5)}]}>
        Should you have any clarifications regarding this privacy policy, please
        write to us at arpitksr@gmail.com
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
