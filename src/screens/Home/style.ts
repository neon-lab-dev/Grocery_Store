import {Dimensions, StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import {Colors} from '../../constants/colors';
const {width} = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  Category: {
    marginLeft: horizontalScale(18),
  },
  CategoryText: {
    color: Colors.accent[700],
    fontFamily: 'Inter_SemiBold',
    fontSize: scaleFontSize(20),
    marginTop: verticalScale(22),
  },
  SubCategoryText: {
    fontFamily: 'Inter_Regular',
    fontSize: scaleFontSize(16),
    color: '#6B7280',
  },
  ExploreCatgories: {
    height: '100%',
    width: width < 370 ? 84 : 92,
  },
  ExploreCatgoriesText: {
    fontSize: width < 370 ? 10 : 12,
    color: Colors.accent[600],
    // fontFamily: 'Inter_Medium',
    fontWeight: '500',
    alignSelf: 'center',
    right: verticalScale(2),
    marginVertical: verticalScale(5),
    marginBottom: 40,
  },
  floatingButton: {
    position: 'absolute',
    bottom: verticalScale(5),
    right: horizontalScale(20),
    width: width < 370 ? 70 : 72,
    height: width < 370 ? 70 : 72,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
});

export default style;
