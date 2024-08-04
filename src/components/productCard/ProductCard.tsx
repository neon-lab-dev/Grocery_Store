/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Image, Pressable, Box} from 'native-base';
import {useToast} from 'native-base';
import {styles} from './style';
import {Colors} from '../../constants/colors';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import {Dimensions} from 'react-native';
import {
  addToCart,
  decrementItem,
  incrementItem,
  removeItem,
} from '../../redux/slices/actions';
import {useDispatch, useSelector} from 'react-redux';
import {capitalizeFirstLetter} from '../../utils/capitalizeWord';
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
  onPress: () => void;
  products: ProductDataItem;
}

const ProductCard: React.FC<ProductCardProps> = ({onPress, products}) => {
  const product = {...products, id: products.varietyList[0].id};
  const [perIndex, setPerIndex] = useState(0);
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

  const handleDecrease = () => {
    if (count === 1) {
      dispatch(removeItem(products.varietyList[0].id));
      setIsButton1Visible(true);
      setCount(0);
    } else {
      dispatch(decrementItem(products.varietyList[0].id));
      setCount(count - 1);
    }
  };
  const handleIncrease = () => {
    if (count < products.varietyList[0].quantity) {
      dispatch(incrementItem(products.varietyList[0].id));
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

  const offerPerIndex = products.varietyList.findIndex(
    item => item.discountPercent > 0,
  );

  const {width} = Dimensions.get('window');
  // console.log(width, height)
  if (products.varietyList[0].quantity !== 0) {
    return (
      <View style={styles.Container}>
        <View
          key={products.id}
          style={{
            width: horizontalScale(105),
            height: verticalScale(width < 380 ? 210 : 220),
          }}>
          <Pressable
            onPress={onPress}
            style={{
              borderRadius: 20,
              backgroundColor: '#F9FAFB',
              height: verticalScale(120),
              width: horizontalScale(130),
              overflow: 'hidden',
            }}>
            {/* offer per container */}
            {offerPerIndex >= 0 && (
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
                    fontFamily: 'Inter_Bold',
                    alignSelf: 'center',
                    color: 'white',
                    fontSize: scaleFontSize(14),
                  }}>
                  {products.varietyList[offerPerIndex].discountPercent}%
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter_Bold',
                    alignSelf: 'center',
                    position: 'absolute',
                    fontSize: scaleFontSize(14),
                    top: verticalScale(10),
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
          <Text style={styles.Title} numberOfLines={2}>
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
              top: verticalScale(width < 380 ? 160 : 165),
            }}>
            <View style={{marginTop: 24}}>
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
                <Pressable
                  style={styles.Button}
                  onPress={handleButtonPress}
                  position={'relative'}>
                  <Text style={styles.ButtonText}>ADD</Text>
                  {products.varietyList.length > 1 && (
                    <View
                      position={'absolute'}
                      w={horizontalScale(40)}
                      bottom={-verticalScale(5)}
                      bgColor={'white'}
                      alignItems={'center'}
                      px={horizontalScale(1)}>
                      <Text
                        fontFamily={'Inter_Medium'}
                        fontSize={scaleFontSize(8)}
                        lineHeight={9.68}
                        letterSpacing={-0.04}
                        color={'accent.500'}>
                        {products.varietyList.length} Options
                      </Text>
                    </View>
                  )}
                </Pressable>
              ) : (
                <View
                  style={{
                    paddingVertical: verticalScale(4),
                    paddingHorizontal: horizontalScale(4),
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
  } else {
    return (
      <View style={styles.Container}>
        <View
          opacity={0.7}
          key={products.id}
          style={{
            width: horizontalScale(105),
            height: verticalScale(width < 380 ? 210 : 220),
          }}>
          <Pressable
            onPress={onPress}
            style={{
              borderRadius: 20,
              backgroundColor: '#F9FAFB',
              height: verticalScale(120),
              width: horizontalScale(110),
              overflow: 'hidden',
            }}>
            {products.varietyList[0].discountPercent !== 0 && (
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
                    fontFamily: 'Inter_Bold',
                    alignSelf: 'center',
                    color: 'white',
                    fontSize: scaleFontSize(14),
                  }}>
                  {products.varietyList[0].discountPercent}%
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter_Bold',
                    alignSelf: 'center',
                    position: 'absolute',
                    fontSize: scaleFontSize(14),
                    top: verticalScale(10),
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
          <Text style={styles.Title} numberOfLines={2}>
            {products.name}
          </Text>
          <Text style={styles.Quantity}>
            {products.varietyList[0].value} {products.varietyList[0].unit}
          </Text>
          <View
            style={{
              width: 125,
              marginLeft: width < 380 ? 4 : 6,
              alignItems: 'center',
              position: 'absolute',
              top: verticalScale(width < 380 ? 180 : 187),
            }}
            borderWidth={1}
            borderColor={'primary.500'}
            height={8}
            borderRadius={10}>
            <Text
              fontFamily={'Inter_Medium'}
              color={'primary.500'}
              fontWeight={500}
              p={0.5}>
              Out Of Stock
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

export default ProductCard;
