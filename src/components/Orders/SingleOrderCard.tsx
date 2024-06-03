import {Text, View} from 'native-base';
import * as React from 'react';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import {Image} from 'react-native';
import {capitalizeFirstLetter} from '../../utils/capitalizeWord';

interface Product {
  documents: string[]; // Array of image URLs
  name: string;
  discountedPrice: number;
  price: number;
}

export const SingleOrderCard: React.FC<{product: Product}> = ({product}) => {
  return (
    <View
      bg={'white'}
      justifyContent={'space-between'}
      flexDir={'row'}
      py={verticalScale(10)}
      px={horizontalScale(20)}
      alignItems={'center'}
      mb={horizontalScale(1)}>
      {/* <SvgXml xml={sampleImage} /> */}
      <Image
        alt="image"
        source={{
          uri: product?.documents[0],
        }}
        width={48}
        height={48}
      />
      <View
        flexShrink={1}
        ml={horizontalScale(10)}
        style={{gap: verticalScale(2), marginRight: 'auto'}}>
        <Text
          fontFamily={'Inter_Regular'}
          fontSize={scaleFontSize(14)}
          color={'accent.800'}
          numberOfLines={2}
          lineHeight={16.98}
          letterSpacing={-0.03}>
          {capitalizeFirstLetter(product.name)}
        </Text>
        {/* <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(12)}
          color={'accent.400'}
          lineHeight={14.52}
          letterSpacing={-0.04}>
          200g
        </Text> */}
      </View>
      <View ml={horizontalScale(60)} alignItems={'center'}>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(16)}
          color={'primary.500'}
          mb={-verticalScale(1)}
          lineHeight={19.36}
          letterSpacing={-0.04}>
          ₹{product.discountedPrice}
        </Text>
        <Text
          fontFamily={'Inter_Regualar'}
          fontSize={scaleFontSize(12)}
          color={'accent.400'}
          strikeThrough
          lineHeight={14.52}
          letterSpacing={-0.04}>
          ₹{product.price}
        </Text>
      </View>
    </View>
  );
};
