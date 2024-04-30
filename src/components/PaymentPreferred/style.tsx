import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F9FAFB',
    justifyContent: 'space-between',
    flex: 1,
  },
  billSummaryCard: {
    width: horizontalScale(305),
    height: verticalScale(160),
    borderRadius: horizontalScale(14),
    backgroundColor: '#FFFFFF',
    padding: 17,
    marginTop: verticalScale(30),
  },
  billSummaryText: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(20),
    fontWeight: '700',
    color: '#111827',
  },
  totalCard: {
    width: horizontalScale(275),
    height: verticalScale(13),
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  keysText: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(14),
    fontWeight: '500',
    color: '#6B7280',
  },
  line: {
    width: horizontalScale(275),
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  cutOffPrice: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(12),
    fontWeight: '400',
    lineHeight: verticalScale(12),
    letterSpacing: -0.04,
    textDecorationLine: 'line-through',
  },
  savingCard: {
    width: horizontalScale(73),
    height: verticalScale(20),
    backgroundColor: '#4ADE80',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  savingText: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(12),
    fontWeight: '500',
    lineHeight: verticalScale(12.1),
    letterSpacing: -0.04,
    color: '#FFFFFF',
  },
  boldText: {
    fontSize: scaleFontSize(14),
    fontWeight: '600',
    color: '#1F2937',
  },
  paymentPreferredCard: {
    width: horizontalScale(315),
    height: verticalScale(140),
    backgroundColor: '#FFFFFF',
    borderRadius: horizontalScale(14),
    padding: 17,
    marginTop: verticalScale(5),
    // margin: 26,
    borderWidth: horizontalScale(1),
    borderColor: '#E5E7EB',
    marginLeft: horizontalScale(18),
  },
  bottomLayout: {
    height: verticalScale(120),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  paymentPreferredText: {
    fontSize: scaleFontSize(18),
    fontFamily: 'Inter_Medium',
    // lineHeight: verticalScale(21.78),
    letterSpacing: -0.04,
    color: '#4B5563',
  },
  paymentPreferredTitle: {
    fontSize: scaleFontSize(18),
    fontFamily: 'Inter_SemiBold',
    letterSpacing: -0.04,
    textAlign: 'left',
    color: '#111827',
    marginVertical: verticalScale(5),
    marginTop: verticalScale(5),
  },
  bottomCard: {
    width: horizontalScale(305),
    height: verticalScale(45),
    backgroundColor: '#F97316',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 13,
  },
  codImage: {
    width: horizontalScale(24),
    height: verticalScale(24),
  },
  payOndelivey: {
    width: horizontalScale(20),
    height: verticalScale(20),
  },
  bottomCardText: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(20),
    fontWeight: '600',
    letterSpacing: -0.02,
    color: '#FFF7ED',
  },
  straightLine: {
    height: verticalScale(15),
    width: horizontalScale(5),
    backgroundColor: '#FFF7ED',
  },
  selectListCard: {
    width: '100%',
    height: verticalScale(42),
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // Drop-Down-List-Styles

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(22),
    marginRight: horizontalScale(20),
    backgroundColor: 'red',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: verticalScale(123),
    width: '100%',
    elevation: 3,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: verticalScale(15),
    textAlign: 'center',
  },
});
