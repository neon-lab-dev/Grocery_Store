import React, {FC, useState} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import SearchInput from '../SearchInput';
import ProductCard from '../productCard/ProductCard';
import {styles} from './style';

interface Product {
  id: number;
  Title: string;
  image: number;
  Quantity: number;
  Price: number;
}

const ProductsSpecialOverlay: FC = () => {
  const [text, setText] = useState<string>('');
  const onPress = () => {
    console.log('---Pressed---');
  };
  const data: Product[] = [
    {
      id: 1,
      Title: 'Tomato',
      image: require('../../assets/images/Vegetables/tomato.png'),
      Quantity: 2,
      Price: 30,
    },
    {
      id: 2,
      Title: 'Ginger',
      image: require('../../assets/images/Vegetables/ginger.png'),
      Quantity: 2,
      Price: 30,
    },
    {
      id: 3,
      Title: 'Tomato',
      image: require('../../assets/images/Vegetables/tomato.png'),
      Quantity: 2,
      Price: 30,
    },
    {
      id: 4,
      Title: 'Ginger',
      image: require('../../assets/images/Vegetables/ginger.png'),
      Quantity: 2,
      Price: 30,
    },
    {
      id: 5,
      Title: 'Tomato',
      image: require('../../assets/images/Vegetables/tomato.png'),
      Quantity: 2,
      Price: 30,
    },
    {
      id: 6,
      Title: 'Tomato',
      image: require('../../assets/images/Vegetables/tomato.png'),
      Quantity: 2,
      Price: 30,
    },
    {
      id: 8,
      Title: 'Tomato',
      image: require('../../assets/images/Vegetables/tomato.png'),
      Quantity: 2,
      Price: 30,
    },
    {
      id: 9,
      Title: 'Ginger',
      image: require('../../assets/images/Vegetables/ginger.png'),
      Quantity: 2,
      Price: 30,
    },
    {
      id: 10,
      Title: 'Tomato',
      image: require('../../assets/images/Vegetables/tomato.png'),
      Quantity: 2,
      Price: 30,
    },
    {
      id: 11,
      Title: 'Tomato',
      image: require('../../assets/images/Vegetables/tomato.png'),
      Quantity: 2,
      Price: 30,
    },
  ];
  return (
    <View>
      <View style={styles.selectAddressBox}>
        <Text style={styles.selectAddressText}>Fresly Picked Items</Text>
        <Image
          source={require('../../assets/images/icons/close.png')}
          style={{marginRight: 20}}
        />
      </View>
      <View style={{alignItems: 'center', marginVertical: 10}}>
        <SearchInput
          onChangeText={setText}
          value={text}
          placeholder="Search Beard"
        />
      </View>
      <FlatList
        contentContainerStyle={{paddingBottom: 160}}
        columnWrapperStyle={{
          justifyContent: 'space-around',
        }}
        numColumns={2}
        data={data}
        renderItem={({item}) => (
          <ProductCard
            image={item.image}
            Title={item.Title}
            Price={item.Price}
            Quantity={item.Quantity}
            onPress={onPress}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default ProductsSpecialOverlay;
