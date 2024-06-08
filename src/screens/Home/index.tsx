/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import style from './style';
import {
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectConnectionStatus,
  setConnectionStatus,
} from '../../redux/slices/networkSlice.ts';
import NetInfo from '@react-native-community/netinfo';
import {RootState} from '../../redux/store.ts';

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
import {toast} from '../../components/Toast/Toast.ts';
type Props = {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Home'>;
};
const Home: React.FC<Props> = ({navigation}) => {
  const [searchInp, SetsearchInp] = useState('');
  const [overLay, setOverLay] = useState('Product-List');
  const [name, setName] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const openDrawer = () => {
  //   navigation.openDrawer();
  // };

  const isInternetReachable = useSelector((state: RootState) =>
    selectConnectionStatus(state),
  );
  const dispatch = useDispatch();

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

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setConnectionStatus(state.isInternetReachable));
      if (!state.isInternetReachable) {
        // console.log(state.isInternetReachable);
        toast.showToast('Please Check Your Internet connection');
      } else {
        fetchUser();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const openSettings = () => {
    navigation.navigate('Settings', {userDetails: userDetails});
  };
  const gotoCart = () => {
    navigation.navigate('Cart');
  };

  const [selectedProduct, setSelectedProduct] = useState('');
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
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
  // console.log(width,height)
  return (
    <>
      {isLoading ? (
        <View flex={1} alignItems={'center'} justifyContent={'center'}>
          <Image
            source={require('../../assets/images/icons/loading.gif')}
            style={{height: 200, width: 200}}
          />
        </View>
      ) : (
        <View style={style.container}>
          {/* <Pressable onPress={openDrawer}>
        <Text>Open Settings</Text>
      </Pressable> */}
          <Header
            name={name}
            onSettingsPress={openSettings}
            onCartPress={gotoCart}
          />
          <SearchInput
            onChangeText={SetsearchInp}
            value={searchInp}
            placeholder='Search "Bread" '
            onPress={gotoSearch}
            editable={false}
            width={90}
          />
          <ScrollView>
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
            <ProductHorizontalScroll onPress={item => listToDetails(item)} />
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
                    {category.subCategory.map((subCategory, subIndex) => (
                      <Pressable
                        key={subIndex}
                        onPress={() => {
                          navigation.navigate('CategoryProducts', {
                            SubCategory: subCategory.name,
                            categoryIndex: catIndex,
                            subCategoryIndex: subIndex,
                          });
                        }}
                        style={{
                          width:
                            (width - 2 * horizontalScale(20)) / 4 -
                            horizontalScale(10),
                        }}>
                        <View alignItems={'center'} style={{gap: 9}}>
                          <Image
                            source={subCategory.image}
                            borderRadius={16}
                            style={{
                              width: horizontalScale(70),
                              height: verticalScale(65),
                            }}
                          />
                          <Text
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
                    ))}
                  </View>
                </View>
              ))}

            <View style={{alignSelf: 'center', margin: 5}}>
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
                }}
                onPress={() => openWhatsApp('Hi', '1234567890')}>
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
            {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: verticalScale(15),
          }}>
          <View style={style.Category}>
            <Text style={style.CategoryText}>Freshly Picked For You!</Text>
            <Text>get your health on line :)</Text>
          </View>
          <Pressable onPress={seeAll}>
            <Text
              style={{
                color: '#22C55E',
                fontSize: scaleFontSize(16),
                marginRight: horizontalScale(18),
                marginTop: verticalScale(25),
              }}>
              See all
            </Text>
          </Pressable>
        </View>
        <ProductHorizontalScroll onPress={listToDetails} /> */}
            <View style={{marginHorizontal: horizontalScale(18)}}>
              <Text style={[style.CategoryText]}>Explore New Categories</Text>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <View style={style.ExploreCatgories}>
                  <Image
                    style={{
                      height: width < 380 ? 75 : 83,
                      width: width < 380 ? 77 : 85,
                    }}
                    source={require('../../assets/images/Newcategories/ExploreCategories1.jpg')}
                  />
                  <Text style={style.ExploreCatgoriesText}>Baby Care</Text>
                </View>
                <View style={style.ExploreCatgories}>
                  <Image
                    style={{
                      height: width < 380 ? 75 : 83,
                      width: width < 380 ? 77 : 85,
                    }}
                    source={require('../../assets/images/Newcategories/ExploreCategories2.jpg')}
                  />
                  <Text style={style.ExploreCatgoriesText}>Gift Store</Text>
                </View>
                <View style={style.ExploreCatgories}>
                  <Image
                    style={{
                      height: width < 380 ? 75 : 83,
                      width: width < 380 ? 77 : 85,
                    }}
                    source={require('../../assets/images/Newcategories/ExploreCategories3.jpg')}
                  />
                  <Text style={style.ExploreCatgoriesText}>
                    Party Essentials
                  </Text>
                </View>
                <View style={style.ExploreCatgories}>
                  <Image
                    style={{
                      height: width < 380 ? 75 : 83,
                      width: width < 380 ? 77 : 85,
                    }}
                    source={require('../../assets/images/Newcategories/ExploreCategories4.jpg')}
                  />
                  <Text style={style.ExploreCatgoriesText}>Kitchen needs</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={style.floatingButton}>
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
