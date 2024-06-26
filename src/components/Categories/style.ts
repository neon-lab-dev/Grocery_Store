import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling.ts';

export const styles = StyleSheet.create({
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
  leftImage: {
    width: horizontalScale(66),
    height: verticalScale(70),
    borderRadius: horizontalScale(16),
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesLeft: {
    fontFamily: 'Inter_Regular',
    fontSize: scaleFontSize(12),
    lineHeight: verticalScale(11),
    textAlign: 'center',
    color: '#4B5563',
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
});
