import React, {useCallback, useState} from 'react';
import {View, ScrollView} from 'native-base';
import {horizontalScale} from '../../assets/scaling';
import ProductCard from './ProductCard';
import {getProducts} from '../../api/auth_routes';
import {useFocusEffect} from '@react-navigation/native';

interface ProductCardProps {
  onPress: (name: string) => void;
}

const ProductHorizontalScroll: React.FC<ProductCardProps> = ({onPress}) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const NumberOfProducts = 10;
      const response = await getProducts(NumberOfProducts);
      const slicedProducts = response.content.slice(0, 10);
      setProducts(slicedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, []),
  );

  return (
    <View style={{width: '100%'}}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingRight: horizontalScale(30)}}>
        {products.map(data => {
          return (
            <View key={data.id}>
              <ProductCard onPress={() => onPress(data.name)} products={data} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default ProductHorizontalScroll;
