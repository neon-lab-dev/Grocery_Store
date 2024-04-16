/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Center,
  ChevronLeftIcon,
  FlatList,
  Pressable,
  Text,
  View,
} from 'native-base';
import {horizontalScale, scaleFontSize} from '../../assets/scaling';
import {SvgXml} from 'react-native-svg';
import {filter} from '../../assets/images/icons/filter';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import ProductCard from '../../components/productCard/ProductCard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FilterOverlay from './search_filter_overlay';
import SearchInput from '../../components/SearchInput';
import ProductData from '../../assets/data/ProductData';

interface SearchProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Search'>;
}

const Search: React.FC<SearchProps> = ({navigation}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchInp, SetsearchInp] = useState('');
  const [selectedRecentSearch, setSelectedRecentSearch] = useState('');
  const recentSearch = ['Cat Food', 'Ice Cream', 'Cake'];
  const headerTitleComponent = () => (
    <View flex={1} justifyContent={'center'} mb={-35}>
      <SearchInput
        onChangeText={SetsearchInp}
        value={searchInp}
        placeholder="Search “Bread” "
        onPress={() => {}}
        editable={true}
      />
    </View>
  );

  const headerRightComponent = () => (
    <TouchableOpacity
      onPress={() => {
        setShowModal(true);
      }}>
      <Center
        borderRadius={12}
        borderWidth={1}
        borderColor={'accent.200'}
        mx={4}
        p={4}>
        <SvgXml xml={filter} height={18} width={20} />
      </Center>
    </TouchableOpacity>
  );

  const goBack = () => (
    <ChevronLeftIcon
      size={'md'}
      ml={5}
      color={'black'}
      onPress={() => navigation.goBack()}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitleComponent,
      headerLeft: goBack,
      headerRight: headerRightComponent,
    });
  }, [searchInp]);

  return (
    <View flex={1}>
      <View mt={4} px={horizontalScale(20)}>
        <View flexDir={'row'} justifyContent={'space-between'}>
          <Text fontSize={'fs14'}>Recent Searches</Text>
          <Text fontSize={'fs14'} color={'primary.500'}>
            Clear All
          </Text>
        </View>
        <View flexDir={'row'} mt={1}>
          {recentSearch.map((item, index) => (
            <Pressable
              key={index}
              borderRadius={100}
              borderWidth={1}
              mr={3}
              py={2}
              px={4}
              borderColor={
                selectedRecentSearch === item ? 'accent.400' : 'accent.200'
              }
              bgColor={
                selectedRecentSearch === item ? 'accent.200' : 'accent.100'
              }
              alignItems={'center'}
              onPress={() => {
                selectedRecentSearch === item
                  ? setSelectedRecentSearch('')
                  : setSelectedRecentSearch(item);
              }}>
              <Text
                color={
                  selectedRecentSearch === item ? 'accent.700' : 'accent.400'
                }>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View flex={1} bg={'white'} mt={5}>
        <View
          flexDir={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          p={4}>
          <View flexDir={'row'} flexShrink={1} w={horizontalScale(130)}>
            <Text
              fontSize={scaleFontSize(18)}
              color={'accent.500'}
              numberOfLines={1}>
              Showing Results for
            </Text>
            <Text
              fontSize={scaleFontSize(18)}
              color={'accent.700'}
              numberOfLines={1}>
              {searchInp ? ` ${searchInp}` : ' Products Name'}
            </Text>
          </View>
          <Text fontSize={scaleFontSize(14)} color={'accent.500'}>
            246 items
          </Text>
        </View>
        <FlatList
          flex={1}
          data={ProductData}
          renderItem={({item}) => (
            <ProductCard onPress={() => {}} products={item} />
          )}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
      </View>
      <FilterOverlay
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </View>
  );
};

export default Search;
