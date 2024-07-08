import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'native-base';
import ProductCard from './ProductCard';
import {horizontalScale} from '../../assets/scaling';
import {AuthAPIClient} from '../../api/axios.config';

interface SimilarProductCardProps {
  onPress: (name: string) => void;
  subCategory: string;
}

const SimilarProductHorizontalScroll: React.FC<SimilarProductCardProps> = ({
  onPress,
  subCategory,
}) => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await AuthAPIClient.get(
        `/product/list?subCategory=${subCategory}`,
      );
      const slicedProducts = response.data.responseBody.content.slice(0, 10);
      setProducts(slicedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  //   useFocusEffect(
  //     useCallback(() => {
  //       fetchProducts();
  //     }, []),
  //   );

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
              <ProductCard onPress={() => onPress(data.code)} products={data} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default SimilarProductHorizontalScroll;
