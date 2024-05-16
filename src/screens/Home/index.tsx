import React, {useEffect, useState} from 'react';
import style from './style';
import {
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  Alert,
  Dimensions,
} from 'react-native';
import ProductCard from '../../components/productCard/ProductCard';
import ImageCarousel from '../../components/Carousel/ImageCarousel';
import Header from '../../components/Header';
import {Colors} from '../../constants/colors';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import Makelist from '../../components/Carousel/Makelist';
import SearchInput from '../../components/SearchInput';
import CategoryData from '../../assets/data/CategoriesData';
import ProductHorizontalScroll from '../../components/productCard/ProductHorizontalScroll';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import {AuthAPIClient} from '../../api/axios.config';
import {Categories} from '../../constants/categories';
import {View, Text} from 'native-base';
type Props = {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Home'>;
};
const Home: React.FC<Props> = ({navigation}) => {
  const [searchInp, SetsearchInp] = useState('');
  const [overLay, setOverLay] = useState('Product-List');
  // const openDrawer = () => {
  //   navigation.openDrawer();
  // };

  const openSettings = () => {
    navigation.navigate('Settings');
  };
  const gotoCart = () => {
    navigation.navigate('Cart');
  };

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };
  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const listToDetails = () => {
    setOverLay('Product-Details');
    openBottomSheet();
  };

  const seeAll = () => {
    setOverLay('Product-List');
    openBottomSheet();
  };

  const gotoSearch = () => {
    navigation.navigate('Search');
  };

  const {width, height} = Dimensions.get('window');
  // console.log(width,height)
  return (
    <View style={style.container}>
      {/* <Pressable onPress={openDrawer}>
        <Text>Open Settings</Text>
      </Pressable> */}
      <Header onSettingsPress={openSettings} onCartPress={gotoCart} />
      <SearchInput
        onChangeText={SetsearchInp}
        value={searchInp}
        placeholder="Search “Bread” "
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
            <Text style={style.CategoryText}>Freshly Picked up for you!</Text>
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

        <ProductHorizontalScroll onPress={listToDetails} />

        {/* <View style={{alignSelf: 'center', margin: 5}}>
          <Image
            source={require('../../assets/images/icons/SendList.png')}></Image>
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
            onPress={() => {}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{color: 'white', marginHorizontal: horizontalScale(5)}}>
                Uplaod Your Shopping List
              </Text>
              <Image
                source={require('../../assets/images/icons/CameraIcon.png')}
              />
            </View>
          </TouchableOpacity>
        </View> */}
        <View style={{marginHorizontal: horizontalScale(18)}}>
          <Text style={[style.CategoryText, {marginBottom: 15}]}>
            Grocery & Kitchen
          </Text>
          {Categories['Grocery & Kitchen'].map((subCategory, ind) => {
            let index = ind + 1;
            if (index % 4 === 0) {
              const endIndex = Math.min(index, Math.ceil(index / 4) * 4);
              const currentSlice = Categories['Grocery & Kitchen'].slice(
                endIndex - 4,
                endIndex,
              );
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  {currentSlice.map((item, subIndex) => (
                    <Pressable
                      key={subIndex}
                      onPress={() => {
                        navigation.navigate('CategoryProducts', {
                          SubCategory: item,
                        });
                      }}>
                      {/* <Image
                        key={subIndex}
                        source={{uri: item.image}}
                        style={{width: 100, height: 150}}
                      /> */}
                      <View
                        alignItems={'center'}
                        w={horizontalScale(90)}
                        h={verticalScale(110)}
                        style={{gap: 9}}>
                        <View
                          w={horizontalScale(70)}
                          h={verticalScale(65)}
                          borderRadius={16}
                          bgColor={'primary.50'}
                        />
                        <Text
                          fontFamily={'Inter_Medium'}
                          fontSize={scaleFontSize(12)}
                          lineHeight={14.52}
                          letterSpacing={-0.04}
                          color={'accent.600'}
                          textAlign={'center'}
                          mx={horizontalScale(5)}>
                          {item}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              );
            } else {
              return null;
            }
          })}
        </View>
        <View style={{marginHorizontal: horizontalScale(18)}}>
          <Text style={[style.CategoryText, {marginBottom: verticalScale(15)}]}>
            Snacks & Drinks
          </Text>
          {Categories['Snacks & Kitchen'].map((subCategory, ind) => {
            let index = ind + 1;
            if (index % 4 === 0) {
              const endIndex = Math.min(index, Math.ceil(index / 4) * 4);
              const currentSlice = Categories['Snacks & Kitchen'].slice(
                endIndex - 4,
                endIndex,
              );
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  {currentSlice.map((item, subIndex) => (
                    <Pressable
                      key={subIndex}
                      onPress={() => {
                        navigation.navigate('CategoryProducts', {
                          SubCategory: item,
                        });
                      }}>
                      {/* <Image
                      key={subIndex}
                      source={{uri: item.image}}
                      style={{width: 100, height: 150}}
                    /> */}
                      <View
                        alignItems={'center'}
                        w={horizontalScale(90)}
                        h={verticalScale(110)}
                        style={{gap: 9}}>
                        <View
                          w={horizontalScale(70)}
                          h={verticalScale(65)}
                          borderRadius={16}
                          bgColor={'primary.50'}
                        />
                        <Text
                          fontFamily={'Inter_Medium'}
                          fontSize={scaleFontSize(12)}
                          lineHeight={14.52}
                          letterSpacing={-0.04}
                          color={'accent.600'}
                          textAlign={'center'}
                          mx={horizontalScale(5)}>
                          {item}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              );
            } else {
              return null;
            }
          })}
        </View>
        <View style={{marginHorizontal: horizontalScale(18)}}>
          <Text style={[style.CategoryText, {marginBottom: 15}]}>
            Beauty & Personal Care
          </Text>
          {Categories['Beauty & Personal Care'].map((subCategory, ind) => {
            let index = ind + 1;
            if (index % 4 === 0) {
              const endIndex = Math.min(index, Math.ceil(index / 4) * 4);
              const currentSlice = Categories['Beauty & Personal Care'].slice(
                endIndex - 4,
                endIndex,
              );
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  {currentSlice.map((item, subIndex) => (
                    <Pressable
                      key={subIndex}
                      onPress={() => {
                        navigation.navigate('CategoryProducts', {
                          SubCategory: item,
                        });
                      }}>
                      {/* <Image
                    key={subIndex}
                    source={{uri: item.image}}
                    style={{width: 100, height: 150}}
                  /> */}
                      <View
                        alignItems={'center'}
                        w={horizontalScale(90)}
                        h={verticalScale(110)}
                        style={{gap: 9}}>
                        <View
                          w={horizontalScale(70)}
                          h={verticalScale(65)}
                          borderRadius={16}
                          bgColor={'primary.50'}
                        />
                        <Text
                          fontFamily={'Inter_Medium'}
                          fontSize={scaleFontSize(12)}
                          lineHeight={14.52}
                          letterSpacing={-0.04}
                          color={'accent.600'}
                          textAlign={'center'}
                          mx={horizontalScale(5)}>
                          {item}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              );
            } else {
              return null;
            }
          })}
        </View>
        <View style={{marginHorizontal: horizontalScale(18)}}>
          <Text style={[style.CategoryText, {marginBottom: 15}]}>
            Household Essentials
          </Text>
          {Categories['Household Essentials'].map((subCategory, ind) => {
            let index = ind + 1;
            if (index % 4 === 0) {
              const endIndex = Math.min(index, Math.ceil(index / 4) * 4);
              const currentSlice = Categories['Household Essentials'].slice(
                endIndex - 4,
                endIndex,
              );
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  {currentSlice.map((item, subIndex) => (
                    <Pressable
                      key={subIndex}
                      onPress={() => {
                        navigation.navigate('CategoryProducts', {
                          SubCategory: item,
                        });
                      }}>
                      {/* <Image
                  key={subIndex}
                  source={{uri: item.image}}
                  style={{width: 100, height: 150}}
                /> */}
                      <View
                        alignItems={'center'}
                        w={horizontalScale(90)}
                        h={verticalScale(100)}
                        style={{gap: 9}}>
                        <View
                          w={horizontalScale(70)}
                          h={verticalScale(65)}
                          borderRadius={16}
                          bgColor={'primary.50'}
                        />
                        <Text
                          fontFamily={'Inter_Medium'}
                          fontSize={scaleFontSize(12)}
                          lineHeight={14.52}
                          letterSpacing={-0.04}
                          color={'accent.600'}
                          textAlign={'center'}
                          mx={horizontalScale(5)}>
                          {item}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              );
            } else {
              return null;
            }
          })}
        </View>
        <View
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
        <ProductHorizontalScroll onPress={listToDetails} />
        <View style={{marginHorizontal: horizontalScale(18)}}>
          <Text style={[style.CategoryText]}>Explore New Categories</Text>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={style.ExploreCatgories}>
              <Image
                style={{
                  height: width < 380 ? 75 : 83,
                  width: width < 380 ? 77 : 85,
                }}
                source={require('../../assets/images/Newcategories/ExploreCategories1.jpg')}></Image>
              <Text style={style.ExploreCatgoriesText}>Baby Care</Text>
            </View>
            <View style={style.ExploreCatgories}>
              <Image
                style={{
                  height: width < 380 ? 75 : 83,
                  width: width < 380 ? 77 : 85,
                }}
                source={require('../../assets/images/Newcategories/ExploreCategories2.jpg')}></Image>
              <Text style={style.ExploreCatgoriesText}>Gift Store</Text>
            </View>
            <View style={style.ExploreCatgories}>
              <Image
                style={{
                  height: width < 380 ? 75 : 83,
                  width: width < 380 ? 77 : 85,
                }}
                source={require('../../assets/images/Newcategories/ExploreCategories3.jpg')}></Image>
              <Text style={style.ExploreCatgoriesText}>Party Essentials</Text>
            </View>
            <View style={style.ExploreCatgories}>
              <Image
                style={{
                  height: width < 380 ? 75 : 83,
                  width: width < 380 ? 77 : 85,
                }}
                source={require('../../assets/images/Newcategories/ExploreCategories4.jpg')}></Image>
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
        onPress={listToDetails}
      />
    </View>
  );
};

export default Home;
