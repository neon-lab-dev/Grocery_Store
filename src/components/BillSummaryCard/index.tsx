import React, {FC} from 'react';
import {View, Text, Center} from 'native-base';

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
      <Text fontSize={'fs20'}>Bill Summary</Text>
      <View flexDir={'row'} justifyContent={'space-between'}>
        <Text fontSize={'fs14'} color={'accent.500'}>
          Item Total
        </Text>
        <Text fontSize={'fs14'}>₹{itemPrice}</Text>
      </View>
      <View flexDir={'row'} justifyContent={'space-between'}>
        <Text fontSize={'fs14'} color={'accent.500'}>
          Delivery Charge
        </Text>
        <Text fontSize={'fs14'}>₹{deliveryCharge}</Text>
      </View>
      <View
        borderWidth={1}
        borderRadius={1}
        borderColor={'accent.100'}
        my={2}
      />
      <View flexDir={'row'} justifyContent={'space-between'} pt={1}>
        <Text fontSize={'fs14'}>Total Bill</Text>
        <Center flexDir={'row'}>
          <Text fontSize={'fs10'} color={'accent.500'} strikeThrough pr={1}>
            ₹{cutOffPrice}
          </Text>
          <Text bold fontSize={'fs14'}>
            ₹{price}
          </Text>
        </Center>
      </View>
      <View flexDir={'row'} justifyContent={'space-between'}>
        <Text fontSize={'fs12'} color={'accent.500'}>
          Incl. all taxes and charges
        </Text>
        <Center rounded={8} bg={'success.400'} w={'auto'} h={6} px={2}>
          <Text fontSize={'fs10'} color={'white'}>
            SAVING ₹{savingPrice}
          </Text>
        </Center>
      </View>
    </View>
  );
};

export default BillSummaryCard;
