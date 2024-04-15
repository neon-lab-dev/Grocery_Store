import React, {FC, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';

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

const Categories: FC = () => {
  const Data: Category[] = [
    {
      id: 1,
      name: 'Electronics',
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
      name: 'Cleaners & Repellents',
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
      name: 'Sexual Wellness',
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
      name: 'Beauty & Cosmetics',
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
      name: 'Sweets & Chocolates',
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
      name: 'Sweets & Chocolates',
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
      name: 'Sweets & Chocolates',
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
      name: 'Sweets & Chocolates',
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
      name: 'Sweets & Chocolates',
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

  const subCategory = Data.find(item => item.id === categoryId);
  const SubCategory: FC<SubCategory> = ({id, name}) => {
    return (
      <TouchableOpacity style={styles.subCategoryCard}>
        <View style={styles.rightImage}></View>

        <Text style={styles.categoriesRight}>{name}</Text>
      </TouchableOpacity>
    );
  };
  console.log(subCategory);
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
        <View style={{padding: 13, marginVertical: 8}}>
          <Text style={styles.categoriesTitle}>{subCategory?.name}</Text>
        </View>

        <FlatList
          numColumns={3}
          data={subCategory?.subCategory}
          renderItem={({item}) => (
            <SubCategory
              id={item.id}
              name={item.name}
              categoryTitle={subCategory?.name}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default Categories;
