import {Image, Text, View, Pressable, useToast, Box} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import {useDispatch} from 'react-redux';
import {
  decrementItem,
  incrementItem,
  removeItem,
} from '../../redux/slices/actions';

// interface CartItem {
//   id: number;
//   Title: string;
//   image: string;
//   Price: number;
//   quantity:number,
//   Size: string;
//   DisPrice: number;
//   QuantityAvalaible: number;
// item:[
//   // id: number;
//   // Title: string;
//   // image: string;
//   // Price: number;
//   items:[

//   ]
//   // Size: string;
//   // DisPrice: number;
//   // QuantityAvalaible: number;
// ]
// }
// interface items{
//   id: number;
//   Title: string;
//   image: string;
//   Price: number;
//   quantity:number,
//   Size: string;
//   DisPrice: number;
//   QuantityAvalaible: number;
// }

export const CartItemCard: React.FC<{item: any}> = ({item}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const id = 'test-toast';
  // console.log(item);
  const [count, setCount] = useState(item.quantity);
  const [discountPrice, setDiscountPrice] = useState(
    item.varietyList[0].discountPrice * count,
  );
  const [actualPrice, setActualPrice] = useState(
    item.varietyList[0].price * count,
  );

  const handleDecrease = () => {
    if (count == 1) {
      dispatch(removeItem(item.id));
      setCount(0);
    } else {
      dispatch(decrementItem(item.id));
      setCount(count - 1);
    }
  };

  const price = discountPrice;
  const discountPriceRound = price.toFixed(2);
  // console.log(rounded); // Outputs: "236.34"

  const handleIncrease = () => {
    if (count < item.varietyList[0].quantity) {
      dispatch(incrementItem(item.id));
      setCount(count + 1);
    } else {
      if (!toast.isActive(id)) {
        toast.show({
          id,
          duration: 1500,
          render: () => {
            return (
              <Box
                bg="primary.400"
                px="2"
                py="1"
                rounded="sm"
                mb={5}
                _text={{
                  fontWeight: '500',
                  color: 'white',
                }}>
                Sorry, you can't add more of this item
              </Box>
            );
          },
        });
      }
    }
  };

  useEffect(() => {
    setDiscountPrice(item.varietyList[0].discountPrice * count);
    setActualPrice(item.varietyList[0].price * count);
  }, [count, item.varietyList]);

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
          style={{
            height: 45,
            width: 50,
          }}
          alt="Image"
          source={{uri: item.varietyList[0].documentUrls[0]}}
          resizeMode="contain"
          mr={horizontalScale(10)}
        />
        <View justifyContent={'space-evenly'}>
          <Text
            maxWidth={'90%'}
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(14)}
            color={'accent.800'}
            // numberOfLines={3}
            lineHeight={16.8}
            letterSpacing={-0.03}
            w={horizontalScale(120)}>
            {item.name}
          </Text>
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={scaleFontSize(12)}
            color={'accent.500'}
            lineHeight={14.52}
            letterSpacing={-0.04}>
            {item.varietyList[0].value} {item.varietyList[0].unit}
          </Text>
        </View>
      </View>
      <View
        flex={1}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <View
          marginLeft={horizontalScale(25)}
          w={horizontalScale(60)}
          bg={'primary.500'}
          flexDir={'row'}
          rounded={8}
          h={'auto'}
          justifyContent={'flex-end'}
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
            ₹{discountPriceRound}
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
