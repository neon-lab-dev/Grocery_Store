import {StyleSheet} from 'react-native';
import {verticalScale} from '../../assets/scaling';

export const styles = StyleSheet.create({
  sliderContainer: {
    justifyContent: 'center',
    marginBottom: -verticalScale(15),
    marginTop: verticalScale(15),
  },
  sliderTrack: {
    height: 8,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },
  selectedTrack: {
    backgroundColor: '#22C55E',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    height: 20,
    width: 20,
    backgroundColor: '#22C55E',
    borderWidth: 3,
    borderColor: '#BBF7D0',
  },
});
