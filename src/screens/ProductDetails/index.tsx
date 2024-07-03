/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useState} from 'react';
import {FlatList, Image, Pressable, RefreshControl} from 'react-native';
import {View, Text, ScrollView, useToast, Box} from 'native-base';
import {
  horizontalScale,
  verticalScale,
  scaleFontSize,
} from '../../assets/scaling';
import ProductHorizontalScroll from '../../components/productCard/ProductHorizontalScroll';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';
import {SvgXml} from 'react-native-svg';
import {arrowDropDown} from '../../assets/images/icons/arrow_drop_down';
import {arrowUp} from '../../assets/images/icons/arrow_drop_up';
import GoBack from '../../components/Navigation/GoBack';
import {searchProduct} from '../../api/auth_routes';
import {
  addToCart,
  decrementItem,
  incrementItem,
  removeItem,
} from '../../redux/slices/actions';
import {SkeletonProductDetails} from '../../components/Skeleton/SkeletonProductDetails';
import PeopleAlsoBought from '../../components/productCard/PeopleAlsoBought';
import SimilarProductHorizontalScroll from '../../components/productCard/SimilarProducts';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {setNetworkStatus} from '../../redux/slices/networkSlice.ts';

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

const ProductDetails: FC<{Close: () => void}> = ({Close, route}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation();
  const productName = route.params.productName;
  const [selProduct, setSelProduct] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [subCat2, setSubCat2] = useState('');
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedUnit, setSelectedUnit] = useState<number>(0);
  const [viewMoreDetails, setViewMoreDetails] = useState<boolean>(false);
  const toast = useToast();
  const id = 'test-toast';
  const cartItems = useSelector((state: any) => state.cart.items);
  const cartItem = cartItems.find(
    (item: any) => selectedProduct && item.id === selectedProduct.id,
  );
  const [count, setCount] = useState(cartItem ? cartItem.quantity : 0);
  const [isButton1Visible, setIsButton1Visible] = useState(count === 0);
  const dispatch = useDispatch();
  const isConnected = useSelector(state => state.network.isConnected);

  useEffect(() => {
    fetchProductDetails();
  }, [productName, selProduct]);

  const fetchProductDetails = async () => {
    try {
      setProductDetails(null);
      setIsButton1Visible(true);
      setCount(0);
      if (selProduct) {
        const response = await searchProduct(selProduct);
        if (response.content) {
          const initialSelectedProduct = {...response.content[0]};
          initialSelectedProduct.varietyList = [
            response.content[0].varietyList[0],
          ];
          setSubCat2(response.content[0].subCategory2);

          setProductDetails(response.content[0]);
          setSelectedProduct(initialSelectedProduct);
          setSelectedImageUrl(
            response.content[0].varietyList[0].documentUrls[0],
          );
        }
      } else if (productName) {
        const response = await searchProduct(productName);
        if (response.content) {
          const initialSelectedProduct = {...response.content[0]};
          initialSelectedProduct.varietyList = [
            response.content[0].varietyList[0],
          ];
          setSubCat2(response.content[0].subCategory2);
          setProductDetails(response.content[0]);
          setSelectedProduct(initialSelectedProduct);
          setSelectedImageUrl(
            response.content[0].varietyList[0]?.documentUrls[0],
          );
          updateCount(initialSelectedProduct);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedUnit(0);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      updateCount(selectedProduct);
    }
  }, [selectedProduct, cartItems]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchProductDetails();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setNetworkStatus(state.isConnected));
      if (!isConnected) {
        toast.show('Please Check Your Internet Connection');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const updateCount = (product: any) => {
    const item = cartItems.find(
      (obj: any) => obj?.id === product?.varietyList[0]?.id,
    );
    if (item) {
      setCount(item.quantity);
      setIsButton1Visible(false);
    } else {
      setCount(0);
      setIsButton1Visible(true);
    }
  };

  const handleDecrease = () => {
    // const product = {
    //   ...selectedProduct,
    //   id: selectedProduct.varietyList[0].id,
    // };
    if (count === 1) {
      dispatch(removeItem(selectedProduct.varietyList[0].id));
      setCount(0);
    } else {
      dispatch(decrementItem(selectedProduct.varietyList[0].id));
      setCount(count - 1);
    }
  };

  const handleIncrease = () => {
    // const product = {...selectedProduct, id: selectedProduct.varietyList[0].id};
    if (count < selectedProduct.varietyList[0].quantity) {
      dispatch(incrementItem(selectedProduct.varietyList[0].id));
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

  const onPress = name => {
    setSelProduct(name);
  };

  const handleButtonPress = () => {
    setCount(1);
    const product = {...selectedProduct, id: selectedProduct.varietyList[0].id};
    product.quantity = 1;
    dispatch(addToCart(product));
    // setIsButton1Visible(false);
    // setShowCartButton(true);
  };

  const handleUnitSelection = (unitIndex: number) => {
    setSelectedUnit(unitIndex);
    const updatedProduct = {...productDetails};
    updatedProduct.varietyList = [productDetails.varietyList[unitIndex]];
    setSelectedProduct(updatedProduct);
    // setIsButton1Visible(true);
    // setCount(0);
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
          {borderColor: img.uri === selectedImageUrl ? '#F97316' : '#E5E7EB'},
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

  const aggregatedImageUrls = selectedProduct?.varietyList
    ?.map(variety => variety.documentUrls)
    .flat();

  // const navigateToCart = () => {
  //   navigation.navigate('Cart');
  // };

  return (
    <>
      {!productDetails ? (
        <SkeletonProductDetails />
      ) : (
        <>
          <View
            h={128}
            bgColor={'white'}
            flexDir={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            borderBottomWidth={1}
            borderBottomColor={'accent.100'}>
            <View
              flexDir={'row'}
              style={{gap: horizontalScale(8)}}
              alignItems={'center'}>
              <GoBack onPress={() => navigation.goBack()} />
              <Text
                fontFamily={'Inter_Medium'}
                fontSize={scaleFontSize(16)}
                lineHeight={19.36}
                letterSpacing={-0.04}
                color={'accent.800'}>
                {productName}
              </Text>
            </View>
          </View>
          <ScrollView
            style={{flex: 1}}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#F97316']}
              />
            }>
            <View style={styles.imageContainer}>
              {selectedProduct?.varietyList[0].discountPercent !== 0 && (
                <View style={styles.offPerContainer}>
                  <Text style={styles.percentageText}>
                    {/* {[productDetails.varietyList[0].value]} */}
                    {selectedProduct?.varietyList[0].discountPercent ||
                      productDetails?.varietyList[0].discountPercent}
                    %
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Inter_Bold',
                      color: 'white',
                      textAlign: 'center',
                      fontSize: scaleFontSize(20),
                      lineHeight: 24.2,
                      letterSpacing: -0.04,
                      marginTop: -verticalScale(2),
                    }}>
                    OFF
                  </Text>
                </View>
              )}

              <View style={{flex: 1, marginHorizontal: horizontalScale(40)}}>
                {selectedImageUrl && (
                  <View style={{height: 200, width: 200}}>
                    <Image
                      source={{uri: selectedImageUrl}}
                      style={{height: 220, width: 300}}
                      resizeMode="contain"
                    />
                  </View>
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
                  data={aggregatedImageUrls?.map(
                    (url: string, index: number) => ({id: index, image: url}),
                  )}
                  renderItem={({item}) => (
                    <AlternativeImage img={{uri: item.image}} id={item.id} />
                  )}
                  horizontal
                />
              </View>
            </View>
            {/* product details and other options */}
            <View
              style={{
                backgroundColor: '#FFFFFF',
                paddingBottom: verticalScale(40),
              }}>
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
                <Text style={styles.productName}>
                  {selProduct ? selProduct : productName}
                </Text>
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
                    numberOfLines={!viewMoreDetails ? 2 : 100}
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
              {/* added newly */}
              {/* <View
          style={{
            paddingHorizontal: horizontalScale(24),
            paddingVertical: verticalScale(8),
          }}>
          <Text style={styles.descriptionText}>Key Features</Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: scaleFontSize(14),
              color: '#6B7280',
              marginVertical: horizontalScale(5),
            }}>
            1. Lorem ipsum dolor sit amet consectetur. Senectus maecenas cursus
            id nunc turpis libero viverra amet.
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: scaleFontSize(14),
              color: '#6B7280',
              marginVertical: horizontalScale(5),
            }}>
            2. Egestas aliquam ut pretium aliquam vehicula nec suspendisse in.
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: scaleFontSize(14),
              color: '#6B7280',
              marginVertical: horizontalScale(5),
            }}>
            3. Leo suspendisse dui volutpat ornare montes id luctus. Placerat
            sollicitudin habitant urna aliquet.
          </Text>
        </View> */}
              {/* added newly */}
              <Pressable
                style={styles.viewMore}
                onPress={() => setViewMoreDetails(!viewMoreDetails)}>
                <Text style={styles.viewDetailsText}>
                  View{' '}
                  <Text style={styles.viewDetailsText}>
                    {viewMoreDetails ? 'less' : 'more'}
                  </Text>{' '}
                  details
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
              {/* {isButton1Visible ? (
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
              )} */}

              {/* products Listings */}
              <View
                style={{
                  paddingHorizontal: horizontalScale(24),
                  marginVertical: 5,
                }}>
                <Text style={styles.similarProductsText}>Similar Products</Text>
              </View>
              <View
                style={{
                  marginVertical: verticalScale(12),
                  paddingHorizontal: horizontalScale(5),
                }}>
                <SimilarProductHorizontalScroll
                  onPress={name => onPress(name)}
                  subCategory={productDetails.subCategory}
                />
              </View>
              <View
                style={{
                  paddingHorizontal: horizontalScale(24),
                  marginVertical: 5,
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
                <PeopleAlsoBought
                  onPress={name => onPress(name)}
                  subCategory={subCat2}
                />
              </View>
            </View>
          </ScrollView>
          {/* {count !== 0 && (
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
          )} */}
          <View shadow={5} style={styles.bottomLayoutContainer}>
            {selectedProduct && (
              <View style={{gap: 2}}>
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
                  width: horizontalScale(115),
                  height: verticalScale(45),
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
        </>
      )}
    </>
  );
};

export default ProductDetails;
