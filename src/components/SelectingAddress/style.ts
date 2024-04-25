import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';

export const styles = StyleSheet.create({
  selectAddressBox: {
    width: '100%',
    height: 72,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: horizontalScale(20),
    alignItems: 'center',
  },
  selectAddressText: {
    fontFamily: 'Inter_Medium',
    fontSize: scaleFontSize(18),
    color: '#1F2937',
    marginRight: horizontalScale(5),
  },
  addAddress: {
    width: '100%',
    height: 64,
    borderRadius: horizontalScale(12),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(243, 244, 246, 1.0)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  savedAdd: {
    width: '100%',
    paddingHorizontal: horizontalScale(20),
    marginTop: verticalScale(10),
  },
  addressBox: {
    width: 'auto',
    height: verticalScale(70),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: horizontalScale(0.15),
    paddingHorizontal: horizontalScale(15),
  },
  addressDetails: {
    width: horizontalScale(230),
    height: 34,
    color: '#9CA3AF',
    fontFamily: 'Inter_Regular',
    fontSize: scaleFontSize(14),
  },
  addressType: {
    fontFamily: 'Inter_Medium',
    fontSize: scaleFontSize(16),
    color: '#111827',
  },
});
