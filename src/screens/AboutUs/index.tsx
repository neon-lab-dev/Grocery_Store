import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigatorParamList} from '../../navigation/MainNavigation';
import {Linking, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling.ts';
import {View} from 'native-base';
import {SvgXml} from 'react-native-svg';
import {rightOrangeArrowIcon} from '../../assets/images/icons/rightOrangeArrow.js';

type AboutUsProps = {
  navigation: StackNavigationProp<AuthNavigatorParamList, 'About Us'>;
};

export const AboutUs: React.FC<AboutUsProps> = ({navigation, route}) => {
  const openURL = async url => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('An error occurred', error);
    }
  };
  return (
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: horizontalScale(10)}}>
        <Text style={styles.headingText}>About Us</Text>
        <Text style={styles.matter}>
          Welcome to Grocery Store, the ultimate grocery store app designed to
          revolutionize your shopping experience. Whether you're restocking your
          pantry, exploring new snacks and drinks, enhancing your beauty
          regimen, or maintaining a clean and organized home, Grocery Store has
          you covered. Our app offers an extensive range of products across
          multiple categories, ensuring that you find everything you need with
          just a few taps on your smartphone.
        </Text>
        <Text style={[styles.matter, {marginTop: verticalScale(5)}]}>
          Comprehensive Grocery and Kitchen Essentials
        </Text>
        <Text style={[styles.matter, {marginTop: verticalScale(5)}]}>
          Delightful Snacks and Drinks
        </Text>
        <Text style={[styles.matter, {marginTop: verticalScale(5)}]}>
          Beauty and Personal Care
        </Text>
        <Text style={[styles.matter, {marginTop: verticalScale(5)}]}>
          Household Essentials
        </Text>
      </View>

      <View style={{marginTop: 'auto', marginBottom: verticalScale(15)}}>
        <TouchableOpacity
          onPress={() =>
            openURL('https://grocerystore-blond.vercel.app/privacy-policy.html')
          }>
          <View
            bg="white"
            px={horizontalScale(15)}
            py={verticalScale(15)}
            flexDir="row"
            alignItems="center"
            borderBottomColor={'accent.100'}
            borderBottomWidth={1}>
            {/* <SvgXml xml={iconSVG} width={18} height={18} /> */}
            <Text
              fontFamily={'Inter_Regular'}
              fontSize={scaleFontSize(14)}
              color={'black'}
              ml={horizontalScale(10)}
              lineHeight={16.8}
              letterSpacing={-0.03}>
              Privacy Policy
            </Text>
            <View flex={1} alignItems="flex-end">
              <SvgXml xml={rightOrangeArrowIcon} width={9} height={15} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openURL(
              'https://grocerystore-blond.vercel.app/terms-and-conditions.html',
            )
          }>
          <View
            bg="white"
            px={horizontalScale(15)}
            py={verticalScale(15)}
            flexDir="row"
            alignItems="center"
            borderBottomColor={'accent.100'}
            borderBottomWidth={1}>
            {/* <SvgXml xml={iconSVG} width={18} height={18} /> */}
            <Text
              fontFamily={'Inter_Regular'}
              fontSize={scaleFontSize(14)}
              color={'black'}
              ml={horizontalScale(10)}
              lineHeight={16.8}
              letterSpacing={-0.03}>
              Terms & Conditions
            </Text>
            <View flex={1} alignItems="flex-end">
              <SvgXml xml={rightOrangeArrowIcon} width={9} height={15} />
            </View>
          </View>
        </TouchableOpacity>
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
