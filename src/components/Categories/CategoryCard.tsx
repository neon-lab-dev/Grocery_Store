import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import {Image, Text, View} from 'native-base';

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

const styles = StyleSheet.create({
  mainCategoryCard: {
    width: horizontalScale(90),
    marginVertical: verticalScale(3),
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  categoryCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(66),
    height: verticalScale(111),
    marginLeft: horizontalScale(9),
    // backgroundColor: 'orange',
    gap: 3,
  },
  leftImage: {
    width: horizontalScale(66),
    height: verticalScale(70),
    borderRadius: horizontalScale(16),
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesLeft: {
    fontFamily: 'Inter_Regular',
    fontSize: scaleFontSize(12),
    lineHeight: verticalScale(11),
    textAlign: 'center',
    color: '#4B5563',
  },
  selectedItem: {
    backgroundColor: '#F97316',
    width: horizontalScale(4),
    height: verticalScale(53),
    marginTop: verticalScale(15),
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    marginLeft: horizontalScale(5.5),
  },
});
