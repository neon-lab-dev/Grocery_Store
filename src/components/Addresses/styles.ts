import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  scaleFontSize,
} from '../../assets/scaling';

const styles = StyleSheet.create({
  addressCard: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(15),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(12),
  },
  addressDetails: {
    width: horizontalScale(180),
    gap: horizontalScale(4),
  },
  editDeleteContainer: {
    flexDirection: 'row',
    gap: horizontalScale(32),
  },
});

export default styles;
