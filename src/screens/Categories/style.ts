import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    borderTopWidth: horizontalScale(1),
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#F3F4F6',
  },
  leftCard: {
    flex: 1,
    // width: horizontalScale(90),
    borderRightWidth: horizontalScale(1),
    borderColor: '#F3F4F6',
  },
  rightCard: {
    flex: 3,
    // width: horizontalScale(330),
    padding: 5,
  },
  mainCategoryCard: {
    width: horizontalScale(90),
    marginVertical: verticalScale(3),
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  categoryCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(66),
    height: verticalScale(111),
    marginLeft: horizontalScale(9),
    // backgroundColor: 'orange',
    gap: 3,
  },
  subCategoryCard: {
    width: horizontalScale(66),
    height: verticalScale(100),
    marginHorizontal: horizontalScale(8.5),
    gap: 5,
  },
  rightImage: {
    width: horizontalScale(66),
    height: verticalScale(73),
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  leftImage: {
    width: horizontalScale(66),
    height: verticalScale(70),
    borderRadius: horizontalScale(16),
    backgroundColor: '#FFF7ED',
  },

  selectedItem: {
    backgroundColor: '#F97316',
    width: horizontalScale(4),
    height: verticalScale(53),
    marginTop: verticalScale(15),
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    marginLeft: horizontalScale(5.5),
  },
  categoriesTitle: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(16),
    fontWeight: '700',
    lineHeight: verticalScale(19.3),
    textAlign: 'left',
    color: '#374151',
  },
  categoriesLeft: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(12),
    fontWeight: '400',
    lineHeight: verticalScale(12),
    textAlign: 'center',
    color: '#4B5563',
  },
  categoriesRight: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(12),
    fontWeight: '500',
    lineHeight: verticalScale(12),
    textAlign: 'center',
    color: '#4B5563',
  },
});
