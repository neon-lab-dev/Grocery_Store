import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {horizontalScale, scaleFontSize, verticalScale} from '../../assets/scaling';
export const styles = StyleSheet.create({
  Container: {
    flex:1,
    width: '100%',
    marginLeft: horizontalScale(18),
  },
  Image: {
    width: horizontalScale(90),
    height: verticalScale(70),
    alignSelf: 'center'
  },
  Title: {
    fontSize: scaleFontSize(16),
    color: 'black',
    fontWeight:'500',
    marginTop: verticalScale(4),
  },
  Price: {
    fontSize: scaleFontSize(16),
    color: 'black',
  },
  DisPrice: {
    fontSize: scaleFontSize(12),
    color:Colors.accent[400]
  },
  Button: {
    borderRadius: 10,
    paddingVertical: verticalScale(3),
    paddingHorizontal: horizontalScale(16),
    borderWidth: 1,
    borderColor: Colors.primary[400],
    marginHorizontal: horizontalScale(25),
  },
  ButtonText: {
    color: Colors.primary[400],
    fontSize: scaleFontSize(15),
  },
  Quantity: {
    fontSize: scaleFontSize(12),
    color: Colors.accent[400],
  },
});
