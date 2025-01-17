/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState, useRef} from 'react';
import {
  Center,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'native-base';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import {SvgXml} from 'react-native-svg';
import {filter} from '../../assets/images/icons/filter';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FilterOverlay from '../../components/Search/SearchFilterOverlay';
import SearchInput from '../../components/SearchInput';
import GoBack from '../../components/Navigation/GoBack';
import {ActivityIndicator, Dimensions} from 'react-native';
import SearchProductCard from '../../components/productCard/SearchResultProductCard';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import {getItem, setItem} from '../../api/localstorage';
import {searchProduct} from '../../api/auth_routes';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {setNetworkStatus} from '../../redux/slices/networkSlice.ts';
import {toast} from '../../components/Toast/Toast';

interface SearchProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Search'>;
}

const Search: React.FC<SearchProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const isConnected = useSelector(state => state.network.isConnected);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchInp, SetsearchInp] = useState('');
  const [selectedRecentSearch, setSelectedRecentSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorFetching, setErrorFetching] = useState(false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [recentSearch, setRecentSearch] = useState<string[]>([]);
  const {width} = Dimensions.get('window');
  const fontSize = width >= 400 ? scaleFontSize(18) : scaleFontSize(16);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [count, setCount] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setNetworkStatus(state.isConnected));
      if (!isConnected) {
        toast.showToast('Please Check Your Internet Connection');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const filterOverlayRef = useRef(null);

  useEffect(() => {
    const fetchRecentSearch = async () => {
      const recentSearchData = await getItem('recentSearch');
      if (recentSearchData) {
        setRecentSearch(JSON.parse(recentSearchData));
      }
    };
    fetchRecentSearch();
  }, []);

  useEffect(() => {
    const storeRecentSearch = async () => {
      await setItem('recentSearch', recentSearch);
    };
    storeRecentSearch();
  }, [recentSearch]);

  const addRecentSearch = (searchTerm: string) => {
    searchProducts();
    if (searchTerm !== '') {
      setRecentSearch(prevSearches => {
        const updatedSearches = prevSearches.filter(
          term => term !== searchTerm,
        );
        updatedSearches.unshift(searchTerm);

        if (updatedSearches.length > 4) {
          updatedSearches.pop();
        }

        return updatedSearches;
      });
    }
  };

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };
  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const listToDetails = (name: string) => {
    setSelectedProduct(name);
    openBottomSheet();
  };

  const searchProducts = async () => {
    if (searchInp !== '') {
      setPageNo(1);
    }
    if (pageNo === 1) {
      setIsLoading(true);
    }
    try {
      setIsLoadingMore(true);
      const response = await searchProduct(
        undefined,
        searchInp,
        undefined,
        undefined,
        undefined,
        selectedBrand,
        searchInp === '' ? pageNo : 1,
        searchInp === '' ? perPage : undefined,
      );
      if (response && response.content) {
        setSearchResults(prevResults =>
          pageNo === 1
            ? response.content
            : [...prevResults, ...response.content],
        );
        setCount(response.count);
        setPerPage(response.perPage);
      } else {
        setErrorFetching(true);
      }
      setIsLoading(false);
      setIsLoadingMore(false);
    } catch (error) {
      setErrorFetching(true);
      setIsLoadingMore(false);
    }
  };

  const loadMoreResults = () => {
    if (perPage <= count) {
      setPageNo(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    searchProducts();
  }, [selectedBrand, pageNo]);

  const ListHeaderComponent = () => (
    <View flex={1} bg={'accent.50'}>
      <View mt={verticalScale(20)} px={horizontalScale(15)}>
        <View flexDir={'row'} justifyContent={'space-between'}>
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={scaleFontSize(14)}
            color={'#1F2937'}
            lineHeight={16.94}
            letterSpacing={-0.04}>
            Recent Searches
          </Text>
          <Pressable
            onPress={() => {
              if (filterOverlayRef.current) {
                filterOverlayRef.current.resetFilters();
              }
              SetsearchInp('');
              setSelectedRecentSearch('');
              setRecentSearch([]);
              setSortBy('default');
              setMinValue(0);
              setMaxValue(1000);
              setSelectedBrand('');
            }}>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(14)}
              color={'#6D28D9'}
              lineHeight={16.94}
              letterSpacing={-0.04}>
              Clear All
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: verticalScale(5),
          }}>
          {recentSearch.length !== 0 &&
            recentSearch.map((item, index) => (
              <Pressable
                key={index}
                borderRadius={100}
                borderWidth={1}
                marginRight={horizontalScale(10)}
                marginBottom={verticalScale(10)}
                paddingVertical={verticalScale(10)}
                paddingHorizontal={horizontalScale(15)}
                borderColor={
                  selectedRecentSearch === item ? 'accent.400' : 'accent.200'
                }
                backgroundColor={
                  selectedRecentSearch === item ? 'accent.200' : 'accent.100'
                }
                alignItems={'center'}
                onPress={() => {
                  if (selectedRecentSearch === item) {
                    setSelectedRecentSearch('');
                    SetsearchInp('');
                  } else {
                    setSelectedRecentSearch(item);
                    SetsearchInp(item);
                  }
                }}>
                <Text
                  fontFamily={'Inter_Medium'}
                  fontSize={scaleFontSize(14)}
                  adjustsFontSizeToFit
                  fontWeight={selectedRecentSearch === item ? 600 : 500}
                  color={
                    selectedRecentSearch === item ? 'accent.700' : 'accent.400'
                  }
                  lineHeight={16.94}
                  letterSpacing={-0.04}>
                  {item}
                </Text>
              </Pressable>
            ))}
        </View>
      </View>
      <View flex={1} bg={'white'} mt={verticalScale(15)}>
        <View
          flexDir={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          p={4}>
          <View flexDir={'row'} alignItems={'center'}>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={fontSize}
              color={'accent.500'}
              lineHeight={21.78}
              letterSpacing={-0.04}
              textAlign={'center'}>
              Showing Results
            </Text>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={fontSize}
              color={'accent.700'}
              lineHeight={21.78}
              letterSpacing={-0.04}
              textAlign={'center'}>
              {searchInp && ` for ${searchInp}`}
            </Text>
          </View>
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={width >= 400 ? scaleFontSize(14) : scaleFontSize(13)}
            color={'accent.500'}
            lineHeight={16.94}
            letterSpacing={-0.04}
            textAlign={'center'}>
            {searchResults.length} Items
          </Text>
        </View>
      </View>
    </View>
  );
  return (
    <View flex={1}>
      <View
        h={100}
        bgColor={'white'}
        borderBottomWidth={1}
        borderColor={'accent.100'}
        flexDir={'row'}
        alignItems={'center'}>
        <GoBack onPress={() => navigation.goBack()} />
        <View flex={1} mb={-35} mr={5}>
          <SearchInput
            onChangeText={SetsearchInp}
            value={searchInp}
            placeholder='Search "Bread"'
            onPress={() => {}}
            editable={true}
            width={100}
            onSubmit={addRecentSearch}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setShowModal(true);
          }}>
          <Center
            borderRadius={12}
            borderWidth={1}
            borderColor={'accent.200'}
            mr={horizontalScale(10)}
            ml={horizontalScale(5)}
            p={4}>
            <SvgXml xml={filter} height={18} width={20} />
          </Center>
        </TouchableOpacity>
      </View>
      {errorFetching ? (
        <View flex={1} alignItems={'center'} justifyContent={'center'}>
          <Text fontFamily={'Inter_Medium'} fontSize={scaleFontSize(18)}>
            Error Fetching Products
          </Text>
        </View>
      ) : isLoading ? (
        <View
          bg={'accent.300'}
          flex={1}
          alignItems={'center'}
          justifyContent={'center'}>
          <Image
            alt="loading"
            source={require('../../assets/images/icons/loading.gif')}
            h={250}
            w={250}
          />
        </View>
      ) : (
        <View flex={1} bg={'white'}>
          <FlatList
            flex={1}
            ListHeaderComponent={ListHeaderComponent}
            data={searchResults}
            renderItem={({item, index}) => (
              <SearchProductCard
                key={index}
                onPress={() => listToDetails(item.code)}
                products={item}
              />
            )}
            numColumns={2}
            contentContainerStyle={{
              paddingBottom: verticalScale(15),
            }}
            columnWrapperStyle={{
              paddingHorizontal: horizontalScale(15),
              marginBottom: verticalScale(15),
              gap: horizontalScale(15),
            }}
            onEndReached={searchInp === '' && loadMoreResults}
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
        </View>
      )}

      <FilterOverlay
        ref={filterOverlayRef}
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onSortByChange={option => setSortBy(option)}
        onMinValueChange={value => setMinValue(value)}
        onMaxValueChange={value => setMaxValue(value)}
        onBrandValueChange={option => setSelectedBrand(option)}
      />
      <BottomSheet
        visible={bottomSheetVisible}
        onClose={closeBottomSheet}
        type={'Product-Details'}
        productName={selectedProduct}
      />
    </View>
  );
};

export default Search;
