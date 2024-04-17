import React, {FC, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import ProductData from '../../assets/data/ProductData';
import SmallProductCard from '../../components/productCard/SmallProductCard';

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

const CategoryProducts: FC = ({navigation}) => {
  const navigateToProductDetails = () => {
    navigation.navigate('ProductDetails');
  };
  const Data: Category[] = [
    {
      id: 1,
      name: 'Chicken, Meat & Fish',
      subCategory: [
        {
          id: 1,
          name: 'Smart Watches',
        },
        {
          id: 2,
          name: 'Earphones & Headsets',
        },
        {
          id: 3,
          name: 'Speakers',
        },
        {
          id: 4,
          name: 'Mobile & Computer',
        },
        {
          id: 5,
          name: 'Decorative Lights',
        },
        {
          id: 6,
          name: 'Chargers & Cables',
        },
        {
          id: 7,
          name: 'Kitchen Appliances',
        },
        {
          id: 8,
          name: 'Batteries',
        },
      ],
    },
    {
      id: 2,
      name: 'Chicken, Meat & Fish',
      subCategory: [
        {
          id: 1,
          name: 'Smart Watches',
        },
        {
          id: 2,
          name: 'Smart Watches',
        },
        {
          id: 3,
          name: 'Smart Watches',
        },
        {
          id: 4,
          name: 'Smart Watches',
        },
        {
          id: 5,
          name: 'Smart Watches',
        },
      ],
    },
    {
      id: 3,
      name: 'Chicken, Meat & Fish',
      subCategory: [
        {
          id: 1,
          name: 'Smart Watches',
        },
        {
          id: 2,
          name: 'Smart Watches',
        },
        {
          id: 3,
          name: 'Smart Watches',
        },
        {
          id: 4,
          name: 'Smart Watches',
        },
        {
          id: 5,
          name: 'Smart Watches',
        },
      ],
    },
    {
      id: 4,
      name: 'Chicken, Meat & Fish',
      subCategory: [
        {
          id: 1,
          name: 'Smart Watches',
        },
        {
          id: 2,
          name: 'Smart Watches',
        },
        {
          id: 3,
          name: 'Smart Watches',
        },
        {
          id: 4,
          name: 'Smart Watches',
        },
        {
          id: 5,
          name: 'Smart Watches',
        },
      ],
    },
    {
      id: 5,
      name: 'Chicken, Meat & Fish',
      subCategory: [
        {
          id: 1,
          name: 'Smart Watches',
        },
        {
          id: 2,
          name: 'Smart Watches',
        },
        {
          id: 3,
          name: 'Smart Watches',
        },
        {
          id: 4,
          name: 'Smart Watches',
        },
        {
          id: 5,
          name: 'Smart Watches',
        },
      ],
    },
    {
      id: 6,
      name: 'Chicken, Meat & Fish',
      subCategory: [
        {
          id: 1,
          name: 'Smart Watches',
        },
        {
          id: 2,
          name: 'Smart Watches',
        },
        {
          id: 3,
          name: 'Smart Watches',
        },
        {
          id: 4,
          name: 'Smart Watches',
        },
        {
          id: 5,
          name: 'Smart Watches',
        },
      ],
    },
    {
      id: 7,
      name: 'Chicken, Meat & Fish',
      subCategory: [
        {
          id: 1,
          name: 'Smart Watches',
        },
        {
          id: 2,
          name: 'Smart Watches',
        },
        {
          id: 3,
          name: 'Smart Watches',
        },
        {
          id: 4,
          name: 'Smart Watches',
        },
        {
          id: 5,
          name: 'Smart Watches',
        },
      ],
    },
    {
      id: 8,
      name: 'Chicken, Meat & Fish',
      subCategory: [
        {
          id: 1,
          name: 'Smart Watches',
        },
        {
          id: 2,
          name: 'Smart Watches',
        },
        {
          id: 3,
          name: 'Smart Watches',
        },
        {
          id: 4,
          name: 'Smart Watches',
        },
        {
          id: 5,
          name: 'Smart Watches',
        },
      ],
    },
    {
      id: 9,
      name: 'Chicken, Meat & Fish',
      subCategory: [
        {
          id: 1,
          name: 'Smart Watches',
        },
        {
          id: 2,
          name: 'Smart Watches',
        },
        {
          id: 3,
          name: 'Smart Watches',
        },
        {
          id: 4,
          name: 'Smart Watches',
        },
        {
          id: 5,
          name: 'Smart Watches',
        },
      ],
    },
  ];
  const [categoryId, setCategoryId] = useState<number>(Data[0].id);
  console.log(categoryId);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftCard}>
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <CategoryCard
                id={item.id}
                categoryName={item.name}
                setCategoryId={setCategoryId}
                categoryId={categoryId}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.rightCard}>
        <FlatList
          numColumns={2}
          data={ProductData}
          renderItem={({item}) => (
            <SmallProductCard
              onPress={navigateToProductDetails}
              products={ProductData[1]}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default CategoryProducts;
