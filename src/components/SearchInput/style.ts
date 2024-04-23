import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize, width} from '../../assets/scaling';

export const styles = StyleSheet.create({
  container: {
    height: 56,
    marginHorizontal: horizontalScale(18),
    borderRadius: horizontalScale(12),
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 1.0)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: horizontalScale(10),
    marginBottom: 35,
  },
  line: {
    width: 1,
    height: 24,
    backgroundColor: 'grey',
  },
  searchInput: {
    width: '80%',
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: scaleFontSize(16),
    color: '#4B5563',
  },
});
