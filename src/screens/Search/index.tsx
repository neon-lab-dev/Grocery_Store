/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
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
import {Dimensions} from 'react-native';
import SearchProductCard from '../../components/productCard/SearchResultProductCard';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import {getItem, setItem} from '../../api/localstorage';
import {searchProduct} from '../../api/auth_routes';
interface SearchProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Search'>;
}

const Search: React.FC<SearchProps> = ({navigation}) => {
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
    const addRecentSearch = async () => {
      await setItem('recentSearch', recentSearch);
    };
    addRecentSearch();
  }, [recentSearch]);

  const addRecentSearch = (searchTerm: string) => {
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
    try {
      setIsLoading(true);
      const response = await searchProduct(
        searchInp,
        sortBy,
        minValue,
        maxValue,
        selectedBrand,
      );
      if (response && response.content) {
        setSearchResults(response.content);
      } else {
        setErrorFetching(true);
      }
      setIsLoading(false);
    } catch (error) {
      setErrorFetching(true);
    }
  };

  useEffect(() => {
    searchProducts();
  }, [searchInp, sortBy, minValue, maxValue, selectedBrand]);

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
              SetsearchInp('');
              setSelectedRecentSearch('');
              setRecentSearch([]);
            }}>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={scaleFontSize(14)}
              color={'primary.500'}
              lineHeight={16.94}
              letterSpacing={-0.04}>
              Clear All
            </Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          flexDir={'row'}
          mt={verticalScale(5)}>
          {recentSearch.length !== 0 &&
            recentSearch.map((item, index) => (
              <Pressable
                key={index}
                borderRadius={100}
                borderWidth={1}
                mr={horizontalScale(10)}
                py={verticalScale(10)}
                px={horizontalScale(15)}
                borderColor={
                  selectedRecentSearch === item ? 'accent.400' : 'accent.200'
                }
                bgColor={
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
        </ScrollView>
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
          <View
            alignItems={'center'}
            justifyContent={'center'}
            bg={'#404040'}
            borderRadius={20}
            borderWidth={1}
            borderColor={'white'}
            w={200}>
            <Image
              alt="Loader"
              source={require('../../assets/images/icons/loading.gif')}
              height={150}
              width={150}
            />
          </View>
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
                onPress={() => listToDetails(item.name)}
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
          />
        </View>
      )}

      <FilterOverlay
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
