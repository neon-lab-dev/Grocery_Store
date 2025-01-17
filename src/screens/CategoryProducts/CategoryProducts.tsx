import React, {FC, useEffect, useState} from 'react';
import {FlatList, RefreshControl, ScrollView} from 'react-native';
import {styles} from './style.ts';
import SmallProductCard from '../../components/productCard/SmallProductCard.tsx';
import {AuthAPIClient} from '../../api/axios.config.ts';
import {View, Text, Image} from 'native-base';
import GoBack from '../../components/Navigation/GoBack.tsx';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling.ts';
import {CategoryCard} from '../../components/Categories/CategoryCard.tsx';
import Loader from '../../components/Loader/Loader.tsx';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {setNetworkStatus} from '../../redux/slices/networkSlice.ts';
import {toast} from '../../components/Toast/Toast.ts';
import {hideCategories} from '../../constants/categories.ts';

interface Category {
  id: number;
  name: string;
  subCategory: SubCategory[];
}

interface SubCategory {
  id: number;
  name: string;
}

const CategoryProducts: FC = ({navigation, route}) => {
  const navigateToProductDetails = (name: string) => {
    navigation.navigate('ProductDetails', {productName: name});
  };
  const SubCategory = route.params.SubCategory;
  const categoryIndex = route.params.categoryIndex;
  const subCategoryIndex = route.params.subCategoryIndex;
  const categoryName = route.params.categoryName;
  const [subCategory2List, setSubCategory2List] = useState([]);
  const [subCategory2, setSubCategory2] = useState('');
  const [categoryId, setCategoryId] = useState<number>(0);
  const [CategoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [count, setCount] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const dispatch = useDispatch();
  const isConnected = useSelector(state => state.network.isConnected);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchCategory = async () => {
    try {
      setIsLoading(true);
      const response = await AuthAPIClient.get('/category/all');
      if (response.data && response.data.responseBody) {
        const fetchedSubCategory2List =
          response.data.responseBody[categoryIndex].subCategoryDtoList[
            subCategoryIndex
          ].subCategory2DtoList;

        const categoriesToHide = hideCategories;
        const filteredSubCategory2List = fetchedSubCategory2List.filter(
          category => {
            // Exclude categories that are in the categoriesToHide array
            return !categoriesToHide.includes(category.name);
          },
        );

        // Log the filtered categories
        // console.log('Filtered categories:', filteredSubCategory2List);

        setSubCategory2List(filteredSubCategory2List);
        if (filteredSubCategory2List.length > 0) {
          setSubCategory2(filteredSubCategory2List[0].name);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, []);

  const fetchCategoryProducts = async () => {
    if (!subCategory2) {
      return;
    }
    try {
      setIsLoading(true);
      let url = '/product/list';
      let queryParams = [];
      // queryParams.push(`subCategory=${SubCategory}`);
      queryParams.push(
        `category=${categoryName}&subCategory=${SubCategory}&subCategory2=${subCategory2}`,
      );
      queryParams.push(`pageNo=${pageNo}`);

      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }
      const response = await AuthAPIClient.get(url);
      if (response.data.responseBody && response.data.responseBody.content) {
        setCategoryData(prevResults =>
          pageNo === 1
            ? response.data.responseBody.content
            : [...prevResults, ...response.data.responseBody.content],
        );
        setCount(response.count);
        setPerPage(response.perPage);
      }
      setIsLoading(false);
      setIsLoadingMore(false);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMoreResults = () => {
    if (perPage < count) {
      setIsLoadingMore(true);
      setPageNo(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setNetworkStatus(state.isConnected));
      if (isConnected) {
        fetchCategory();
      } else {
        toast.showToast('Please Check Your Internet Connection');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    fetchCategoryProducts();
  }, [categoryId, subCategory2, pageNo, refreshing]);

  return (
    <>
      <View
        h={144}
        bgColor={'white'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        borderBottomWidth={1}
        borderBottomColor={'accent.100'}>
        <View
          flexDir={'row'}
          style={{gap: horizontalScale(12)}}
          alignItems={'center'}>
          <GoBack onPress={() => navigation.goBack()} />
          <View style={{gap: verticalScale(4)}}>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(16)}
              lineHeight={19.36}
              letterSpacing={-0.04}
              color={'accent.800'}>
              {SubCategory}
            </Text>
            <Text
              fontFamily={'Inter_Regular'}
              fontSize={scaleFontSize(14)}
              lineHeight={16.8}
              letterSpacing={-0.03}
              color={'accent.500'}>
              {CategoryData.length} Items
            </Text>
          </View>
        </View>
        {/* <Pressable mr={horizontalScale(20)}>
          <SvgXml xml={searchIcon} height={24} width={24} />
        </Pressable> */}
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.leftCard}>
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={subCategory2List}
              renderItem={({item, index}) => (
                <CategoryCard
                  id={index}
                  categoryName={item.name}
                  setCategoryId={setCategoryId}
                  categoryId={categoryId}
                  imageUrl={item?.documentUrl}
                  setSubCategory2={setSubCategory2}
                />
              )}
            />
          </View>
        </View>
        <View style={styles.rightCard}>
          {isLoading ? (
            <View
              flex={1}
              bgColor={'accent.300'}
              justifyContent={'center'}
              alignItems={'center'}>
              <Image
                alt="loading"
                source={require('../../assets/images/icons/loading.gif')}
                h={200}
                w={200}
              />
            </View>
          ) : CategoryData.length === 0 ? (
            <View flex={1} alignItems={'center'} justifyContent={'center'}>
              <Text
                fontFamily={'Inter_Medium'}
                fontSize={scaleFontSize(14)}
                lineHeight={16.8}
                letterSpacing={-0.03}
                color={'accent.900'}>
                No Products Found
              </Text>
            </View>
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['orange']}
                />
              }
              numColumns={2}
              data={CategoryData}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                <SmallProductCard
                  key={index}
                  onPress={name => navigateToProductDetails(name)}
                  products={item}
                />
              )}
              onEndReached={loadMoreResults}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                isLoadingMore && (
                  <View p={verticalScale(10)}>
                    <Image
                      alt="loading"
                      source={require('../../assets/images/icons/loading.gif')}
                      h={250}
                      w={250}
                    />
                  </View>
                )
              }
            />
          )}
        </View>
      </View>
    </>
  );
};

export default CategoryProducts;
