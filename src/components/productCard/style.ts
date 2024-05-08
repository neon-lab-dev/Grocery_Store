import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import { fontWeight } from '../../constants/fonts';
export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: '100%',
    marginLeft: horizontalScale(18),
  },
  Image: {
    width: horizontalScale(90),
    height: verticalScale(70),
    alignSelf: 'center',
  },
  Title: {
    fontWeight:'500',
    fontSize: scaleFontSize(16),
    color: '#1F2937',
    marginTop: verticalScale(4),
  },
  Price: {
    fontFamily: 'Inter_Medium',
    fontSize: scaleFontSize(16),
    color: '#1F2937',
  },
  DisPrice: {
    fontFamily: 'Inter_Regular',
    fontSize: scaleFontSize(12),
    color: Colors.accent[400],
    marginBottom: verticalScale(17),
    marginTop: verticalScale(-4),
  },
  Button: {
    borderRadius: 10,
    paddingVertical: verticalScale(3),
    paddingHorizontal: horizontalScale(16),
    borderWidth: 1,
    borderColor: Colors.primary[400],
    marginHorizontal: horizontalScale(30),
  },
  ButtonText: {
    // fontFamily: 'Inter_Medium',
    color: Colors.primary[400],
    fontSize: scaleFontSize(16),
    fontWeight:'500',
  },
  Quantity: {
    fontFamily: 'Inter_Medium',
    fontSize: scaleFontSize(12),
    color: Colors.accent[500],
  },
});

