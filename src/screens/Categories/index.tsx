/* eslint-disable react/no-unstable-nested-components */
import React, {FC, useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {horizontalScale, verticalScale} from '../../assets/scaling';
import {Image} from 'native-base';
import {AuthAPIClient} from '../../api/axios.config';
import {CategoryCard} from '../../components/Categories/CategoryCard';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {setNetworkStatus} from '../../redux/slices/networkSlice.ts';
import {toast} from '../../components/Toast/Toast';

// import Loader from '../../components/Loader/Loader';

interface Category {
  id: number;
  name: string;
  subCategory: SubCategory[];
}

interface SubCategory {
  id: number;
  subCategory: string;
  image: any;
}

const Categories: FC = ({navigation}) => {
  const [categoryId, setCategoryId] = useState(0);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isConnected = useSelector(state => state.network.isConnected);

  const fetchCategory = async () => {
    setIsLoading(true);
    try {
      const response = await AuthAPIClient.get('/category/all');
      if (response.data && response.data.responseBody) {
        setCategories(response.data.responseBody);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setNetworkStatus(state.isConnected));
    });
    if (isConnected) {
      fetchCategory();
    } else {
      toast.showToast('Please Check Your Internet Connection');
    }

    return () => {
      unsubscribe();
    };
  }, [dispatch, isConnected]);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategoryName(categories[categoryId].name);
      setSubCategories(categories[categoryId].subCategoryDtoList);
    }
  }, [categories, categoryId]);

  const SubCategory: FC<SubCategory> = ({id, subCategory, image}) => {
    return (
      <TouchableOpacity
        style={styles.subCategoryCard}
        onPress={() =>
          navigation.navigate('CategoryProducts', {
            SubCategory: subCategory,
            categoryIndex: categoryId,
            subCategoryIndex: id,
          })
        }>
        <View style={styles.rightImage}>
          {image && (
            <Image
              alt="category"
              source={{uri: image}}
              borderRadius={16}
              width={horizontalScale(66)}
              height={verticalScale(73)}
            />
          )}
        </View>

        <Text style={styles.categoriesRight}>{subCategory}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.mainContainer}>
      {/* <Loader isOpen={isLoading} /> */}
      <View style={styles.leftCard}>
        <View>
          <FlatList
            contentContainerStyle={{
              marginTop: verticalScale(20),
              paddingBottom: verticalScale(27),
            }}
            showsVerticalScrollIndicator={false}
            data={categories}
            renderItem={({item, index}) => (
              <CategoryCard
                id={index}
                categoryName={item.name}
                setCategoryId={setCategoryId}
                categoryId={categoryId}
                imageUrl={item.documentUrl}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.rightCard}>
        <View style={{padding: 13, marginVertical: 8}}>
          <Text style={styles.categoriesTitle}>{selectedCategoryName}</Text>
        </View>
        <FlatList
          contentContainerStyle={{
            gap: 20,
            paddingBottom: 10,
            // backgroundColor: 'red',
          }}
          numColumns={3}
          data={subCategories}
          renderItem={({item, index}) => (
            <SubCategory
              id={index}
              subCategory={item.name}
              image={item.documentUrl}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Categories;
