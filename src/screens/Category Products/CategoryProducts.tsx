import React, {FC, useEffect, useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {styles} from './style';
import SmallProductCard from '../../components/productCard/SmallProductCard';
import {AuthAPIClient} from '../../api/axios.config';
import {View, Text, Image} from 'native-base';
import GoBack from '../../components/Navigation/GoBack';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';

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
  setSubCategory2: (name: string) => void;
  id: number;
  categoryId: number;
  imageUrl: any;
}

const CategoryCard: FC<CategoryCardProps> = ({
  categoryName,
  setCategoryId,
  setSubCategory2,
  id,
  categoryId,
  imageUrl,
}) => {
  return (
    <TouchableOpacity
      style={styles.mainCategoryCard}
      onPress={() => {
        setCategoryId(id);
        setSubCategory2(categoryName);
      }}>
      <View style={styles.categoryCard}>
        <View style={styles.leftImage}>
          {imageUrl && (
            <Image
              alt="subcategory2 image"
              source={{uri: imageUrl}}
              h={50}
              w={50}
            />
          )}
        </View>
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
  const categoryIndex = route.params.categoryIndex;
  const subCategoryIndex = route.params.subCategoryIndex;
  const [subCategory2List, setSubCategory2List] = useState([]);
  const [subCategory2, setSubCategory2] = useState('');
  const [categoryId, setCategoryId] = useState<number>(0);
  const [CategoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const extractSubCategory2 = categories => {
    return categories.flatMap(category =>
      category.subCategoryDtoList.flatMap(subCategory =>
        subCategory.subCategory2DtoList.map(subCategory2 => ({
          ...subCategory2,
          parentCategory: category.name,
          parentSubCategory: subCategory.name,
        })),
      ),
    );
  };

  const fetchCategory = async () => {
    try {
      setIsLoading(true);
      const response = await AuthAPIClient.get('/category/all');
      if (response.data && response.data.responseBody) {
        // const fetchedSubCategory2List =
        //   response.data.responseBody[categoryIndex].subCategoryDtoList[
        //     subCategoryIndex
        //   ].subCategory2DtoList;
        // setSubCategory2List(fetchedSubCategory2List);
        // if (fetchedSubCategory2List.length > 0) {
        //   setSubCategory2(fetchedSubCategory2List[0].name);
        // }
        const fetchedSubCategory2List = extractSubCategory2(
          response.data.responseBody,
        );
        setSubCategory2List(fetchedSubCategory2List);
        if (fetchedSubCategory2List.length > 0) {
          setSubCategory2(fetchedSubCategory2List[0].name);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const fetchCategoryProducts = async () => {
    if (!subCategory2) {
      return;
    }
    try {
      setIsLoading(true);
      let url = '/product/list';
      let queryParams = [];
      // queryParams.push(`subCategory=${SubCategory}`);
      queryParams.push(`subCategory2=${subCategory2}`);

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
    fetchCategory();
  }, []);
  useEffect(() => {
    fetchCategoryProducts();
  }, [categoryId, subCategory2]);

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
