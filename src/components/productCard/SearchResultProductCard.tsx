import React, {useEffect, useState} from 'react';
import {View, Text, Image, Pressable, useToast, Box} from 'native-base';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
  width,
} from '../../assets/scaling';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  decrementItem,
  incrementItem,
  removeItem,
} from '../../redux/slices/actions';
import {capitalizeFirstLetter} from '../../utils/capitalizeWord';
interface ProductDataItem {
  id: string;
  name: string;
  code: string;
  category: string;
  subCategory: string;
  description: string;
  varietyList: ProductVariety[];
}
interface ProductVariety {
  id: string;
  type: string;
  value: string;
  unit: string;
  description: string;
  price: number;
  discountPercent: number;
  discountPrice: number;
  quantity: number;
  productId: string;
  documentUrls: string[];
}

interface SearchProductCardProps {
  onPress: (name: string) => void;
  products: ProductDataItem;
}

const SearchProductCard: React.FC<SearchProductCardProps> = ({
  onPress,
  products,
}) => {
  const product = {...products, id: products.varietyList[0].id};
  const dispatch = useDispatch();
  const toast = useToast();
  const id = 'test-toast';
  const cartItems = useSelector((state: any) => state.cart.items);
  const cartItem = cartItems.find((item: any) => item.id === product.id);
  const [count, setCount] = useState(cartItem ? cartItem.quantity : 0);
  const [isButton1Visible, setIsButton1Visible] = useState(count === 0);

  useEffect(() => {
    setCount(cartItem ? cartItem.quantity : 0);
    setIsButton1Visible(!cartItem);
  }, [cartItem]);

  const offerPerIndex = products.varietyList.findIndex(
    item => item.discountPercent > 0,
  );

  const handleDecrease = () => {
    if (count === 1) {
      dispatch(removeItem(product.id));
      setIsButton1Visible(true);
      setCount(0);
    } else {
      dispatch(decrementItem(product.id));
      setCount(count - 1);
    }
  };
  const handleIncrease = () => {
    if (count < products.varietyList[0].quantity) {
      dispatch(incrementItem(product.id));
      setCount(count + 1);
    } else {
      if (!toast.isActive(id)) {
        toast.show({
          id,
          placement: 'top',
          duration: 2500,
          render: () => {
            return (
              <View style={{zIndex: 1000}}>
                <Box
                  zIndex={1000}
                  bg="primary.400"
                  px="2"
                  py="1"
                  rounded="sm"
                  _text={{
                    fontWeight: '500',
                    color: 'white',
                  }}>
                  Sorry, you can't add more of this item
                </Box>
              </View>
            );
          },
        });
      }
    }
  };
  const handleButtonPress = () => {
    setCount(1);
    product.quantity = 1;
    dispatch(addToCart(product));
    setIsButton1Visible(false);
  };
  return (
    <View h={verticalScale(240)} w={width / 2 - 25}>
      <Pressable position={'relative'} onPress={() => onPress(products.name)}>
        <View
          bgColor={'accent.50'}
          borderRadius={16}
          px={horizontalScale(20)}
          py={verticalScale(20)}>
          {offerPerIndex >= 0 && (
            <View
              bgColor={'primary.500'}
              position={'absolute'}
              borderBottomLeftRadius={8}
              borderBottomRightRadius={8}
              px={horizontalScale(3)}
              py={verticalScale(2)}
              top={0}
              left={horizontalScale(15)}
              zIndex={10}>
              <Text
                fontFamily={'Inter_Bold'}
                color={'white'}
                fontSize={scaleFontSize(11)}
                alignSelf={'center'}>
                {products.varietyList[offerPerIndex].discountPercent}%
              </Text>
              <Text
                fontFamily={'Inter_Bold'}
                fontSize={scaleFontSize(12)}
                alignSelf={'center'}
                color={'white'}
                marginTop={-verticalScale(4)}>
                OFF
              </Text>
            </View>
          )}
          {products.varietyList[0].documentUrls[0] ? (
            <Image
              source={{uri: products.varietyList[0].documentUrls[0]}}
              alt="Product Image"
              height={113}
              width={118}
              borderRadius={12}
              resizeMode="contain"
            />
          ) : (
            <View h={113} w={118} />
          )}
        </View>
      </Pressable>
      <View pb={verticalScale(30)}>
        <Text
          fontFamily={'Inter_Medium'}
          fontWeight={500}
          fontSize={scaleFontSize(16)}
          color={'accent.800'}
          lineHeight={19.36}
          mt={1}
          letterSpacing={-0.04}
          numberOfLines={2}>
          {capitalizeFirstLetter(products.name)}
        </Text>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(12)}
          color={'accent.500'}
          lineHeight={14.52}
          letterSpacing={-0.04}>
          {`${products.varietyList[0].value} ${products.varietyList[0].unit}`}
        </Text>
      </View>
      <View
        w={'100%'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        position={'absolute'}
        bottom={0}>
        <View>
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={
              products.varietyList[0].discountPrice < 1000
                ? scaleFontSize(14)
                : scaleFontSize(13)
            }
            color={'accent.800'}
            lineHeight={16.94}
            letterSpacing={-0.04}>
            ₹{products.varietyList[0].discountPrice}
          </Text>
          <Text
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(12)}
            color={'accent.400'}
            strikeThrough
            mt={-verticalScale(1)}
            lineHeight={14.52}
            letterSpacing={-0.04}>
            ₹{products.varietyList[0].price}
          </Text>
        </View>
        {isButton1Visible ? (
          <Pressable
            borderRadius={10}
            borderWidth={1}
            borderColor={'primary.500'}
            w={horizontalScale(60)}
            alignItems={'center'}
            justifyContent={'center'}
            py={verticalScale(5)}
            onPress={handleButtonPress}
            position={'relative'}>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(14)}
              color={'primary.500'}
              lineHeight={16.94}
              letterSpacing={-0.08}>
              ADD
            </Text>
            {products.varietyList.length > 1 && (
              <View
                position={'absolute'}
                bottom={-verticalScale(5)}
                bgColor={'white'}
                alignItems={'center'}
                px={horizontalScale(1)}>
                <Text
                  fontFamily={'Inter_Medium'}
                  fontSize={scaleFontSize(8)}
                  lineHeight={9.68}
                  letterSpacing={-0.04}
                  color={'accent.500'}>
                  {products.varietyList.length} Options
                </Text>
              </View>
            )}
          </Pressable>
        ) : (
          <View
            w={horizontalScale(60)}
            borderRadius={10}
            bgColor={'primary.500'}
            py={verticalScale(5)}
            flexDir={'row'}
            alignItems={'center'}
            justifyContent={'space-evenly'}>
            <Pressable
              onPress={handleDecrease}
              hitSlop={{
                top: verticalScale(10),
                bottom: verticalScale(10),
                left: horizontalScale(10),
                right: horizontalScale(10),
              }}>
              <Text
                fontFamily={'Inter_Medium'}
                fontSize={scaleFontSize(14)}
                color={'white'}
                lineHeight={16.94}
                letterSpacing={-0.04}>
                -
              </Text>
            </Pressable>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(14)}
              color={'white'}
              lineHeight={16.94}
              letterSpacing={-0.04}>
              {count}
            </Text>
            <Pressable
              onPress={handleIncrease}
              hitSlop={{
                top: verticalScale(10),
                bottom: verticalScale(10),
                left: horizontalScale(10),
                right: horizontalScale(10),
              }}>
              <Text
                fontFamily={'Inter_Medium'}
                fontSize={scaleFontSize(14)}
                color={'white'}
                lineHeight={16.94}
                letterSpacing={-0.04}>
                +
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};
export default SearchProductCard;
