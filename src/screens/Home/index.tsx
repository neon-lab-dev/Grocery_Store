import React, { useEffect, useRef, useState } from 'react';
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
import { Colors } from '../../constants/colors';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import SearchInput from '../../components/SearchInput';
import ProductHorizontalScroll from '../../components/productCard/ProductHorizontalScroll';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorParamList } from '../../navigation/MainNavigation';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import { Categories } from '../../constants/categories';
import { View, Text } from 'native-base';
import { fetchUserData } from '../../api/auth_routes';
import { openWhatsApp } from '../../utils/launchIntents';
import { REACT_APP_PHONE_NO } from '@env';
import { SkeletonHome } from '../../components/Skeleton/SkeletonHome';
import NetInfo from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { setNetworkStatus } from '../../redux/slices/networkSlice.ts'; // Import the action
import { toast } from '../../components/Toast/Toast';

type Props = {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Home'>;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const childRef = useRef();
  const scrollViewRef = useRef(null); // Define the scrollViewRef here
  const whatsAppImageRef = useRef(null); // Define the ref here
  const [refreshing, setRefreshing] = useState(false);
  const [searchInp, SetsearchInp] = useState('');
  const [overLay, setOverLay] = useState('Product-List');
  const [name, setName] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.network.isConnected);

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
    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch(setNetworkStatus(state.isConnected));

      if (state.isConnected) {
        fetchUser();
      } else {
        toast.showToast('Please Check Your Internet Connection');
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const openSettings = () => {
    navigation.navigate('Settings', { userDetails: userDetails });
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

  const onPressCarousel = (id: number) => {
    if (id === 2) {
      seeAll();
    }
    if (id === 3) {
      scrollToWhatsAppImage();
    }
  };

  const scrollToWhatsAppImage = () => {
    if (whatsAppImageRef.current) {
      whatsAppImageRef.current.measure((fx, fy, width, height, px, py) => {
        scrollViewRef.current.scrollTo({ y: py, animated: true });
      });
    }
  };

  const gotoSearch = () => {
    navigation.navigate('Search');
  };

  const { width } = Dimensions.get('window');

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
            ref={scrollViewRef} // Assign the ref here
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['red']}
              />
            }>
            <ImageCarousel onImagePress={onPressCarousel} />
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
              onPress={(item) => listToDetails(item)}
              ref={childRef}
            />
            {Categories.length > 0 &&
              Categories.map((category, catIndex) => (
                <View
                  key={catIndex}
                  px={horizontalScale(20)}
                  mt={verticalScale(20)}
                  style={{ gap: verticalScale(20) }}>
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
                        subCategory.name
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
                          <View
                            alignItems={'center'}
                            style={{ gap: 9 }}>
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
              }}
              ref={whatsAppImageRef}>
              <TouchableOpacity
                onPress={() =>
                  openWhatsApp('Hi', REACT_APP_PHONE_NO)
                }>
                <Image
                  style={{
                    alignSelf: 'center',
                    height: verticalScale(190),
                    width: horizontalScale(290),
                  }}
                  source={require('../../assets/images/icons/SendListWhatapp.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: horizontalScale(300),
                  height: 50,
                  marginTop: verticalScale(10),
                  backgroundColor: Colors.primary,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => openWhatsApp('Hi', REACT_APP_PHONE_NO)}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: scaleFontSize(16),
                    fontFamily: 'Inter_Medium',
                  }}>
                  Chat on WhatsApp
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
      <BottomSheet
        visible={bottomSheetVisible}
        onClose={closeBottomSheet}
        overLay={overLay}
        selectedProduct={selectedProduct}
      />
    </>
  );
};

export default Home;
