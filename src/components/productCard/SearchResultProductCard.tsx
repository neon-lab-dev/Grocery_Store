import React, {useState} from 'react';
import {View, Text, Image, Pressable, useToast, Box} from 'native-base';
import {styles} from './style';
import {Colors} from '../../constants/colors';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import {calculateDiscountPercentage} from '../../utils/calculatePercentage';
import { useDispatch } from 'react-redux';
import { addToCart, decrementItem, removeItem } from '../../redux/slices/actions';
interface ProductDataItem {
  id: number;
  Title: string;
  image: string;
  Price: number;
  Size: string;
  QuantityAvalaible:number;
  quantity:number;
  DisPrice: number;
}
interface SearchProductCardProps {
  onPress: () => void;
  products: ProductDataItem;
}

const SearchProductCard: React.FC<SearchProductCardProps> = ({
  onPress,
  products,
}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const id = 'test-toast';
  const [count, setCount] = useState(0);
  const [isButton1Visible, setIsButton1Visible] = useState(true);
  const handleDecrease = () => {
    if (count == 1) {
      dispatch(removeItem(products.id));
      setIsButton1Visible(true);
      setCount(0);
    } else {
      dispatch(decrementItem(products.id));
      setCount(count - 1);
    }
  };
  const handleIncrease = () => {
    if (count < products.QuantityAvalaible) {
    dispatch(addToCart(products));
      setCount(count + 1);
    } else {
      if (!toast.isActive(id)) {
        toast.show({
          id,
          placement:'top',
          duration: 1500,
          render: () => {
            return (
             <View  style={{zIndex:1000}}>
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
    products.quantity=1;
    dispatch(addToCart(products));
    setIsButton1Visible(false);
  };
  let off = calculateDiscountPercentage(products.DisPrice, products.Price);
  return (
    <View flex={1}>
      <Pressable position={'relative'} onPress={onPress}>
        <View
          bgColor={'accent.50'}
          borderRadius={16}
          px={horizontalScale(20)}
          py={verticalScale(20)}>
          <View
            bgColor={'primary.500'}
            position={'absolute'}
            borderBottomLeftRadius={8}
            borderBottomRightRadius={8}
            px={horizontalScale(3)}
            py={verticalScale(2)}
            top={0}
            left={horizontalScale(15)}>
            <Text
              fontFamily={'Inter_Bold'}
              color={'white'}
              fontSize={scaleFontSize(11)}
              alignSelf={'center'}>
              {off.toFixed(0)}%
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
          <Image
            source={getImage(products.image)}
            alt="Product Image"
            height={113}
            width={118}
            resizeMode="contain"
          />
        </View>
      </Pressable>
      <View pb={verticalScale(45)}>
        <Text
          // fontFamily={'Inter_Medium'}
          fontWeight={500}
          fontSize={scaleFontSize(16)}
          color={'accent.800'}
          lineHeight={19.36}
          mt={1}
          letterSpacing={-0.04}>
          {products.Title}
        </Text>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(12)}
          color={'accent.500'}
          lineHeight={14.52}
          letterSpacing={-0.04}>
          {products.Size}
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
            fontSize={scaleFontSize(14)}
            color={'accent.800'}
            lineHeight={16.94}
            letterSpacing={-0.04}>
            ₹{products.Price}
          </Text>
          <Text
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(12)}
            color={'accent.400'}
            strikeThrough
            mt={-verticalScale(1)}
            lineHeight={14.52}
            letterSpacing={-0.04}>
            ₹{products.DisPrice}
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
            onPress={handleButtonPress}>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(14)}
              color={'primary.500'}
              lineHeight={16.94}
              letterSpacing={-0.08}>
              ADD
            </Text>
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
const getImage = (imageName: string) => {
  switch (imageName) {
    case 'item1':
      return require('../../assets/images/Product-Image/Tomato.png');
    case 'item2':
      return require('../../assets/images/Product-Image/Ginger.png');
  }
};
export default SearchProductCard;
