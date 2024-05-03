import React, {useState} from 'react';
import {View, Text, Image, Pressable} from 'native-base';
import {styles} from './style';
import {Colors} from '../../constants/colors';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import {calculateDiscountPercentage} from '../../utils/calculatePercentage';
interface ProductDataItem {
  id: number;
  Title: string;
  image: string;
  Price: number;
  Quantity: string;
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
  const [count, setCount] = useState(1);
  const [isButton1Visible, setIsButton1Visible] = useState(true);
  const handleDecrease = () => {
    if (count === 1) {
      setIsButton1Visible(true);
    } else {
      setCount(count - 1);
    }
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };
  const handleButtonPress = () => {
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
      <View pb={verticalScale(30)}>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(16)}
          color={'accent.800'}>
          {products.Title}
        </Text>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(12)}
          color={'accent.500'}>
          {products.Quantity}
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
            color={'accent.800'}>
            ₹{products.Price}
          </Text>
          <Text
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(12)}
            color={'accent.400'}
            strikeThrough
            mt={-verticalScale(3)}>
            ₹{products.DisPrice}
          </Text>
        </View>
        {isButton1Visible ? (
          <Pressable
            borderRadius={10}
            borderWidth={1}
            borderColor={'primary.500'}
            w={horizontalScale(50)}
            alignItems={'center'}
            justifyContent={'center'}
            py={verticalScale(3)}
            onPress={handleButtonPress}>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(14)}
              color={'primary.500'}>
              ADD
            </Text>
          </Pressable>
        ) : (
          <View
            w={horizontalScale(50)}
            borderRadius={10}
            bgColor={'primary.500'}
            py={verticalScale(3)}
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
                color={'white'}>
                -
              </Text>
            </Pressable>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(14)}
              color={'white'}>
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
                color={'white'}>
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
