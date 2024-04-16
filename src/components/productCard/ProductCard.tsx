import React from 'react';
import {View, Text, Image, Pressable, ScrollView} from 'native-base';
import {styles} from './style';
import {Colors} from '../../constants/colors';
import {horizontalScale, verticalScale} from '../../assets/scaling';
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
const ProductCard: React.FC<ProductCardProps> = ({onPress, products}) => {
  let off = calculateDiscountPercentage(products.DisPrice, products.Price);
  return (
    <View style={styles.Container}>
      <View
        key={products.id}
        style={{width: horizontalScale(120), height: verticalScale(200)}}>
        <Pressable
          onPress={onPress}
          style={{
            borderRadius: 20,
            backgroundColor: '#F9FAFB',
            height: verticalScale(120),
            width: horizontalScale(120),
            overflow: 'hidden',
          }}>
          <View
            style={{
              backgroundColor: Colors.primary[500],
              height: verticalScale(30),
              width: horizontalScale(34),
              marginLeft: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontWeight: 'bold',
                color: 'white',
              }}>
              {off.toFixed(0)}%
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                position: 'absolute',
                top: verticalScale(11),
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
            top: verticalScale(170),
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
export default ProductCard;
