import React, {FC} from 'react';
import {View, Text, Center} from 'native-base';
import {
  scaleFontSize,
  verticalScale,
  horizontalScale,
} from '../../assets/scaling';

interface BillSummaryCardProps {
  itemPrice: number;
  deliveryCharge: number;
  price: number;
  cutOffPrice: number;
  savingPrice: number;
}

const BillSummaryCard: FC<BillSummaryCardProps> = ({
  itemPrice,
  deliveryCharge,
  price,
  cutOffPrice,
  savingPrice,
}) => {
  return (
    <View
      bgColor={'white'}
      borderRadius={14}
      px={horizontalScale(20)}
      py={verticalScale(20)}
      style={{gap: 10}}
      my={verticalScale(20)}
      mx={horizontalScale(20)}>
      <Text
        fontFamily={'Inter_SemiBold'}
        fontSize={scaleFontSize(20)}
        color={'accent.900'}
        lineHeight={24.2}
        letterSpacing={-0.01}>
        Bill Summary
      </Text>
      <View
        flexDir={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(14)}
          color={'accent.500'}
          lineHeight={16.94}
          letterSpacing={-0.04}>
          Item Total
        </Text>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(14)}
          color={'accent.800'}
          lineHeight={16.94}
          letterSpacing={-0.04}>
          ₹{itemPrice?.toFixed(2)}
        </Text>
      </View>
      <View flexDir={'row'} justifyContent={'space-between'}>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(14)}
          fontWeight={500}
          color={'accent.500'}
          lineHeight={16.94}
          letterSpacing={-0.04}>
          Delivery Charge
        </Text>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(14)}
          color={'accent.800'}
          lineHeight={16.94}
          letterSpacing={-0.04}>
          ₹{deliveryCharge}
        </Text>
      </View>
      <View borderWidth={1} borderRadius={1} borderColor={'accent.100'} />
      <View flexDir={'row'} justifyContent={'space-between'}>
        <View justifyContent={'center'} style={{gap: 2}}>
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={scaleFontSize(14)}
            color={'accent.900'}
            lineHeight={16.94}
            letterSpacing={-0.04}>
            To Pay
          </Text>
          <Text
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(12)}
            color={'accent.500'}
            lineHeight={14.4}
            letterSpacing={-0.03}>
            Incl. all taxes and charges
          </Text>
        </View>
        <View style={{gap: 4}}>
          <View flexDir={'row'} alignItems={'center'} style={{gap: 4}}>
            <Text
              fontFamily={'Inter_Regular'}
              fontSize={scaleFontSize(10)}
              color={'accent.500'}
              strikeThrough
              lineHeight={12.1}
              letterSpacing={-0.04}>
              ₹{cutOffPrice.toFixed(2)}
            </Text>
            <Text
              fontFamily={'Inter_SemiBold'}
              fontSize={scaleFontSize(14)}
              color={'accent.800'}
              lineHeight={16.94}
              letterSpacing={-0.04}>
              ₹{price.toFixed(2)}
            </Text>
          </View>
          <Center
            rounded={4}
            bg={'#4ADE80'}
            py={verticalScale(4)}
            px={horizontalScale(6)}>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(10)}
              color={'white'}
              lineHeight={12.1}
              letterSpacing={-0.04}>
              SAVING ₹{savingPrice.toFixed(2)}
            </Text>
          </Center>
        </View>
      </View>
    </View>
  );
};

export default BillSummaryCard;
