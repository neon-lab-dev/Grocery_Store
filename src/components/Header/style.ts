import {StyleSheet} from 'react-native';
import {spacing} from '../../constants/spacing';
import {scaleFontSize} from '../../assets/scaling';

export const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: spacing.s12,
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
    fontSize: scaleFontSize(16),
    fontWeight: 'bold',
  },
  cartContainer: {
    backgroundColor: '#FED7AA',
    position: 'absolute',
    top: -9,
    right: -12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    borderWidth: 0.1,
  },
  cartQuantity: {
    color: 'black',
    fontSize: scaleFontSize(13),
  },
});
