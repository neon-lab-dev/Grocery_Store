import React, {useEffect, useState} from 'react';
import {View, Text, Image, Pressable, ScrollView} from 'native-base';
import ProductData from '../../assets/data/ProductData';
import {horizontalScale, verticalScale} from '../../assets/scaling';
import {calculateDiscountPercentage} from '../../utils/calculatePercentage';
import ProductCard from './ProductCard';
import {getProducts} from '../../api/auth_routes';

interface ProductCardProps {
  onPress: () => void;
}

const ProductHorizontalScroll: React.FC<ProductCardProps> = ({onPress}) => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      const slicedProducts = response.content.slice(0, 4);
      setProducts(slicedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={{width: '100%'}}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingRight: horizontalScale(30)}}>
        {products.map(data => {
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
