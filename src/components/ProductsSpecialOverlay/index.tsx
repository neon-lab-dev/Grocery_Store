import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import SearchInput from '../SearchInput';
import {styles} from './style';
import {horizontalScale, verticalScale} from '../../assets/scaling';
import SearchProductCard from '../productCard/SearchResultProductCard';
import {SvgXml} from 'react-native-svg';
import {close} from '../../assets/images/icons/close';
import {searchProduct} from '../../api/auth_routes';

interface ProductsSpecialOverlayProps {
  Close: () => void;
  onPress: (name: string) => void;
}

const ProductsSpecialOverlay: React.FC<ProductsSpecialOverlayProps> = ({
  Close,
  onPress,
}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [text, setText] = useState<string>('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [count, setCount] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchProducts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      if (pageNo === 1) {
        setIsLoading(true);
      }
      const response = await searchProduct(
        undefined,
        text,
        undefined,
        undefined,
        undefined,
        undefined,
        pageNo,
        perPage,
      );
      setProducts(prevResults =>
        pageNo === 1 ? response.content : [...prevResults, ...response.content],
      );
      setCount(response.count);
      setPerPage(response.perPage);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [pageNo, perPage, text]);

  const loadMoreResults = () => {
    if (perPage === count) {
      setIsLoadingMore(true);
      setPageNo(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onSubmitSearch = () => {
    fetchProducts();
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.selectAddressBox}>
        <Text style={styles.freshlyPickedText}>Freshly Picked Items</Text>
        <Pressable onPress={() => Close()}>
          <SvgXml xml={close} height={24} width={24} />
        </Pressable>
      </View>
      <View style={{alignItems: 'center', marginVertical: verticalScale(2)}}>
        <SearchInput
          onChangeText={setText}
          value={text}
          placeholder='Search "Bread"'
          editable
          width={90}
          onPress={() => {}}
          onSubmit={onSubmitSearch}
        />
      </View>
      {isLoading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../../assets/images/icons/loading.gif')}
            style={{height: 250, width: 250}}
          />
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#F97316']}
            />
          }
          contentContainerStyle={{paddingBottom: verticalScale(30)}}
          columnWrapperStyle={{
            paddingHorizontal: horizontalScale(15),
            gap: horizontalScale(10),
            marginBottom: verticalScale(10),
          }}
          ItemSeparatorComponent={() => (
            <View style={{marginVertical: verticalScale(10)}} />
          )}
          numColumns={2}
          data={products}
          renderItem={({item}) => (
            <SearchProductCard
              products={item}
              key={item.id}
              onPress={() => onPress(item.code)}
            />
          )}
          onEndReached={loadMoreResults}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoadingMore && (
              <View
                style={{
                  marginVertical: verticalScale(10),
                  alignItems: 'center',
                }}>
                {/* <Image
                  alt="loading"
                  source={require('../../assets/images/icons/loading.gif')}
                  style={{height: 250, width: 250}}
                /> */}
                <ActivityIndicator size="large" color="#F97316" />
              </View>
            )
          }
        />
      )}
    </View>
  );
};

export default ProductsSpecialOverlay;
