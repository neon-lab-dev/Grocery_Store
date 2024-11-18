import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/scaling';
export const styles = StyleSheet.create({
  imageBackground: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F3FF',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  inputSection: {
    flex: 0.5,
    alignItems: 'center',
    paddingHorizontal: horizontalScale(10),
    backgroundColor: '#F5F3FF',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(10),
  },
  linearGradient: {
    borderRadius: 12,
    width: '100%',
    marginTop: verticalScale(10),
  },
});
