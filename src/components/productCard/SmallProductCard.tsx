import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {View, Text, Image, Pressable} from 'native-base';
import {
  horizontalScale,
  verticalScale,
  scaleFontSize,
} from '../../assets/scaling';
import {calculateDiscountPercentage} from '../../utils/calculatePercentage';
interface ProductDataItem {
  id: number;
  Title: string;
  image: string;
  Price: number;
  Quantity: string;
  DisPrice: number;
}
interface ProductCardProps {
  onPress: () => void;
  products: ProductDataItem;
}
const SmallProductCard: React.FC<ProductCardProps> = ({onPress, products}) => {
  let off = calculateDiscountPercentage(products.DisPrice, products.Price);
  return (
    <View style={styles.Container}>
      <View
        key={products.id}
        style={{width: horizontalScale(120), height: verticalScale(175)}}>
        <Pressable
          onPress={() => onPress()}
          style={{
            borderRadius: 16,
            backgroundColor: '#F9FAFB',
            height: verticalScale(90),
            width: horizontalScale(90),
            overflow: 'hidden',
          }}>
          <View
            style={{
              backgroundColor: Colors.primary[500],
              height: verticalScale(25),
              width: horizontalScale(28),
              marginLeft: 15,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}>
            <Text
              style={{
                fontSize: 11,
                alignSelf: 'center',
                fontWeight: 'bold',
                color: 'white',
              }}>
              {off.toFixed(0)}%
            </Text>
            <Text
              style={{
                fontSize: 11,
                alignSelf: 'center',
                position: 'absolute',
                top: verticalScale(8),
                fontWeight: 'bold',
                color: 'white',
              }}>
              OFF
            </Text>
          </View>
          <Image
            alt="Image"
            source={getImage(products.image)}
            style={styles.Image}
          />
        </Pressable>
        <Text style={styles.Title}>{products.Title}</Text>
        <Text style={styles.Quantity}>{products.Quantity}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            top: verticalScale(140),
          }}>
          <View>
            <Text style={styles.Price}>₹{products.Price}</Text>
            <Text strikeThrough style={styles.DisPrice}>
              ₹{products.DisPrice}
            </Text>
          </View>
          <View>
            <Pressable style={styles.Button} onPress={onPress}>
              <Text style={styles.ButtonText}>ADD</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
const getImage = (imageName: string) => {
  switch (imageName) {
    case 'item1':
      return require('../../assets/images/Product-Image/Tomato.png');
    case 'item2':
      return require('../../assets/images/Product-Image/Ginger.png');
  }
};

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginLeft: horizontalScale(18),
  },
  Image: {
    width: 80,
    height: 75,
    alignSelf: 'center',
  },
  Title: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  },
  Price: {
    fontSize: scaleFontSize(14),
    color: 'black',
  },
  DisPrice: {
    fontSize: scaleFontSize(12),
    color: Colors.accent[400],
  },
  Button: {
    borderRadius: 10,
    paddingVertical: verticalScale(3),
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.primary[400],
    marginHorizontal: 22,
  },
  ButtonText: {
    color: Colors.primary[400],
    fontSize: 14,
  },
  Quantity: {
    fontSize: scaleFontSize(12),
    color: Colors.accent[400],
  },
});

export default SmallProductCard;
