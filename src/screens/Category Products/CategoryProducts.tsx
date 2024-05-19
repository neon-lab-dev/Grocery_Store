import React, {FC, useEffect, useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {styles} from './style';
import ProductData from '../../assets/data/ProductData';
import SmallProductCard from '../../components/productCard/SmallProductCard';
import {Categories, SubCategories} from '../../constants/categories';
import {AuthAPIClient} from '../../api/axios.config';
import {View, Text, Pressable, Image} from 'native-base';
import GoBack from '../../components/Navigation/GoBack';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import {SvgXml} from 'react-native-svg';
import {searchIcon} from '../../assets/images/icons/searchIcon';

interface Category {
  id: number;
  name: string;
  subCategory: SubCategory[];
}

interface SubCategory {
  id: number;
  name: string;
}

interface CategoryCardProps {
  categoryName: string;
  setCategoryId: (id: number) => void;
  id: number;
  categoryId: number;
}

const CategoryCard: FC<CategoryCardProps> = ({
  categoryName,
  setCategoryId,
  id,
  categoryId,
}) => {
  return (
    <TouchableOpacity
      style={styles.mainCategoryCard}
      onPress={() => setCategoryId(id)}>
      <View style={styles.categoryCard}>
        <View style={styles.leftImage}></View>
        <Text style={styles.categoriesLeft}>{categoryName}</Text>
      </View>
      {categoryId === id && <View style={styles.selectedItem} />}
    </TouchableOpacity>
  );
};

const CategoryProducts: FC = ({navigation, route}) => {
  const navigateToProductDetails = (name: string) => {
    navigation.navigate('ProductDetails', {productName: name});
  };
  const SubCategory = route.params.SubCategory;
  const [categoryId, setCategoryId] = useState<number>(0);
  const [CategoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchCategoryProducts = async () => {
    try {
      setIsLoading(true);
      let url = '/product/list';
      let queryParams = [];
      if (SubCategory) {
        queryParams.push(`subCategory=${SubCategory}`);
      }
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }
      const response = await AuthAPIClient.get(url);
      if (response.data.responseBody && response.data.responseBody.content) {
        setCategoryData(response.data.responseBody.content);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [categoryId]);

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
              data={SubCategories[SubCategory]}
              renderItem={({item, index}) => (
                <CategoryCard
                  id={index}
                  categoryName={item}
                  setCategoryId={setCategoryId}
                  categoryId={categoryId}
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
            />
          )}
        </View>
      </View>
    </>
  );
};

export default CategoryProducts;
