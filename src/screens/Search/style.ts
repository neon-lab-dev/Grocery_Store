import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: -8,
  },
  radioLabel: {
    marginLeft: 3,
  },
  sliderContainer: {
    justifyContent: 'center',
    marginBottom: -20,
  },
  sliderTrack: {
    height: 8,
    borderRadius: 10,
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
  },
  pressedMarker: {
    height: 20,
    width: 20,
    backgroundColor: '#22C55E',
    borderWidth: 3,
    borderColor: '#BBF7D0',
  },
});
