import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    borderTopWidth: horizontalScale(0.25),
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  leftCard: {
    width: horizontalScale(90),
    borderRightWidth: horizontalScale(0.25),
  },
  rightCard: {
    width: horizontalScale(330),
    padding: 5,
  },
  mainCategoryCard: {
    width: horizontalScale(90),
    marginVertical: verticalScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(66),
    height: verticalScale(111),
    marginLeft: horizontalScale(9),
    gap: 9,
  },
  subCategoryCard: {
    width: horizontalScale(66),
    height: verticalScale(100),
    marginHorizontal: horizontalScale(5),
    gap: 3,
  },
  rightImage: {
    width: horizontalScale(66),
    height: verticalScale(73),
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  leftImage: {
    width: horizontalScale(66),
    height: verticalScale(77),
    borderRadius: horizontalScale(16),
    backgroundColor: '#FFF7ED',
  },

  selectedItem: {
    backgroundColor: '#F97316',
    width: horizontalScale(5),
    height: verticalScale(63),
    marginTop: verticalScale(6),
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  categoriesTitle: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(16),
    fontWeight: '600',
    lineHeight: verticalScale(19.3),
    textAlign: 'left',
    color: '#374151',
  },
  categoriesLeft: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(12),
    fontWeight: '400',
    lineHeight: verticalScale(14.5),
    textAlign: 'center',
    color: '#4B5563',
  },
  categoriesRight: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(12),
    fontWeight: '500',
    lineHeight: verticalScale(14.5),
    textAlign: 'center',
    color: '#4B5563',
  },
});
