import React, {useCallback, useState, useEffect} from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [count, setCount] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await getProducts(perPage, pageNo);
      setProducts(prevResults =>
        pageNo === 1 ? response.content : [...prevResults, ...response.content]
      );
      setCount(response.count);
      setPerPage(response.perPage);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setIsLoadingMore(false);
  };

  const loadMoreResults = () => {
    if (perPage < count) {
      setIsLoadingMore(true);
      setPageNo(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pageNo]);

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const handleScroll = (event) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isNearEnd = layoutMeasurement.width + contentOffset.x >= contentSize.width - 50;
    if (isNearEnd && !isLoadingMore) {
      loadMoreResults();
    }
  };

  return (
    <View style={{width: '100%'}}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingRight: horizontalScale(30)}}>
        {products.map(data => (
          <View key={data.id}>
            <ProductCard onPress={() => onPress(data.name)} products={data} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProductHorizontalScroll;
