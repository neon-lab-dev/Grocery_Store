import {StyleSheet} from 'react-native';
import {horizontalScale} from '../../assets/scaling';

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default style;
