import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {horizontalScale, scaleFontSize} from '../../assets/scaling';
export const styles = StyleSheet.create({
  Container: {
    width: '100%',
    marginLeft: horizontalScale(18),
  },
  Image: {
    width: 110,
    height: 110,
    alignSelf: 'center',
  },
  Title: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  Price: {
    fontSize: scaleFontSize(16),
    color: 'black',

  },
  DisPrice: {
    fontSize: scaleFontSize(14),
  },
  Button: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.primary[400],
    marginHorizontal: 25,
  },
  ButtonText: {
    color: Colors.primary[400],
    fontSize: 14,
  },
  cutLine: {
    position: 'absolute',
    top: '75%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#333',
  },
  Quantity: {
    fontSize: scaleFontSize(12),
    color: Colors.accent[400],
  },
});
