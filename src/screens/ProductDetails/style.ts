import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';

export const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: verticalScale(365),
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
  },
  mainImage: {
    width: horizontalScale(233),
    height: verticalScale(183),
  },
  percentageContainer: {
    width: horizontalScale(70),
    height: verticalScale(65),
    backgroundColor: '#F97316',
    marginLeft: horizontalScale(20),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
  },
  percentageText: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(20),
    fontWeight: '700',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  renderImageContainer: {
    width: horizontalScale(56),
    height: verticalScale(56),
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderStyle: 'solid',
    borderWidth: horizontalScale(1.5),
    // borderColor: 'rgba(229, 231, 235, 1.0)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: horizontalScale(6),
  },
  itemName: {
    width: '100%',
    height: verticalScale(24),
    fontSize: scaleFontSize(20),
    fontWeight: '600',
    color: '#1F2937',
  },
  nameContainer: {
    width: '100%',
    height: verticalScale(50),
    justifyContent: 'center',
    borderBottomWidth: 0.2,
    paddingHorizontal: horizontalScale(15),
  },
  unitCard: {
    width: horizontalScale(98),
    height: verticalScale(65),
    borderRadius: 12,
    borderWidth: horizontalScale(1),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  descriptionTitle: {
    fontSize: scaleFontSize(14),
    fontWeight: '500',
    marginVertical: verticalScale(5),
    fontFamily: 'Inter',
    color: '#4B5563',
  },
});
