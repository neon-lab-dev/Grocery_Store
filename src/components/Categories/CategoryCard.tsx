import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {Image, Text, View} from 'native-base';
import {styles} from './style';

interface CategoryCardProps {
  categoryName: string;
  setCategoryId: (id: number) => void;
  setSubCategory2?: (name: string) => void;
  id: number;
  categoryId: number;
  imageUrl: any;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
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
        if (setSubCategory2) {
          setSubCategory2(categoryName);
        }
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
