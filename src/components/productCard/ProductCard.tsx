import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Button,
  Center,
  Box,
} from 'native-base';
import {useToast} from 'native-base';
import {styles} from './style';
import {Colors} from '../../constants/colors';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import {calculateDiscountPercentage} from '../../utils/calculatePercentage';
import {Alert, Dimensions} from 'react-native';
import {
  addToCart,
  decrementItem,
  incrementItem,
  removeItem,
} from '../../redux/slices/actions';
import {useDispatch} from 'react-redux';
import sizes from 'native-base/lib/typescript/theme/base/sizes';
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
  // console.log(products)
  const dispatch = useDispatch();
  const toast = useToast();
  const id = 'test-toast';
  const [count, setCount] = useState(0);
  const [isButton1Visible, setIsButton1Visible] = useState(true);
  const handleDecrease = () => {
    if (count === 1) {
      dispatch(removeItem(products.id));
      setIsButton1Visible(true);
      setCount(0);
    } else {
      dispatch(decrementItem(products.id));
      setCount(count - 1);
    }
  };
  const handleIncrease = () => {
    if (count < products.varietyList[0].quantity) {
      dispatch(addToCart(products));
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
    products.quantity = 1;
    dispatch(addToCart(products));
    setIsButton1Visible(false);
  };
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
            <Image
              alt="Image"
              source={{uri: products.varietyList[0].documentUrls[0]}}
              style={styles.Image}
            />
          </Pressable>
          <Text style={styles.Title}>{products.name}</Text>
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
              <Text style={styles.Price}>
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
                    paddingVertical: verticalScale(4),
                    paddingHorizontal: horizontalScale(4),
                    marginHorizontal: horizontalScale(30),
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
          opacity={0.6}
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
            <Image
              alt="Image"
              source={{uri: products.varietyList[0].documentUrls[0]}}
              style={styles.Image}
            />
          </Pressable>
          <Text style={styles.Title}>{products.name}</Text>
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
            <Text color={'primary.500'} fontWeight={500} p={0.5}>
              Out Of Stock
            </Text>
          </View>
        </View>
      </View>
    );
  }
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
