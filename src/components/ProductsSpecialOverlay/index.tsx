import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
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
  const [text, setText] = useState<string>('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [count, setCount] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await searchProduct(
        text,
        undefined,
        undefined,
        undefined,
        undefined,
        pageNo,
      );
      setProducts(prevResults =>
        pageNo === 1 ? response.content : [...prevResults, ...response.content],
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
  }, [text, pageNo]);

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
              onPress={() => onPress(item.name)}
            />
          )}
          onEndReached={loadMoreResults}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoadingMore && (
              <View style={{padding: verticalScale(10)}}>
                <Image
                  alt="loading"
                  source={require('../../assets/images/icons/loading.gif')}
                  style={{height: 250, width: 250}}
                />
              </View>
            )
          }
        />
      )}
    </View>
  );
};

export default ProductsSpecialOverlay;
