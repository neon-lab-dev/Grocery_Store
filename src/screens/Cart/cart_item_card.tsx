/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Center, Image, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';

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
      bg={'common.white'}
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
        <Text fontSize={'sm'} numberOfLines={2}>
          {item.name}
        </Text>
        <Text fontSize={'xs'} color={'accent.500'}>
          {item.weight}
        </Text>
      </View>
      <View flexDir={'row'} justifyContent={'flex-end'}>
        <Center bg={'primary.500'} flexDir={'row'} rounded={8} h={38}>
          <Button
            bg={'transparent'}
            onPress={handleDecrease}
            _text={{fontSize: 'sm'}}
            disabled={count === 1}>
            -
          </Button>
          <Text fontSize={'sm'} color={'white'}>
            {count}
          </Text>
          <Button
            _text={{fontSize: 'sm'}}
            bg={'transparent'}
            onPress={handleIncrease}>
            +
          </Button>
        </Center>
        <View ml={2} alignItems={'center'}>
          <Text fontSize={'md'} color={'primary.500'}>
            ₹{discountPrice}
          </Text>
          <Text fontSize={'xs'} color={'accent.400'} strikeThrough>
            ₹{actualPrice}
          </Text>
        </View>
      </View>
    </View>
  );
};
