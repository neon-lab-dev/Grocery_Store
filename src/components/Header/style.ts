import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import {Colors} from '../../constants/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: verticalScale(15),
    // backgroundColor: 'red',
  },
  cartFlex: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginLeft: 10,
    fontFamily: 'Inter_SemiBold',
    fontSize: scaleFontSize(16),
    color: '#4B5563',
  },
  cartContainer: {
    backgroundColor: '#DDD6FE',
    position: 'absolute',
    top: -6,
    right: -20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    flex: 1,
    borderWidth: 0.1,
    width: horizontalScale(20),
    height: horizontalScale(20),
  },
  cartQuantity: {
    fontFamily: 'Inter_Medium',
    color: '#6D28D9',
    fontSize: scaleFontSize(14),
  },
});
