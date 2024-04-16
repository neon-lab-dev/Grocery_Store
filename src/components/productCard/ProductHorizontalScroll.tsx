import React from 'react';
import {View, Text, Image, Pressable, ScrollView} from 'native-base';
import ProductData from '../../assets/data/ProductData';
import {horizontalScale, verticalScale} from '../../assets/scaling';
import {calculateDiscountPercentage} from '../../utils/calculatePercentage';
import ProductCard from './ProductCard';

interface ProductCardProps {
  onPress: () => void;
}

const ProductHorizontalScroll: React.FC<ProductCardProps> = ({onPress}) => {
  return (
    <View style={{width: '100%'}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {ProductData.map(data => {
          let off = calculateDiscountPercentage(data.DisPrice, data.Price);
          return (
            <View key={data.id}>
              <ProductCard onPress={onPress} products={data} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
const getImage = (imageName: string) => {
  switch (imageName) {
    case 'item1':
      return require('../../assets/images/Product-Image/Tomato.png');
    case 'item2':
      return require('../../assets/images/Product-Image/Ginger.png');
    default:
      return null;
  }
};
export default ProductHorizontalScroll;
