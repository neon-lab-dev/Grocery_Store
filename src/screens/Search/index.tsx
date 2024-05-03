/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {Center, FlatList, Pressable, Text, View} from 'native-base';
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
import {Dimensions} from 'react-native';
import SearchProductCard from '../../components/productCard/SearchResultProductCard';
import {HelperText} from 'react-native-paper';
import BottomSheet from '../../components/BottomSheet/BottomSheet';

interface SearchProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Search'>;
}

const Search: React.FC<SearchProps> = ({navigation}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchInp, SetsearchInp] = useState('');
  const [selectedRecentSearch, setSelectedRecentSearch] = useState('');
  const recentSearch = ['Cat Food', 'Ice Cream', 'Cake'];
  const {width} = Dimensions.get('window');
  const fontSize = width >= 400 ? scaleFontSize(18) : scaleFontSize(16);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };
  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const listToDetails = () => {
    openBottomSheet();
  };

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
          <Pressable onPress={() => setSelectedRecentSearch('')}>
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
        <View flexDir={'row'} mt={verticalScale(5)}>
          {recentSearch.map((item, index) => (
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
                selectedRecentSearch === item
                  ? setSelectedRecentSearch('')
                  : setSelectedRecentSearch(item);
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
              Showing Results for
            </Text>
            <Text
              fontFamily={'Inter_Medium'}
              fontSize={fontSize}
              color={'accent.700'}
              lineHeight={21.78}
              letterSpacing={-0.04}
              textAlign={'center'}>
              {searchInp ? ` ${searchInp}` : ' Product Name'}
            </Text>
          </View>
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={width >= 400 ? scaleFontSize(14) : scaleFontSize(13)}
            color={'accent.500'}
            lineHeight={16.94}
            letterSpacing={-0.04}
            textAlign={'center'}>
            246 items
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
            placeholder="Search “Bread” "
            onPress={() => {}}
            editable={true}
            width={100}
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
      <View flex={1} bg={'white'}>
        <FlatList
          flex={1}
          ListHeaderComponent={ListHeaderComponent}
          data={ProductData}
          renderItem={({item}) => (
            <SearchProductCard onPress={listToDetails} products={item} />
          )}
          keyExtractor={item => item.id.toString()}
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
      <FilterOverlay
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
      <BottomSheet
        visible={bottomSheetVisible}
        onClose={closeBottomSheet}
        type={'Product-Details'}
        onPress={listToDetails}
      />
    </View>
  );
};

export default Search;
