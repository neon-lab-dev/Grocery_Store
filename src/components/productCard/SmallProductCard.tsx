import React, {useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
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
  quantity:number,
  Size: string;
  DisPrice: number;
}
interface ProductCardProps {
  onPress: () => void;
  products: ProductDataItem;
}
const SmallProductCard: React.FC<ProductCardProps> = ({onPress, products}) => {
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
  const {width, height} = Dimensions.get('window');
  // console.log(width, height)
  let off = calculateDiscountPercentage(products.DisPrice, products.Price);
  return (
    <View style={styles.Container}>
      <View
        key={products.id}
        style={{width: horizontalScale(110), height: verticalScale(width < 380 ? 180 : 200)}}>
        <Pressable
          onPress={() => onPress()}
          style={{
            borderRadius: 16,
            backgroundColor: '#F9FAFB',
            height: verticalScale(90),
            width: horizontalScale(100),
            overflow: 'hidden',
          }}>
          <View
            style={{
              backgroundColor: Colors.primary[500],
              height: verticalScale(25),
              width: horizontalScale(28),
              marginLeft: verticalScale(10),
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}>
            <Text
              style={{
                fontFamily: 'Inter_Bold',
                fontSize: scaleFontSize(12),
                alignSelf: 'center',
                color: 'white',
              }}>
              {off.toFixed(0)}%
            </Text>
            <Text
              style={{
                fontFamily: 'Inter_Bold',
                fontSize: scaleFontSize(12),
                alignSelf: 'center',
                position: 'absolute',
                top: verticalScale(8),
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
        <Text mr={horizontalScale(10)} style={styles.Title}>
          {products.Title}
        </Text>
        <Text style={styles.Quantity}>{products.Size}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            top: verticalScale(width < 380 ? 130 : 140),
          }}>
          <View style={{marginTop: 18}}>
            <Text style={styles.Price}>₹{products.Price}</Text>
            <Text strikeThrough style={styles.DisPrice}>
              ₹{products.DisPrice}
            </Text>
          </View>
          <View>
            {isButton1Visible ? (
              <Pressable style={styles.Button} onPress={handleButtonPress}>
                <Text style={styles.ButtonText}>ADD</Text>
              </Pressable>
            ) : (
              <View
                style={{
                  paddingVertical: verticalScale(3),
                  paddingHorizontal: horizontalScale(1),
                  marginHorizontal: horizontalScale(20),
                  backgroundColor: Colors.primary[500],
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Pressable onPress={handleDecrease}>
                  <Text
                    style={{
                      fontFamily: 'Inter_Medium',
                      color: 'white',
                      fontSize: scaleFontSize(18),
                      marginHorizontal: horizontalScale(5),
                    }}>
                    -
                  </Text>
                </Pressable>
                <Text
                  style={{
                    fontFamily: 'Inter_Medium',
                    color: 'white',
                    fontSize: scaleFontSize(18),
                    marginHorizontal: horizontalScale(5),
                  }}>
                  {count}
                </Text>
                <Pressable onPress={handleIncrease}>
                  <Text
                    style={{
                      fontFamily: 'Inter_Medium',
                      color: 'white',
                      fontSize: scaleFontSize(18),
                      marginHorizontal: horizontalScale(5),
                    }}>
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

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginLeft: horizontalScale(18),
  },
  Image: {
    width: horizontalScale(75),
    height: verticalScale(60),
    alignSelf: 'center',
  },
  Title: {
    fontSize: scaleFontSize(14),
    color: '#1F2937',
    marginTop: verticalScale(3),
    fontWeight:'500'
    // fontFamily: 'Inter_Medium',
  },
  Price: {
    fontFamily: 'Inter_Medium',
    fontSize: scaleFontSize(15),
    color: '#1F2937',
  },
  DisPrice: {
    fontFamily: 'Inter_Regular',
    fontSize: scaleFontSize(12),
    color: Colors.accent[400],
    marginBottom: verticalScale(10),
    marginTop: verticalScale(-6),
  },
  Button: {
    borderRadius: 10,
    paddingVertical: verticalScale(3),
    paddingHorizontal: horizontalScale(12),
    borderWidth: 1,
    borderColor: Colors.primary[400],
    marginHorizontal: horizontalScale(20),
  },
  ButtonText: {
    // fontFamily: 'Inter_Medium',
     fontWeight:'500',
    color: Colors.primary[400],
    fontSize: scaleFontSize(15),
  },
  Quantity: {
    fontFamily: 'Inter_Medium',
    fontSize: scaleFontSize(12),
    color: Colors.accent[500],
    marginTop: verticalScale(-2),
  },
});

export default SmallProductCard;
