/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {FC, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Modal
} from 'react-native';
import {View, Text,} from 'native-base';
import {
  horizontalScale,
  verticalScale,
  scaleFontSize,
} from '../../assets/scaling';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';
import {SvgXml} from 'react-native-svg';
import {arrowDropDown} from '../../assets/images/icons/arrow_drop_down';
import {arrowUp} from '../../assets/images/icons/arrow_drop_up';
import {searchProduct} from '../../api/auth_routes';
import {useDispatch, useSelector} from 'react-redux';
import {Box, useToast} from 'native-base';
import {
  addToCart,
  decrementItem,
  incrementItem,
  removeItem,
} from '../../redux/slices/actions';
import {SkeletonProductDetails} from '../Skeleton/SkeletonProductDetails';
import PeopleAlsoBought from '../productCard/PeopleAlsoBought';
import SimilarProductHorizontalScroll from '../productCard/SimilarProducts';

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
  const [prodName, setProdName] = useState('');
  const [selProduct, setSelProduct] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<number>(0);
  const [viewMoreDetails, setViewMoreDetails] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const cartItems = useSelector((state: any) => state.cart.items);
  const cartItem = cartItems.find(
    (item: any) => selectedProduct && item.id === selectedProduct.id,
  );
  const [count, setCount] = useState(cartItem ? cartItem.quantity : 0);
  const [isButton1Visible, setIsButton1Visible] = useState(count === 0);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const id = 'test-toast';

  const [subCat2, setSubCat2] = useState('');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchProductDetails();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
          setProdName(response.content[0].name);
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
          setProdName(response.content[0].name);
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
      // setIsButton1Visible(true);
      setCount(0);
    } else {
      dispatch(decrementItem(selectedProduct.varietyList[0].id));
      setCount(count - 1);
    }
  };

  const handleIncrease = () => {
    // const product = {...selectedProduct, id: selectedProduct.varietyList[0].id};
    if (count < selectedProduct?.varietyList[0]?.quantity) {
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

  const handleButtonPress = () => {
    setCount(1);
    const product = {
      ...selectedProduct,
      id: selectedProduct.varietyList[0].id,
    };

    product.quantity = 1;
    dispatch(addToCart(product));

    // updateCount();
    // setIsButton1Visible(false);
    // setShowCartButton(true);
  };

  const onPress = name => {
    setSelProduct(name);
  };

  const handleUnitSelection = (unitIndex: number) => {
    setSelectedUnit(unitIndex);
    const updatedProduct = {...productDetails};
    updatedProduct.varietyList = [productDetails.varietyList[unitIndex]];
    setSelectedProduct(updatedProduct);
    // updateCount();
    // setVarietyId();
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

  const navigation = useNavigation();

  const navigateToCart = () => {
    Close();
    navigation.navigate('Cart');
  };

  const aggregatedImageUrls = selectedProduct?.varietyList
    ?.map(variety => variety.documentUrls)
    .flat();

  // console.log('sel', selectedProduct);
  // // console.log('pr', productDetails);
  // console.log('var', varietyId);

  return (
    <>
      {!productDetails ? (
        <SkeletonProductDetails />
      ) : (
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#F97316']}
              />
            }>
            <View style={styles.imageContainer}>
              
                <View style={[
                  styles.offPerContainer,
                  {
                    opacity: selectedProduct?.varietyList[0].discountPercent !== 0 ? 1 : 0,
                  },
                ]}>
                  <Text style={styles.percentageText}>
                    {selectedProduct?.varietyList[0].discountPercent ||
                      productDetails?.varietyList[0].discountPercent}
                    %
                  </Text>
                  <Text
                    style={[
                      styles.percentageText,
                      {fontSize: scaleFontSize(20), bottom: verticalScale(3)},
                    ]}>
                    OFF
                  </Text>
                </View>
              
              <View style={{flex: 1, marginHorizontal: horizontalScale(40)}}>
                {selectedImageUrl && (
                  <View style={{height: 200, width: 200}}>
                    <Pressable
          onPress={() => setModalVisible(true)}>
                    <Image
                      source={{uri: selectedImageUrl}}
                      style={{height: 240, width: 300}}
                      resizeMode="contain"
                    />
                    </Pressable>
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
                {/* {selProduct ? <Text style={styles.productName}>{productName}</Text>} */}
                <Text style={styles.productName}>{prodName}</Text>
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
                <SimilarProductHorizontalScroll
                  onPress={name => {
                    onPress(name);
                  }}
                  subCategory={productDetails.subCategory}
                />
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
                <PeopleAlsoBought
                  onPress={name => onPress(name)}
                  subCategory={subCat2}
                />
              </View>
            </View>
          </ScrollView>
          {/* Bottom Layout Container */}
          <View shadow={5} style={styles.bottomLayoutContainer}>
            {selectedProduct && (
              <View style={{gap: 2, marginBottom: verticalScale(5)}}>
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
          {/* <Pressable > */}
          {!isButton1Visible && (
            <Pressable style={styles.floatingButton} onPress={navigateToCart}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 3,
                }}>
                <Image
                  source={require('../../assets/images/icons/cart-white.png')}
                  style={{height: 26, width: 26}}
                />
                <Text style={styles.floatingButtonText}>{count} item</Text>
              </View>
            </Pressable>
          )}
          <Modal
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalBackground}>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.modalCloseButton}>
                <Text  color={'primary.50'}
                  fontFamily={'Inter_Medium'}
                  fontSize={scaleFontSize(14)}
                  lineHeight={19.38}
                  letterSpacing={-0.04}>Close</Text>
              </Pressable>
              <Image
                source={{uri: selectedImageUrl}}
                style={styles.modalImage}
                resizeMode="contain"
              />
            </View>
          </Modal>
          {/* </Pressable> */}
        </View>
      )}
    </>
  );
};

export default ProductDetails;
