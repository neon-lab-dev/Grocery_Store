import {Image, Text, View, Pressable} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';

interface CartItem {
  id: number;
  name: string;
  size: string;
  image: any;
  discount_price: number;
  actual_price: number;
  quantity: number;
}

export const CartItemCard: React.FC<{item: CartItem}> = ({item}) => {
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
  }, [count, item.actual_price, item.discount_price]);

  return (
    <View
      flex={1}
      bg={'white'}
      flexDir={'row'}
      py={verticalScale(10)}
      px={horizontalScale(20)}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderBottomWidth={1}
      borderBottomColor={'accent.100'}>
      <View flex={1} flexDir={'row'}>
        <Image
          source={item.image}
          resizeMode="cover"
          alt="item"
          mr={horizontalScale(10)}
        />
        <View justifyContent={'space-evenly'}>
          <Text
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(14)}
            color={'accent.800'}
            numberOfLines={2}
            lineHeight={16.8}
            letterSpacing={-0.03}>
            {item.name}
          </Text>
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={scaleFontSize(12)}
            color={'accent.500'}
            lineHeight={14.52}
            letterSpacing={-0.04}>
            {item.size}
          </Text>
        </View>
      </View>
      <View
        flex={1}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'flex-end'}>
        <View
          w={horizontalScale(60)}
          bg={'primary.500'}
          flexDir={'row'}
          rounded={8}
          h={'auto'}
          justifyContent={'space-between'}
          alignItems={'center'}
          px={horizontalScale(5)}
          py={verticalScale(5)}>
          <Pressable
            flex={1}
            hitSlop={{
              top: verticalScale(10),
              bottom: verticalScale(10),
              left: horizontalScale(10),
              right: horizontalScale(10),
            }}
            onPress={handleDecrease}
            disabled={count === 1}
            alignItems={'center'}>
            <Text
              fontFamily={'Inter_SemiBold'}
              color={'primary.50'}
              fontSize={scaleFontSize(14)}
              textAlign={'center'}
              lineHeight={19.36}
              letterSpacing={-0.04}>
              -
            </Text>
          </Pressable>
          <Text
            mx={horizontalScale(5)}
            fontFamily={'Inter_Medium'}
            fontSize={scaleFontSize(14)}
            color={'primary.50'}
            textAlign={'center'}
            lineHeight={19.36}
            letterSpacing={-0.04}>
            {count}
          </Text>
          <Pressable
            flex={1}
            hitSlop={{
              top: verticalScale(20),
              bottom: verticalScale(20),
              left: horizontalScale(10),
              right: horizontalScale(10),
            }}
            onPress={handleIncrease}
            alignItems={'center'}>
            <Text
              fontFamily={'Inter_SemiBold'}
              color={'primary.50'}
              fontSize={scaleFontSize(14)}
              onPress={handleIncrease}
              textAlign={'center'}
              lineHeight={19.36}
              letterSpacing={-0.04}>
              +
            </Text>
          </Pressable>
        </View>
        <View ml={horizontalScale(10)} alignItems={'center'}>
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={scaleFontSize(16)}
            color={'primary.500'}
            lineHeight={19.36}
            letterSpacing={-0.04}>
            ₹{discountPrice}
          </Text>
          <Text
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(12)}
            color={'accent.400'}
            mt={-verticalScale(2)}
            strikeThrough
            lineHeight={14.52}
            letterSpacing={-0.04}>
            ₹{actualPrice}
          </Text>
        </View>
      </View>
    </View>
  );
};
