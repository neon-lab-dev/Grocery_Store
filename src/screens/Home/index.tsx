/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import style from './style';
import {
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
  RefreshControl,
} from 'react-native';
import ImageCarousel from '../../components/Carousel/ImageCarousel';
import Header from '../../components/Header';
import {Colors} from '../../constants/colors';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import SearchInput from '../../components/SearchInput';
import ProductHorizontalScroll from '../../components/productCard/ProductHorizontalScroll';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import {Categories} from '../../constants/categories';
import {View, Text} from 'native-base';
import {fetchUserData} from '../../api/auth_routes';
import {openWhatsApp} from '../../utils/launchIntents';
import {REACT_APP_PHONE_NO} from '@env';
import {SkeletonHome} from '../../components/Skeleton/SkeletonHome';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {setNetworkStatus} from '../../redux/slices/networkSlice.ts'; // Import the action
import {toast} from '../../components/Toast/Toast';

type Props = {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Home'>;
};

const Home: React.FC<Props> = ({navigation}) => {
  const childRef = useRef();
  const [refreshing, setRefreshing] = React.useState(false);
  const [searchInp, SetsearchInp] = useState('');
  const [overLay, setOverLay] = useState('Product-List');
  const [name, setName] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isConnected = useSelector(state => state.network.isConnected);

  const [selectedProduct, setSelectedProduct] = useState('');
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetchUserData();
      if (response.responseBody && response.responseBody.name) {
        const nameArr = response.responseBody.name.split(' ');
        const firstName = nameArr[0];
        setName(firstName);
        setUserDetails(response.responseBody);
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchUser();
    childRef.current.childFunction();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setNetworkStatus(state.isConnected));

      if (isConnected) {
        fetchUser();
      } else {
        toast.showToast('Please Check Your Internet Connection');
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch, isConnected]);

  const openSettings = () => {
    navigation.navigate('Settings', {userDetails: userDetails});
  };
  const gotoCart = () => {
    navigation.navigate('Cart');
  };

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };
  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const listToDetails = (productName: string) => {
    setOverLay('Product-Details');
    setSelectedProduct(productName);
    openBottomSheet();
  };

  const seeAll = () => {
    setOverLay('Product-List');
    openBottomSheet();
  };

  const gotoSearch = () => {
    navigation.navigate('Search');
  };

  const {width} = Dimensions.get('window');
  return (
    <>
      {isLoading ? (
        <View flex={1} alignItems={'center'} justifyContent={'center'}>
          <SkeletonHome />
        </View>
      ) : (
        <View style={style.container}>
          <Header
            name={name}
            onSettingsPress={openSettings}
            onCartPress={gotoCart}
          />
          <SearchInput
            onChangeText={SetsearchInp}
            value={searchInp}
            placeholder="Search “Bread” "
            onPress={gotoSearch}
            editable={false}
            width={90}
          />
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['red']}
              />
            }>
            <ImageCarousel />
            {/* <Makelist /> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: verticalScale(15),
              }}>
              <View style={style.Category}>
                <Text style={style.CategoryText}>
                  Freshly Picked up for you!
                </Text>
                <Text style={style.SubCategoryText}>
                  get your health on line :)
                </Text>
              </View>

              <Pressable onPress={seeAll}>
                <Text
                  style={{
                    fontFamily: 'Inter_Medium',
                    color: '#22C55E',
                    fontSize: scaleFontSize(16),
                    marginRight: horizontalScale(18),
                    marginTop: verticalScale(25),
                  }}>
                  See all
                </Text>
              </Pressable>
            </View>
            <ProductHorizontalScroll
              onPress={item => listToDetails(item)}
              ref={childRef}
            />
            {Categories.length > 0 &&
              Categories.map((category, catIndex) => (
                <View
                  key={catIndex}
                  px={horizontalScale(20)}
                  mt={verticalScale(20)}
                  style={{gap: verticalScale(20)}}>
                  <Text
                    fontFamily={'Inter_SemiBold'}
                    fontSize={scaleFontSize(20)}
                    lineHeight={24.2}
                    letterSpacing={-0.05}
                    color={'accent.700'}>
                    {category.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: horizontalScale(13),
                    }}>
                    {category.subCategory.map((subCategory, subIndex) => {
                      const doubleWidthCategories = [
                        'Kitchenware & Appliances',
                        'Paan Corner',
                        'Health & Pharma',
                        'Cleaners & Repellents',
                        'Stationary & Games',
                      ];
                      const isDoubleWidth = doubleWidthCategories.includes(
                        subCategory.name,
                      );

                      return (
                        <Pressable
                          key={subIndex}
                          onPress={() => {
                            navigation.navigate('CategoryProducts', {
                              categoryName: category.name,
                              SubCategory: subCategory.name,
                              categoryIndex: catIndex,
                              subCategoryIndex: subIndex,
                            });
                          }}
                          style={{
                            width: isDoubleWidth
                              ? (width - 2 * horizontalScale(20)) / 2 -
                                horizontalScale(10)
                              : (width - 2 * horizontalScale(20)) / 4 -
                                horizontalScale(10),
                          }}>
                          <View alignItems={'center'} style={{gap: 9}}>
                            <Image
                              source={subCategory.image}
                              borderRadius={16}
                              style={{
                                width: isDoubleWidth
                                  ? horizontalScale(140)
                                  : horizontalScale(70),
                                height: isDoubleWidth
                                  ? verticalScale(65)
                                  : verticalScale(65),
                              }}
                            />
                            <Text
                              alignSelf={'center'}
                              fontFamily={'Inter_Medium'}
                              fontSize={scaleFontSize(12)}
                              lineHeight={14.52}
                              letterSpacing={-0.04}
                              color={'accent.600'}
                              textAlign={'center'}>
                              {subCategory.name}
                            </Text>
                          </View>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              ))}

            <View
              style={{
                alignSelf: 'center',
                marginTop: verticalScale(15),
                marginHorizontal: horizontalScale(10),
              }}>
              <Image
                source={require('../../assets/images/icons/SendList.png')}
              />
              <TouchableOpacity
                style={{
                  width: horizontalScale(300),
                  height: 50,
                  margin: 5,
                  borderRadius: 20,
                  alignSelf: 'center',
                  backgroundColor: Colors.primary[500],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: horizontalScale(20),
                }}
                onPress={() => openWhatsApp('Hi', REACT_APP_PHONE_NO)}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: 'white',
                      marginHorizontal: horizontalScale(5),
                      fontFamily: 'Inter_Medium',
                      fontSize: scaleFontSize(14),
                      lineHeight: 16.94,
                      letterSpacing: -0.04,
                    }}>
                    Upload Your Shopping List
                  </Text>
                  <Image
                    source={require('../../assets/images/icons/CameraIcon.png')}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={style.floatingButton} shadow={5}>
            <Pressable
              onPress={() => {
                navigation.navigate('Categories');
              }}>
              <Image
                source={require('../../assets/images/icons/Categories.png')}
                style={style.buttonImage}
              />
            </Pressable>
          </View>
          <BottomSheet
            visible={bottomSheetVisible}
            onClose={closeBottomSheet}
            type={overLay}
            productName={selectedProduct}
            onPress={product => listToDetails(product)}
          />
        </View>
      )}
    </>
  );
};

export default Home;
