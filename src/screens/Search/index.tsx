/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Center, ChevronLeftIcon, FlatList, Text, View} from 'native-base';
import {horizontalScale, scaleFontSize} from '../../assets/scaling';
import {SvgXml} from 'react-native-svg';
import {filter} from '../../assets/images/icons/filter';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import ProductCard from '../../components/productCard/ProductCard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FilterOverlay from './search_filter_overlay';

const headerTitleComponent = () => (
  <Center
    borderRadius={12}
    borderWidth={1}
    borderColor={'accent.200'}
    p={4}
    w={horizontalScale(200)}>
    <Text>Search</Text>
  </Center>
);

interface SearchProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Search'>;
}

const Search: React.FC<SearchProps> = ({navigation}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

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
  const products = [
    {
      id: '1',
      title: 'Desi Tomato(Nattu Thakkali)',
      price: 42,
      quantity: 1,
      image: require('../../assets/images/Vegetables/tomato.png'),
    },
    {
      id: '2',
      title: 'Ginger (Inji)',
      price: 42,
      quantity: 2,
      image: require('../../assets/images/Vegetables/ginger.png'),
    },
    {
      id: '3',
      title: 'Ginger (Inji)',
      price: 42,
      quantity: 2,
      image: require('../../assets/images/Vegetables/ginger.png'),
    },
    {
      id: '4',
      title: 'Ginger (Inji)',
      price: 42,
      quantity: 2,
      image: require('../../assets/images/Vegetables/ginger.png'),
    },
    {
      id: '5',
      title: 'Ginger (Inji)',
      price: 42,
      quantity: 2,
      image: require('../../assets/images/Vegetables/ginger.png'),
    },
    {
      id: '6',
      title: 'Ginger (Inji)',
      price: 42,
      quantity: 2,
      image: require('../../assets/images/Vegetables/ginger.png'),
    },
    {
      id: '7',
      title: 'Ginger (Inji)',
      price: 42,
      quantity: 2,
      image: require('../../assets/images/Vegetables/ginger.png'),
    },
    {
      id: '8',
      title: 'Ginger (Inji)',
      price: 42,
      quantity: 2,
      image: require('../../assets/images/Vegetables/ginger.png'),
    },
  ];

  const renderProductItem = ({item}: {item: any}) => {
    return (
      <ProductCard
        image={item.image}
        Title={item.title}
        Price={item.price}
        Quantity={item.quantity}
        onPress={() => {}}
      />
    );
  };

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
  }, [navigation]);

  return (
    <View>
      <View mt={4} px={horizontalScale(20)}>
        <View flexDir={'row'} justifyContent={'space-between'}>
          <Text fontSize={'fs14'}>Recent Searches</Text>
          <Text fontSize={'fs14'} color={'primary.500'}>
            Clear All
          </Text>
        </View>
      </View>
      <View bg={'white'} mt={5}>
        <View
          flexDir={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          p={4}>
          <View flexDir={'row'}>
            <Text fontSize={scaleFontSize(18)} color={'accent.500'}>
              Showing Results for{' '}
            </Text>
            <Text fontSize={scaleFontSize(18)} color={'accent.700'}>
              Product Name
            </Text>
          </View>
          <Text fontSize={scaleFontSize(14)} color={'accent.500'}>
            246 items
          </Text>
        </View>
        <View alignItems={'center'}>
          <FlatList
            data={products}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            numColumns={2}
          />
        </View>
      </View>
      <FilterOverlay
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </View>
  );
};

export default Search;
