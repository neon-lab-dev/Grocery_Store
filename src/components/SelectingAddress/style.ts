import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';

export const styles = StyleSheet.create({
  selectAddressBox: {
    width: 430,
    height: 72,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(20),
    alignItems: 'center',
  },
  selectAddressText: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(18),
    fontWeight: '500',
    color: '#1F2937',
    marginRight: horizontalScale(15),
  },
  addAddress: {
    width: 430,
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
    width: 430,
    height: 30,
    paddingHorizontal: horizontalScale(20),
    marginVertical: verticalScale(5),
    marginTop: 10,
  },
  addressBox: {
    width: 'auto',
    height: 97,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: horizontalScale(0.15),
    paddingHorizontal: horizontalScale(15),
  },
  addressDetails: {
    width: 310,
    height: 34,
    color: '#9CA3AF',
    fontSize: scaleFontSize(14),
  },
  addressType: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(16),
    fontWeight: '500',
    color: '#111827',
  },
});
