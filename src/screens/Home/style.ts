import { StyleSheet } from 'react-native';
import { horizontalScale } from '../../assets/scaling';

const style = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(24),
    justifyContent: 'center',
  },
});

export default style;
