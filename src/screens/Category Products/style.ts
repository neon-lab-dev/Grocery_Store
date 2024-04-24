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
    borderTopColor:"#e3e2e0",
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  leftCard: {
    width: horizontalScale(90),
    borderRightWidth: horizontalScale(.25),
    borderRightColor:"#e3e2e0"
  },
  rightCard: {
    width: horizontalScale(240),
    marginTop:verticalScale(8)
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
  categoriesLeft: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(12),
    fontWeight: '400',
    lineHeight: verticalScale(14.5),
    textAlign: 'center',
  },

});
