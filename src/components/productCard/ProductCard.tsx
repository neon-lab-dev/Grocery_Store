import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Button,
  Center,
} from 'native-base';
import {styles} from './style';
import {Colors} from '../../constants/colors';
import {horizontalScale, scaleFontSize, verticalScale} from '../../assets/scaling';
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
  const [count, setCount] = useState(1);
  const [isButton1Visible, setIsButton1Visible] = useState(true);
  const handleDecrease = () => {
    if (count == 1) {
      setIsButton1Visible(true);
    } else setCount(count - 1);
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };
  const handleButtonPress = () => {
    setIsButton1Visible(false);
  };
  let off = calculateDiscountPercentage(products.DisPrice, products.Price);
  return (
    <View style={styles.Container}>
      <View
        key={products.id}
        style={{width: horizontalScale(105), height: verticalScale(220)}}>
        <Pressable
          onPress={onPress}
          style={{
            borderRadius: 20,
            backgroundColor: '#F9FAFB',
            height: verticalScale(120),
            width: horizontalScale(110),
            overflow: 'hidden',
          }}>
          <View
            style={{
              backgroundColor: Colors.primary[500],
              height: verticalScale(28),
              width: horizontalScale(30),
              marginLeft: horizontalScale(15),
              borderBottomLeftRadius: horizontalScale(8),
              borderBottomRightRadius: horizontalScale(8),
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontWeight: 'bold',
                color: 'white',
                fontSize:scaleFontSize(14),
              }}>
              {off.toFixed(0)}%
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                position: 'absolute',
                fontSize:scaleFontSize(14),
                top: verticalScale(10),
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
          <View style={{marginTop:10}}>
            <Text style={styles.Price}>₹{products.Price}</Text>
            <Text strikeThrough style={styles.DisPrice}>
              ₹{products.DisPrice}
            </Text>
          </View>
          <View >
            {isButton1Visible ? (
              <Pressable style={styles.Button} onPress={handleButtonPress}>
                <Text style={styles.ButtonText}>ADD</Text>
              </Pressable>
            ) : (
              <View
                style={{
                  paddingVertical: verticalScale(4),
                  paddingHorizontal: horizontalScale(4),
                  marginHorizontal: horizontalScale(25),
                  backgroundColor: Colors.primary[500],
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius:10,
                }}>
                <Pressable onPress={handleDecrease}>
                  <Text style={{color: 'white', fontSize: scaleFontSize(20),marginHorizontal:horizontalScale(5)}}>
                    -
                  </Text>
                </Pressable>
                <Text style={{color: 'white', fontSize: scaleFontSize(18),marginHorizontal:horizontalScale(5)}}>
                  {count}
                </Text>
                <Pressable onPress={handleIncrease}>
                  <Text style={{color: 'white', fontSize:  scaleFontSize(18),marginHorizontal:horizontalScale(5)}}>
                    +
                  </Text>
                </Pressable>
              </View>
            )}
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
