import React, {FC, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {verticalScale} from '../../assets/scaling';
import {Categories as CategoriesData} from '../../constants/categories';

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

const Categories: FC = ({navigation}) => {
  const [categoryId, setCategoryId] = useState(0);
  const selectedCategoryName = Object.keys(CategoriesData)[categoryId];
  const subCategories = CategoriesData[selectedCategoryName] || [];
  const SubCategory: FC<SubCategory> = ({name}) => {
    return (
      <TouchableOpacity
        style={styles.subCategoryCard}
        onPress={() =>
          navigation.navigate('CategoryProducts', {
            SubCategory: name,
          })
        }>
        <View style={styles.rightImage}></View>

        <Text style={styles.categoriesRight}>{name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftCard}>
        <View>
          <FlatList
            contentContainerStyle={{
              marginTop: verticalScale(20),
              paddingBottom: verticalScale(27),
            }}
            showsVerticalScrollIndicator={false}
            data={Object.keys(CategoriesData)}
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
          renderItem={({item, index}) => <SubCategory id={index} name={item} />}
        />
      </View>
    </View>
  );
};

export default Categories;
