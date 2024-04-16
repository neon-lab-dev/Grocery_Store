import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
export const styles = StyleSheet.create({
  selectAddressBox: {
    width: '100%',
    height: horizontalScale(70),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: horizontalScale(20),
  },
  selectAddressText: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(18),
    fontWeight: '500',
    fontStyle: 'normal',
    color: '#1F2937',
    marginRight: horizontalScale(15),
    marginLeft: horizontalScale(5),
  },
});
