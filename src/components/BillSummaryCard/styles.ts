// styles.ts

import {StyleSheet} from 'react-native';
import {
  scaleFontSize,
  verticalScale,
  horizontalScale,
} from '../../assets/scaling';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 14,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
    marginVertical: verticalScale(20),
    marginHorizontal: horizontalScale(20),
    gap: 10,
  },
  billSummaryText: {
    fontFamily: 'Inter_SemiBold',
    fontSize: scaleFontSize(20),
    color: 'accent.900',
    lineHeight: 24.2,
    letterSpacing: -0.01,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTotalText: {
    fontFamily: 'Inter_Medium',
    fontSize: scaleFontSize(14),
    color: 'accent.500',
    lineHeight: 16.94,
    letterSpacing: -0.04,
  },
  itemPriceText: {
    fontFamily: 'Inter_Medium',
    fontSize: scaleFontSize(14),
    color: 'accent.800',
    lineHeight: 16.94,
    letterSpacing: -0.04,
  },
  deliveryChargeText: {
    fontFamily: 'Inter_Medium',
    fontSize: scaleFontSize(14),
    fontWeight: '500',
    color: 'accent.500',
    lineHeight: 16.94,
    letterSpacing: -0.04,
  },
  deliveryChargePriceText: {
    fontFamily: 'Inter_Medium',
    fontSize: scaleFontSize(14),
    color: 'accent.800',
    lineHeight: 16.94,
    letterSpacing: -0.04,
  },
  divider: {
    borderWidth: 1,
    borderRadius: 1,
    borderColor: 'accent.100',
  },
  toPayText: {
    fontFamily: 'Inter_Medium',
    fontSize: scaleFontSize(14),
    color: 'accent.900',
    lineHeight: 16.94,
    letterSpacing: -0.04,
  },
  inclTaxesText: {
    fontFamily: 'Inter_Regular',
    fontSize: scaleFontSize(12),
    color: 'accent.500',
    lineHeight: 14.4,
    letterSpacing: -0.03,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cutOffPriceText: {
    fontFamily: 'Inter_Regular',
    fontSize: scaleFontSize(10),
    color: 'accent.500',
    textDecorationLine: 'line-through',
    lineHeight: 12.1,
    letterSpacing: -0.04,
  },
  currentPriceText: {
    fontFamily: 'Inter_SemiBold',
    fontSize: scaleFontSize(14),
    color: 'accent.800',
    lineHeight: 16.94,
    letterSpacing: -0.04,
    marginBottom: 4,
  },
  savingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  savingText: {
    fontFamily: 'Inter_Medium',
    fontSize: scaleFontSize(10),
    color: 'white',
    lineHeight: 12.1,
    letterSpacing: -0.04,
  },
  savingBackground: {
    borderRadius: 4,
    backgroundColor: '#4ADE80',
    paddingVertical: verticalScale(4),
    paddingHorizontal: horizontalScale(6),
  },
});

export default styles;
