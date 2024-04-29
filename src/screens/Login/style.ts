import {StyleSheet} from 'react-native';
import {horizontalScale} from '../../assets/scaling';
export const styles = StyleSheet.create({
  imageBackground: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF7ED',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  inputSection: {
    flex: 0.5,
    alignItems: 'center',
    paddingHorizontal: horizontalScale(10),
    backgroundColor: '#FFF7ED',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(10),
  },
});
