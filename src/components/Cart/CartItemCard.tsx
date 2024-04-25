/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Center, Image, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {scaleFontSize} from '../../assets/scaling';

export const CartItemCard = ({item}) => {
  const [count, setCount] = useState(item.quantity);
  const [discountPrice, setDiscountPrice] = useState(
    item.discount_price * count,
  );
  const [actualPrice, setActualPrice] = useState(item.actual_price * count);

  const handleDecrease = () => {
    setCount(count - 1);
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    setDiscountPrice(item.discount_price * count);
    setActualPrice(item.actual_price * count);
  }, [count]);

  return (
    <View
      bg={'white'}
      flexDir={'row'}
      py={3}
      px={5}
      alignItems={'center'}
      mb={1}>
      <Image
        source={item.image}
        alt="item"
        h={50}
        w={50}
        resizeMode="contain"
        mr={3}
      />
      <View flexShrink={1}>
        <Text
          fontFamily={'Inter'}
          fontSize={scaleFontSize(14)}
          fontWeight={400}
          color={'accent.800'}
          numberOfLines={2}>
          {item.name}
        </Text>
        <Text
          fontFamily={'Inter'}
          fontSize={scaleFontSize(12)}
          fontWeight={500}
          color={'accent.500'}>
          {item.size}
        </Text>
      </View>
      <View flexDir={'row'} justifyContent={'flex-end'}>
        <Center bg={'primary.500'} flexDir={'row'} rounded={8} h={38}>
          <Button
            bg={'transparent'}
            colorScheme={'orange'}
            onPress={handleDecrease}
            _text={{
              fontFamily: 'Inter',
              fontSize: scaleFontSize(16),
              fontWeight: 600,
            }}
            disabled={count === 1}>
            -
          </Button>
          <Text
            fontFamily={'Inter'}
            fontSize={scaleFontSize(16)}
            fontWeight={600}
            color={'white'}>
            {count}
          </Text>
          <Button
            _text={{
              fontFamily: 'Inter',
              fontSize: scaleFontSize(16),
              fontWeight: 600,
            }}
            bg={'transparent'}
            colorScheme={'orange'}
            onPress={handleIncrease}>
            +
          </Button>
        </Center>
        <View ml={2} alignItems={'center'}>
          <Text
            fontFamily={'Inter'}
            fontSize={scaleFontSize(16)}
            fontWeight={500}
            color={'primary.500'}>
            ₹{discountPrice}
          </Text>
          <Text
            fontFamily={'Inter'}
            fontSize={scaleFontSize(12)}
            fontWeight={400}
            color={'accent.400'}
            strikeThrough>
            ₹{actualPrice}
          </Text>
        </View>
      </View>
    </View>
  );
};
