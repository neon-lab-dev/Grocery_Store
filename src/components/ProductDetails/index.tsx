/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {FC, useEffect, useState} from 'react';
import {FlatList, Image, Pressable, ScrollView} from 'react-native';
import {View, Text} from 'native-base';
import {
  horizontalScale,
  verticalScale,
  scaleFontSize,
} from '../../assets/scaling';
import ProductHorizontalScroll from '../productCard/ProductHorizontalScroll';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';
import {SvgXml} from 'react-native-svg';
import {arrowDropDown} from '../../assets/images/icons/arrow_drop_down';
import {arrowUp} from '../../assets/images/icons/arrow_drop_up';
import {searchProduct} from '../../api/auth_routes';
import {useDispatch} from 'react-redux';
import {Box, useToast} from 'native-base';
import {addToCart, decrementItem, removeItem} from '../../redux/slices/actions';

interface AlternativeImageProps {
  img: any;
  id: number;
}

interface UnitCardProps {
  item: {
    id: number;
    kg: number;
    Newprice: number;
    price: number;
  };
}

const ProductDetails: FC<{Close: () => void; productName?: string}> = ({
  Close,
  productName,
}) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<number>(0);
  const [viewMoreDetails, setViewMoreDetails] = useState<boolean>(false);
  const [showCartButton, setShowCartButton] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [isButton1Visible, setIsButton1Visible] = useState(true);
  const dispatch = useDispatch();
  const toast = useToast();
  const id = 'test-toast';
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        if (productName) {
          const response = await searchProduct(productName);
          if (response.content) {
            const initialSelectedProduct = {...response.content[0]};
            initialSelectedProduct.varietyList = [
              response.content[0].varietyList[0],
            ];
            setProductDetails(response.content[0]);
            setSelectedProduct(initialSelectedProduct);
            setSelectedImageUrl(
              response.content[0].varietyList[0].documentUrls[0],
            );
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductDetails();
  }, [productName]);

  const handleDecrease = () => {
    if (count === 1) {
      dispatch(removeItem(selectedProduct.id));
      setIsButton1Visible(true);
      setCount(0);
    } else {
      dispatch(decrementItem(selectedProduct.id));
      setCount(count - 1);
    }
  };
  const handleIncrease = () => {
    if (count < selectedProduct.varietyList[0].quantity) {
      dispatch(addToCart(selectedProduct));
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
    selectedProduct.quantity = 1;
    dispatch(addToCart(selectedProduct));
    setIsButton1Visible(false);
    setShowCartButton(true);
  };

  const handleUnitSelection = (unitIndex: number) => {
    setSelectedUnit(unitIndex);
    const updatedProduct = {...productDetails};
    updatedProduct.varietyList = [productDetails.varietyList[unitIndex]];
    setSelectedProduct(updatedProduct);
  };

  const AlternativeImage: FC<AlternativeImageProps> = ({img, id}) => {
    return (
      <Pressable
        onPress={() => {
          setSelectedImage(id);
          setSelectedImageUrl(img.uri);
        }}
        style={[
          styles.smImage,
          {borderColor: id === selectedImage ? '#F97316' : '#E5E7EB'},
        ]}>
        <Image
          source={img}
          style={{width: 33, height: 33}}
          resizeMode="contain"
        />
      </Pressable>
    );
  };

  const UnitCard: FC<UnitCardProps> = ({item, id}) => {
    return (
      <Pressable
        onPress={() => handleUnitSelection(id)}
        style={
          id === selectedUnit
            ? styles.selectUnitCardContainer
            : styles.unitCardContainer
        }>
        <Text style={styles.unitCardKgText}>
          {item.value} {item.unit}
        </Text>
        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <Text style={styles.unitCardPriceText}>₹{item.discountPrice}</Text>
          <Text style={styles.unitCardCutOffprice}>₹{item.price}</Text>
        </View>
      </Pressable>
    );
  };

  const navigation = useNavigation();

  const navigateToCart = () => {
    Close();
    navigation.navigate('Cart');
  };

  const aggregatedImageUrls = productDetails?.varietyList
    .map(variety => variety.documentUrls)
    .flat();

  return (
    <>
      {!productDetails ? (
        <View flex={1} alignItems={'center'} justifyContent={'center'}>
          <Image
            source={require('../../assets/images/icons/loading.gif')}
            style={{height: 250, width: 250}}
          />
        </View>
      ) : (
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <ScrollView>
            <View style={styles.imageContainer}>
              {productDetails.varietyList[0].discountPercent !== 0 && (
                <View style={styles.offPerContainer}>
                  <Text style={styles.percentageText}>
                    {productDetails.varietyList[0].discountPercent}%
                  </Text>
                  <Text
                    style={[
                      styles.percentageText,
                      {fontSize: scaleFontSize(20), bottom: verticalScale(3)},
                    ]}>
                    OFF
                  </Text>
                </View>
              )}
              <View style={{flex: 1, marginHorizontal: horizontalScale(80)}}>
                {selectedImageUrl && (
                  <Image
                    source={{uri: selectedImageUrl}}
                    style={{height: 200, width: 200}}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View
                style={{
                  width: horizontalScale(245),
                  marginHorizontal: horizontalScale(50),
                  marginVertical: verticalScale(18),
                  marginTop: verticalScale(40),
                  flex: 1,
                }}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => (
                    <View style={{marginLeft: horizontalScale(6)}} />
                  )}
                  data={aggregatedImageUrls.map(
                    (url: string, index: number) => ({id: index, image: url}),
                  )}
                  renderItem={({item}) => (
                    <AlternativeImage img={{uri: item?.image}} id={item.id} />
                  )}
                  horizontal
                />
              </View>
            </View>
            {/* product details and other options */}
            <View>
              {/* product Name */}
              <View
                style={{
                  paddingTop: verticalScale(16),
                  paddingHorizontal: horizontalScale(24),
                  backgroundColor: '#FFFFFF',
                  borderBottomWidth: horizontalScale(2),
                  borderBottomColor: '#F3F4F6',
                  paddingBottom: verticalScale(12),
                }}>
                <Text style={styles.productName}>{productName}</Text>
              </View>
              {/* Product units */}
              <View
                style={{
                  paddingHorizontal: horizontalScale(24),
                  marginTop: verticalScale(15),
                }}>
                <Text style={styles.selectUnitText}>Select Unit</Text>
                <FlatList
                  data={productDetails.varietyList}
                  renderItem={({item, index}) => (
                    <UnitCard item={item} id={index} />
                  )}
                  horizontal
                  contentContainerStyle={{
                    marginVertical: verticalScale(15),
                    gap: 12,
                    marginBottom: verticalScale(19),
                  }}
                />
                <Text style={styles.productDetailsText}>Product Details</Text>
                {/* product description */}
                <View style={{marginTop: verticalScale(10), gap: 2}}>
                  <Text style={styles.descriptionText}>Description</Text>
                  <Text
                    numberOfLines={!viewMoreDetails ? 2 : 5}
                    style={{
                      fontFamily: 'Inter_Regular',
                      fontSize: scaleFontSize(14),
                      color: '#6B7280',
                      lineHeight: 16.8,
                      letterSpacing: -0.03,
                    }}>
                    {productDetails.description}
                    {'\n'}
                    Category: {productDetails.category}
                    {'\n'}
                    SubCategory: {productDetails.subCategory}
                    {'\n'}
                    Brand: {productDetails.brand}
                  </Text>
                </View>
              </View>
              <Pressable
                style={styles.viewMore}
                onPress={() => setViewMoreDetails(!viewMoreDetails)}>
                <Text style={styles.viewDetailsText}>
                  View <Text>{viewMoreDetails ? 'less' : 'more'}</Text> details
                </Text>
                {/* <Image
              source={require('../../assets/images/icons/arrow_drop_down.png')}
            /> */}
                {viewMoreDetails ? (
                  <SvgXml xml={arrowUp} width={8} height={8} />
                ) : (
                  <SvgXml xml={arrowDropDown} width={8} height={8} />
                )}
              </Pressable>
              {/* products Listings */}
              <View
                style={{
                  paddingHorizontal: horizontalScale(24),
                  marginVertical: verticalScale(5),
                }}>
                <Text style={styles.similarProductsText}>Similar Products</Text>
              </View>
              <View
                style={{
                  marginVertical: verticalScale(12),
                  paddingHorizontal: horizontalScale(5),
                }}>
                <ProductHorizontalScroll onPress={() => {}} />
              </View>
              <View
                style={{
                  paddingHorizontal: horizontalScale(24),
                  marginVertical: verticalScale(5),
                }}>
                <Text style={styles.similarProductsText}>
                  People also Bought
                </Text>
              </View>
              <View
                style={{
                  marginVertical: verticalScale(12),
                  paddingHorizontal: horizontalScale(5),
                }}>
                <ProductHorizontalScroll onPress={() => {}} />
              </View>
            </View>
          </ScrollView>
          {/* Bottom Layout Container */}
          <View shadow={5} style={styles.bottomLayoutContainer}>
            {selectedProduct && (
              <View style={{gap: 2, marginTop: verticalScale(8)}}>
                <Text style={styles.bottomLayoutkgText}>
                  {selectedProduct.varietyList[0].value}{' '}
                  {selectedProduct.varietyList[0].unit}
                </Text>
                <View style={{flexDirection: 'row', gap: 8}}>
                  <Text style={styles.bottomLayoutPrice}>
                    ₹{selectedProduct.varietyList[0].discountPrice}
                  </Text>
                  {selectedProduct.varietyList[0].discountPercent !== 0 && (
                    <View
                      style={[
                        styles.percentageOff,
                        {
                          flexDirection: 'row',
                          gap: 3,
                        },
                      ]}>
                      <Text style={styles.percentageOffText}>
                        {selectedProduct.varietyList[0].discountPercent}%
                      </Text>
                      <Text style={styles.percentageOffText}>OFF</Text>
                    </View>
                  )}
                </View>
              </View>
            )}

            {/* Add To Cart Button */}
            {isButton1Visible ? (
              <Pressable
                onPress={handleButtonPress}
                style={{
                  width: horizontalScale(120),
                  height: verticalScale(50),
                  backgroundColor: '#F97316',
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: horizontalScale(25),
                }}>
                <Text
                  color={'primary.50'}
                  fontFamily={'Inter_Medium'}
                  fontSize={scaleFontSize(16)}
                  lineHeight={19.38}
                  letterSpacing={-0.04}>
                  Add To Cart
                </Text>
              </Pressable>
            ) : (
              <View
                w={horizontalScale(120)}
                h={verticalScale(50)}
                bgColor={'primary.500'}
                flexDir={'row'}
                alignItems={'center'}
                justifyContent={'space-evenly'}
                ml={horizontalScale(25)}
                borderRadius={12}>
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
          {/* <Pressable > */}
          {count !== 0 && (
            <Pressable style={styles.floatingButton} onPress={navigateToCart}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 3,
                }}>
                <Image
                  source={require('../../assets/images/icons/cart-white.png')}
                />
                <Text style={styles.floatingButtonText}>{count} item</Text>
              </View>
            </Pressable>
          )}

          {/* </Pressable> */}
        </View>
      )}
    </>
  );
};

export default ProductDetails;
