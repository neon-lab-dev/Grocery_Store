import React, {FC} from 'react';
import {View, Text, Center} from 'native-base';
import {scaleFontSize} from '../../assets/scaling';

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
        fontFamily={'Inter'}
        fontSize={scaleFontSize(20)}
        fontWeight={600}
        color={'accent.900'}>
        Bill Summary
      </Text>
      <View flexDir={'row'} justifyContent={'space-between'}>
        <Text
          fontFamily={'Inter'}
          fontSize={scaleFontSize(14)}
          fontWeight={500}
          color={'accent.500'}>
          Item Total
        </Text>
        <Text
          fontFamily={'Inter'}
          fontSize={scaleFontSize(14)}
          fontWeight={500}
          color={'accent.800'}>
          ₹{itemPrice}
        </Text>
      </View>
      <View flexDir={'row'} justifyContent={'space-between'}>
        <Text
          fontFamily={'Inter'}
          fontSize={scaleFontSize(14)}
          fontWeight={500}
          color={'accent.500'}>
          Delivery Charge
        </Text>
        <Text
          fontFamily={'Inter'}
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
      <View flexDir={'row'} justifyContent={'space-between'} pt={1}>
        <Text
          fontFamily={'Inter'}
          fontSize={scaleFontSize(14)}
          fontWeight={500}
          color={'accent.900'}>
          Total Bill
        </Text>
        <Center flexDir={'row'}>
          <Text
            fontFamily={'Inter'}
            fontSize={scaleFontSize(10)}
            fontWeight={400}
            color={'accent.500'}
            strikeThrough
            pr={1}>
            ₹{cutOffPrice}
          </Text>
          <Text
            fontFamily={'Inter'}
            fontSize={scaleFontSize(14)}
            fontWeight={600}
            color={'accent.800'}>
            ₹{price}
          </Text>
        </Center>
      </View>
      <View flexDir={'row'} justifyContent={'space-between'}>
        <Text
          fontFamily={'Inter'}
          fontSize={scaleFontSize(12)}
          fontWeight={400}
          color={'accent.500'}>
          Incl. all taxes and charges
        </Text>
        <Center rounded={8} bg={'success.400'} w={'auto'} h={6} px={2}>
          <Text
            fontFamily={'Inter'}
            fontSize={scaleFontSize(10)}
            fontWeight={500}
            color={'white'}>
            SAVING ₹{savingPrice}
          </Text>
        </Center>
      </View>
    </View>
  );
};

export default BillSummaryCard;
