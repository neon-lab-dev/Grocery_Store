/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Center, FlatList, Pressable, ScrollView, Text, View} from 'native-base';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import {SvgXml} from 'react-native-svg';
import {filter} from '../../assets/images/icons/filter';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import ProductCard from '../../components/productCard/ProductCard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FilterOverlay from '../../components/Search/SearchFilterOverlay';
import SearchInput from '../../components/SearchInput';
import ProductData from '../../assets/data/ProductData';
import GoBack from '../../components/Navigation/GoBack';

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
        width={100}
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

  useEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitleComponent,
      headerLeft: () => <GoBack onPress={() => navigation.goBack()} />,
      headerLeftContainerStyle: {marginRight: -horizontalScale(20)},
      headerRight: headerRightComponent,
    });
  }, [searchInp]);

  return (
    <ScrollView flex={1} nestedScrollEnabled bg={'accent.50'}>
      <View mt={4} px={horizontalScale(20)}>
        <View flexDir={'row'} justifyContent={'space-between'}>
          <Text
            fontFamily={'Inter'}
            fontWeight={500}
            fontSize={scaleFontSize(14)}
            color={'#1F2937'}>
            Recent Searches
          </Text>
          <Text
            fontFamily={'Inter'}
            fontWeight={500}
            fontSize={scaleFontSize(14)}
            color={'primary.500'}>
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
                fontFamily={'Inter'}
                fontSize={scaleFontSize(14)}
                fontWeight={selectedRecentSearch === item ? 600 : 500}
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
          <View flexDir={'row'}>
            <Text
              fontFamily={'Inter'}
              fontSize={scaleFontSize(18)}
              color={'accent.500'}
              numberOfLines={1}>
              Showing Results for
            </Text>
            <Text
              fontFamily={'Inter'}
              fontWeight={500}
              fontSize={scaleFontSize(18)}
              color={'accent.700'}>
              {searchInp ? ` ${searchInp}` : ' Product Name'}
            </Text>
          </View>
          <Text
            fontFamily={'Inter'}
            fontWeight={500}
            fontSize={scaleFontSize(14)}
            color={'accent.500'}>
            246 items
          </Text>
        </View>
        <FlatList
          flex={1}
          nestedScrollEnabled
          data={ProductData}
          renderItem={({item}) => (
            <ProductCard onPress={() => {}} products={item} />
          )}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{
            paddingBottom: verticalScale(30),
          }}
          columnWrapperStyle={{
            justifyContent: 'space-evenly',
            paddingHorizontal: horizontalScale(10),
          }}
        />
      </View>
      <FilterOverlay
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </ScrollView>
  );
};

export default Search;
