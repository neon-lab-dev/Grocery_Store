import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';

export const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#F9FAFB',
    width: '100%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  offPerContainer: {
    backgroundColor: '#F97316',
    width: horizontalScale(54),
    left: horizontalScale(23),
    borderBottomRightRadius: 13,
    borderBottomLeftRadius: 13,
    padding: 5,
  },
  percentageText: {
    fontFamily: 'Inter_Bold',
    fontSize: scaleFontSize(16),
    textAlign: 'center',
    color: '#FFFFFF',
    lineHeight: 19.36,
    letterSpacing: -0.04,
  },
  smImage: {
    backgroundColor: '#FFFFFF',
    width: horizontalScale(56),
    height: verticalScale(50),
    borderRadius: 12,
    borderWidth: horizontalScale(1),
    borderColor: '#E5E7EB',
    padding: 15,
  },
  productName: {
    // fontFamily: 'Inter',
    fontSize: scaleFontSize(20),
    fontFamily: 'Inter_SemiBold',
    textAlign: 'left',
    color: '#1F2937',
    marginTop: verticalScale(18),
    lineHeight: 24.2,
    letterSpacing: -0.01,
    // paddingVertical: 10,
  },
  selectUnitText: {
    // fontFamily: 'Inter',
    fontSize: scaleFontSize(18),
    fontFamily: 'Inter_Medium',
    textAlign: 'left',
    color: '#1F2937',
    lineHeight: 19.36,
    letterSpacing: -0.04,
  },
  unitCardContainer: {
    borderWidth: horizontalScale(1),
    borderColor: '#E5E7EB',
    width: horizontalScale(90),
    padding: 12,
    alignItems: 'center',
    borderRadius: 12,
    gap: 3,
  },
  selectUnitCardContainer: {
    borderWidth: horizontalScale(1),
    borderColor: '#F97316',
    width: horizontalScale(90),
    padding: 12,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FFF7ED',
    gap: 3,
  },
  unitCardKgText: {
    color: '#1F2937',
    // fontFamily: 'Inter',
    fontFamily: 'Inter_Regular',
    fontSize: scaleFontSize(16),
    lineHeight: 20,
    letterSpacing: -0.03,
  },
  unitCardPriceText: {
    // fontFamily: 'Inter',
    fontSize: scaleFontSize(14),
    fontFamily: 'Inter_SemiBold',
    color: '#1F2937',
    lineHeight: 16.94,
    letterSpacing: -0.04,
  },
  unitCardCutOffprice: {
    // fontFamily: 'Inter',
    fontSize: scaleFontSize(12),
    fontFamily: 'Inter_Regular',
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
    lineHeight: 14.52,
    letterSpacing: -0.04,
  },
  productDetailsText: {
    fontSize: scaleFontSize(16),
    fontFamily: 'Inter_Medium',
    textAlign: 'left',
    color: '#1F2937',
    lineHeight: 19.36,
    letterSpacing: -0.04,
  },
  descriptionText: {
    fontSize: scaleFontSize(14),
    fontFamily: 'Inter_Medium',
    textAlign: 'left',
    color: '#4B5563',
    lineHeight: 16.94,
    letterSpacing: -0.04,
  },
  descriptionContent: {
    fontSize: scaleFontSize(14),
    fontFamily: 'Inter_Regular',
    textAlign: 'left',
    color: '#6B7280',
    lineHeight: 16.8,
    letterSpacing: -0.03,
  },
  viewDetailsText: {
    fontFamily: 'Inter_Medium',
    fontSize: scaleFontSize(14),
    fontFamily: 'Inter_Medium',
    textAlign: 'left',
    color: '#F97316',
    lineHeight: 16.94,
    letterSpacing: -0.04,
  },
  similarProductsText: {
    fontSize: scaleFontSize(20),
    fontFamily: 'Inter_SemiBold',
    textAlign: 'left',
    color: '#374151',
    lineHeight: 24.2,
    letterSpacing: -0.05,
  },
  bottomLayoutkgText: {
    fontSize: scaleFontSize(13),
    fontWeight: '500',
    color: '#6B7280',
  },
  bottomLayoutPrice: {
    fontSize: scaleFontSize(20),
    fontWeight: '600',
    textAlign: 'left',
    color: '#1F2937',
  },
  addToCartButton: {
    backgroundColor: '#F97316',
    textAlign: 'center',
    paddingVertical: verticalScale(14),
    borderRadius: 12,
    paddingHorizontal: horizontalScale(24),
  },
  addToCartText: {
    fontSize: scaleFontSize(16),
    fontWeight: '500',
    textAlign: 'center',
    color: '#FFF7ED',
  },
  bottomLayoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    paddingVertical: verticalScale(28),
    backgroundColor: '#ffffff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  bottomLayoutOfferText: {
    fontSize: scaleFontSize(12),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  percentageOff: {
    paddingVertical: verticalScale(1),
    paddingHorizontal: horizontalScale(7),
    backgroundColor: '#4ADE80',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageOffText: {
    fontSize: scaleFontSize(12),
    fontWeight: '600',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  floatingButton: {
    paddingHorizontal: horizontalScale(28),
    paddingVertical: verticalScale(19),
    backgroundColor: '#F97316',
    position: 'absolute',
    left: horizontalScale(240),
    bottom: verticalScale(20),
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  floatingButtonText: {
    fontSize: scaleFontSize(14),
    fontWeight: '700',
    textAlign: 'center',
    color: '#F9FAFB',
  },
  viewMore: {
    paddingHorizontal: horizontalScale(24),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(12),
    gap: 5,
  },
});
