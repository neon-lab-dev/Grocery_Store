import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {View, Text, Image, Pressable, useToast, Box} from 'native-base';
import {
  horizontalScale,
  verticalScale,
  scaleFontSize,
} from '../../assets/scaling';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  decrementItem,
  incrementItem,
  removeItem,
} from '../../redux/slices/actions';
import {capitalizeFirstLetter} from '../../utils/capitalizeWord';
import {useFocusEffect} from '@react-navigation/native';
interface ProductDataItem {
  id: string;
  name: string;
  code: string;
  category: string;
  subCategory: string;
  description: string;
  varietyList: ProductVariety[];
}
interface ProductVariety {
  id: string;
  type: string;
  value: string;
  unit: string;
  description: string;
  price: number;
  discountPercent: number;
  discountPrice: number;
  quantity: number;
  productId: string;
  documentUrls: string[];
}
interface ProductCardProps {
  onPress: (name: string) => void;
  products: ProductDataItem;
}
const SmallProductCard: React.FC<ProductCardProps> = ({onPress, products}) => {
  const product = {...products, id: products.varietyList[0].id};
  const dispatch = useDispatch();
  const toast = useToast();
  const id = 'test-toast';
  const cartItems = useSelector((state: any) => state.cart.items);
  const cartItem = cartItems.find((item: any) => item.id === product.id);
  const [count, setCount] = useState(cartItem ? cartItem.quantity : 0);
  const [isButton1Visible, setIsButton1Visible] = useState(count === 0);

  useEffect(() => {
    setCount(cartItem ? cartItem.quantity : 0);
    setIsButton1Visible(!cartItem);
  }, [cartItem]);

  const offerPerIndex = products.varietyList.findIndex(
    item => item.discountPercent > 0,
  );

  // console.log(offerPerIndex);

  const handleDecrease = () => {
    if (count ===1) {
      dispatch(removeItem(product.id));
      setIsButton1Visible(true);
      setCount(0);
    } else {
      dispatch(decrementItem(product.id));
      setCount(count - 1);
    }
  };
  const handleIncrease = () => {
    if (count < products.varietyList[0].quantity) {
      dispatch(incrementItem(product.id));
      setCount(count + 1);
    } else {
      if (!toast.isActive(id)) {
        toast.show({
          id,
          duration: 2500,
          render: () => {
            return (
              <Box
                bg="primary.400"
                px="2"
                py="1"
                rounded="sm"
                mb={5}
                _text={{
                  fontWeight: '500',
                  color: 'white',
                }}>
                Sorry, you can't add more of this item
              </Box>
            );
          },
        });
      }
    }
  };
  const handleButtonPress = () => {
    setCount(1);
    product.quantity = 1;
    dispatch(addToCart(product));
    setIsButton1Visible(false);
  };
  const {width} = Dimensions.get('window');
  // console.log(width, height)
  // let off = calculateDiscountPercentage(products.DisPrice, products.Price);
  return (
    <View style={styles.Container}>
      <View
        key={products.id}
        style={{
          width: horizontalScale(110),
          height: verticalScale(width < 380 ? 180 : 200),
        }}>
        <Pressable
          onPress={() => onPress(products.name)}
          style={{
            borderRadius: 16,
            backgroundColor: '#F9FAFB',
            height: verticalScale(90),
            width: horizontalScale(100),
            overflow: 'hidden',
          }}>
          {offerPerIndex >= 0 && (
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
                {products.varietyList[offerPerIndex].discountPercent}%
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
          )}
          <View flex={1} alignItems={'center'} justifyContent={'center'}>
            {products?.varietyList[0]?.documentUrls[0] ? (
              <Image
                alt="Image"
                source={{uri: products?.varietyList[0]?.documentUrls[0]}}
                style={styles.Image}
                resizeMode="contain"
              />
            ) : null}
          </View>
        </Pressable>
        <Text mr={horizontalScale(10)} style={styles.Title} numberOfLines={2}>
          {capitalizeFirstLetter(products.name)}
        </Text>
        <Text style={styles.Quantity}>
          {products.varietyList[0].value} {products.varietyList[0].unit}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            top: verticalScale(width < 380 ? 130 : 140),
          }}>
          <View style={{marginTop: 18}}>
            <Text
              style={[
                products.varietyList[0].discountPrice < 1000
                  ? styles.Price
                  : styles.adjPrice,
              ]}>
              ₹{products.varietyList[0].discountPrice}
            </Text>
            <Text strikeThrough style={styles.DisPrice}>
              ₹{products.varietyList[0].price}
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
                  marginHorizontal: horizontalScale(5),
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
    fontFamily: 'Inter_Medium',
  },
  Price: {
    fontFamily: 'Inter_Medium',
    fontSize: scaleFontSize(13),
    color: '#1F2937',
  },
  adjPrice: {
    fontFamily: 'Inter_Medium',
    fontSize: scaleFontSize(11),
    color: '#1F2937',
  },
  DisPrice: {
    fontFamily: 'Inter_Regular',
    fontSize: scaleFontSize(11),
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
    marginHorizontal: horizontalScale(5),
  },
  ButtonText: {
    fontFamily: 'Inter_Medium',
    // fontWeight: '500',
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
