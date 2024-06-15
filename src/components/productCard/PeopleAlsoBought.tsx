import React, {useCallback, useState} from 'react';
import {View, ScrollView} from 'native-base';
import {horizontalScale} from '../../assets/scaling';
import ProductCard from './ProductCard';
import {fetchAllCategory, getProducts} from '../../api/auth_routes';
import {useFocusEffect} from '@react-navigation/native';

interface ProductCardProps {
  onPress: (name: string) => void;
  subCategory;
}

const PeopleAlsoBought: React.FC<ProductCardProps> = ({
  onPress,
  subCategory,
}) => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const NumberOfProducts = 100;
      const response = await getProducts(NumberOfProducts);
      const subCategory2 = response.content.filter(
        item => item.subCategory2 === subCategory,
      );

      const slicedProducts = subCategory2.slice(0, 10);
      setProducts(slicedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, []),
  );

  return (
    <View style={{width: '100%'}}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingRight: horizontalScale(30)}}>
        {products.map(data => {
          return (
            <View key={data.id}>
              <ProductCard onPress={() => onPress(data.name)} products={data} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
const getImage = (imageName: string) => {
  switch (imageName) {
    case 'item1':
      return require('../../assets/images/Product-Image/Tomato.png');
    case 'item2':
      return require('../../assets/images/Product-Image/Ginger.png');
    default:
      return null;
  }
};
export default PeopleAlsoBought;
