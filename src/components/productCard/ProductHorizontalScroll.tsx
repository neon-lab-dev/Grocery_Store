import React, {useCallback, useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import {View, FlatList} from 'native-base';
import {horizontalScale} from '../../assets/scaling';
import ProductCard from './ProductCard';
import {getProducts} from '../../api/auth_routes';
import {useFocusEffect} from '@react-navigation/native';
import {SkeletonProductCard}  from '../../components/Skeleton/SkeletonProducts'

interface ProductCardProps {
  onPress: (name: string) => void;
}

const ProductHorizontalScroll = forwardRef<ProductCardProps, any>(({onPress}, ref) => {
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

  useImperativeHandle(ref, () => ({
    childFunction() {
      fetchProducts();
    },
  }));

  const handleEndReached = () => {
    if (!isLoadingMore) {
      loadMoreResults();
    }
  };

  const renderItem = useCallback(
    ({item}) => (
      <View key={item.id}>
        <ProductCard onPress={() => onPress(item.name)} products={item} isLoading={isLoading} />
      </View>
    ),
    [onPress, isLoading]
  );

  return (
    <View style={{width: '100%'}}>
      {isLoading ? (
        <View flex={1} alignItems={'center'} justifyContent={'center'}>
          <SkeletonProductCard/>
        </View>
      ) : (
        <FlatList
          removeClippedSubviews
          horizontal
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          onEndReached={handleEndReached}
          onEndReachedThreshold={1}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingRight: horizontalScale(30)}}
          ref={ref}
        />
      )}
    </View>
  );
});

export default ProductHorizontalScroll;
