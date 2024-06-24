import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale, scaleFontSize } from '../../assets/scaling';

const styles = StyleSheet.create({
  addressCard: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(15),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:1
   
  },
  addressCardDiv:{
    width:horizontalScale(180),
    gap:horizontalScale(4),
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(12),
  },
  addressDetails: {
    width: horizontalScale(180),
    gap: horizontalScale(4),
  },
  editDeleteContainer: {
    flexDirection: 'row',
    gap: horizontalScale(32),
  },
  addressName: {
    fontFamily: 'Inter_Medium',
    fontSize: scaleFontSize(16),
    color: 'accent.900',
    lineHeight: 19.36,
    letterSpacing: -0.04,
  },
  addressDiscription: {
    fontFamily: 'Inter_Regular',
    fontSize: scaleFontSize(14),
    color: 'accent.400',
    lineHeight: 16.8,
    letterSpacing: -0.03,
  },


});

export default styles;
