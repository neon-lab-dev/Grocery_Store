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
  const product = {
    varietyId: products.varietyList[0].id,
    name: products.name,
    price: products.varietyList[0].price,
    discountPercent: products.varietyList[0].discountPercent,
    discountedPrice: products.varietyList[0].discountPrice,
    boughtQuantity: 0,
    value: products.varietyList[0].value,
    unit: products.varietyList[0].unit,
    boughtPrice: products.varietyList[0].discountPrice,
    savings: 0,
    documents: products.varietyList[0].documentUrls,
  };
  const dispatch = useDispatch();
  const toast = useToast();
  const id = 'test-toast';
  const cartItems = useSelector((state: any) => state.cart.items);
  const cartItem = cartItems.find(
    (item: any) => item.varietyId === product.varietyId,
  );
  const [count, setCount] = useState(cartItem ? cartItem.boughtQuantity : 0);
  const [isButton1Visible, setIsButton1Visible] = useState(count === 0);

  useEffect(() => {
    setCount(cartItem ? cartItem.boughtQuantity : 0);
    setIsButton1Visible(!cartItem);
  }, [cartItem]);

  const offerPerIndex = products.varietyList.findIndex(
    item => item.discountPercent > 0,
  );

  // console.log(offerPerIndex);

  const handleDecrease = () => {
    if (count === 1) {
      dispatch(removeItem(product.varietyId));
      setIsButton1Visible(true);
      setCount(0);
    } else {
      dispatch(decrementItem(product.varietyId));
      setCount(count - 1);
    }
  };
  const handleIncrease = () => {
    if (count < products.varietyList[0].quantity) {
      dispatch(incrementItem(product.varietyId));
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
    product.boughtQuantity = 1;
    dispatch(addToCart(product));
    setIsButton1Visible(false);
  };
  const {width} = Dimensions.get('window');
  // console.log(width, height)
  // let off = calculateDiscountPercentage(products.DisPrice, products.Price);
  if (products.varietyList[0].quantity !== 0) {
    return (
      <View style={styles.Container}>
        <View
          key={products.id}
          style={{
            width: horizontalScale(110),
            height: verticalScale(width < 380 ? 180 : 200),
          }}>
          <Pressable
            onPress={() => onPress(products.code)}
            style={{
              borderRadius: 16,
              backgroundColor: '#F9FAFB',
              height: verticalScale(90),
              width: horizontalScale(100),
              overflow: 'hidden',
            }}>
            {products.varietyList[0].discountPercent !== 0 && (
              <View
                style={{
                  backgroundColor: '#6D28D9',
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
                {products.varietyList[0].discountPrice !==
                  products.varietyList[0].price && (
                  <Text style={{textDecorationLine: 'line-through'}}>
                    {'₹'}
                    {products.varietyList[0].price}
                  </Text>
                )}
              </Text>
            </View>
            <View>
              {isButton1Visible ? (
                <Pressable style={styles.Button} onPress={handleButtonPress}>
                  <Text style={styles.ButtonText}>ADD</Text>
                  {products.varietyList.length > 1 && (
                    <View
                      style={{
                        alignItems: 'center',
                        backgroundColor: 'white',
                        top: verticalScale(17),
                        position: 'absolute',
                        width: horizontalScale(34),
                        height: verticalScale(14),
                        left: horizontalScale(9),
                      }}>
                      <Text
                        style={{
                          fontSize: scaleFontSize(8),
                        }}>
                        {' '}
                        {products.varietyList.length} Options
                      </Text>
                    </View>
                  )}
                </Pressable>
              ) : (
                <View
                  style={{
                    paddingVertical: verticalScale(3),
                    paddingHorizontal: horizontalScale(1),
                    marginHorizontal: horizontalScale(5),
                    backgroundColor: '#6D28D9',
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
  } else {
    return (
      <View style={styles.Container} opacity={0.6}>
        <View
          key={products.id}
          style={{
            width: horizontalScale(110),
            height: verticalScale(width < 380 ? 180 : 200),
          }}>
          <Pressable
            disabled
            onPress={() => onPress(products.code)}
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
              // alignItems: 'center',
              // position: 'absolute',
              marginTop: verticalScale(10),
              // top: verticalScale(width < 380 ? 130 : 140),
            }}>
            {/* <View style={{marginTop: 18}}>
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
            </View> */}
            <View>
              {isButton1Visible ? (
                <Pressable
                  style={styles.Button}
                  onPress={handleButtonPress}
                  disabled>
                  <Text style={[styles.ButtonText, {fontSize: 11}]}>
                    Out of Stock
                  </Text>
                  {products.varietyList.length > 1 && (
                    <View
                      style={{
                        alignItems: 'center',
                        backgroundColor: 'white',
                        top: verticalScale(17),
                        position: 'absolute',
                        width: horizontalScale(34),
                        height: verticalScale(14),
                        left: horizontalScale(9),
                      }}>
                      <Text
                        style={{
                          fontSize: scaleFontSize(8),
                        }}>
                        {' '}
                        {products.varietyList.length} Options
                      </Text>
                    </View>
                  )}
                </Pressable>
              ) : (
                <View
                  style={{
                    paddingVertical: verticalScale(3),
                    paddingHorizontal: horizontalScale(1),
                    marginHorizontal: horizontalScale(5),
                    backgroundColor: '#6D28D9',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Pressable onPress={handleDecrease} disabled>
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
                  <Pressable onPress={handleIncrease} disabled>
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
    borderColor: '#6D28D9',
    marginHorizontal: horizontalScale(5),
  },
  ButtonText: {
    fontFamily: 'Inter_Medium',
    // fontWeight: '500',
    color: '#6D28D9',
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
