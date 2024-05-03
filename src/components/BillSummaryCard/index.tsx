import React, {FC, version} from 'react';
import {View, Text, Center} from 'native-base';
import {scaleFontSize, verticalScale} from '../../assets/scaling';

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
    <View p={5} bgColor={'white'} borderRadius={14} m={'5'}>
      <Text
        fontFamily={'Inter_SemiBold'}
        fontSize={scaleFontSize(20)}
        color={'accent.900'}>
        Bill Summary
      </Text>
      <View
        flexDir={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        my={1}>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(14)}
          color={'accent.500'}>
          Item Total
        </Text>
        <Text
          fontFamily={'Inter Medium'}
          fontSize={scaleFontSize(14)}
          color={'accent.800'}>
          ₹{itemPrice}
        </Text>
      </View>
      <View flexDir={'row'} justifyContent={'space-between'}>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(14)}
          fontWeight={500}
          color={'accent.500'}>
          Delivery Charge
        </Text>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(14)}
          fontWeight={500}
          color={'accent.800'}>
          ₹{deliveryCharge}
        </Text>
      </View>
      <View
        borderWidth={1}
        borderRadius={1}
        borderColor={'accent.100'}
        my={2}
      />
      <View
        flexDir={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        pt={1}>
        <Text
          fontFamily={'Inter_SemiBold'}
          fontSize={scaleFontSize(14)}
          color={'accent.900'}>
          To Pay
        </Text>
        <Center flexDir={'row'}>
          <Text
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(10)}
            color={'accent.500'}
            strikeThrough
            pr={1}>
            ₹{cutOffPrice}
          </Text>
          <Text
            fontFamily={'Inter_SemiBold'}
            fontSize={scaleFontSize(14)}
            color={'accent.800'}>
            ₹{price}
          </Text>
        </Center>
      </View>
      <View flexDir={'row'} justifyContent={'space-between'}>
        <Text
          fontFamily={'Inter_Regular'}
          fontSize={scaleFontSize(12)}
          color={'accent.500'}
          mt={-verticalScale(2)}>
          Incl. all taxes and charges
        </Text>
        <Center rounded={8} bg={'success.400'} w={'auto'} h={6} px={2}>
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={scaleFontSize(10)}
            color={'white'}>
            SAVING ₹{savingPrice}
          </Text>
        </Center>
      </View>
    </View>
  );
};

export default BillSummaryCard;
