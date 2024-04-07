import React, {useState} from 'react';
import style from './style';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import ProductCard from '../../components/productCard/ProductCard';
import ImageCarousel from '../../components/Carousel/ImageCarousel';
import Header from '../../components/Header';
import {Colors} from '../../constants/colors';
import {horizontalScale, scaleFontSize} from '../../assets/scaling';
import Makelist from '../../components/Carousel/Makelist';
import SearchInput from '../../components/SearchInput';
import CategoryData from '../../assets/data/CategoriesData';

const Home: React.FC = () => {
  const [searchInp, SetsearchInp] = useState('');
  // const openDrawer = () => {
  //   navigation.openDrawer();
  // };

  return (
    <View style={style.container}>
      {/* <Pressable onPress={openDrawer}>
        <Text>Open Settings</Text>
      </Pressable> */}
      <Header />
      <SearchInput
        onChangeText={SetsearchInp}
        value={searchInp}
        placeholder="Search “Bread” "
      />
      <ScrollView>
        <ImageCarousel />
        {/* <Makelist /> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 18,
          }}>
          <View style={style.Category}>
            <Text style={style.CategoryText}>Freshly Picked up for you!</Text>
            <Text style={style.SubCategoryText}>
              get your health on line :)
            </Text>
          </View>
          <TouchableOpacity>
            <Text
              style={{
                color: '#22C55E',
                fontSize: scaleFontSize(16),
                marginRight: horizontalScale(18),
                marginTop: 35,
              }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <ProductCard onPress={() => {}} />
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
          {CategoryData.map(data => {
            let index = data.id;
            if (index % 4 === 0) {
              const endIndex = Math.min(index, Math.ceil(index / 4) * 4);
              const currentSlice = CategoryData.slice(endIndex - 4, endIndex);
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  {currentSlice.map((item, subIndex) => (
                    <Image
                      key={subIndex}
                      source={{uri: item.image}}
                      style={{width: 100, height: 150}}
                    />
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
            Snacks & Drinks
          </Text>
          {CategoryData.map(data => {
            let index = data.id;
            if (index % 4 === 0) {
              const endIndex = Math.min(index, Math.ceil(index / 4) * 4);
              const currentSlice = CategoryData.slice(endIndex - 4, endIndex);
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  {currentSlice.map((item, subIndex) => (
                    <Image
                      key={subIndex}
                      source={{uri: item.image}}
                      style={{width: 100, height: 150}}
                    />
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
          {CategoryData.map(data => {
            let index = data.id;
            if (index % 4 === 0) {
              const endIndex = Math.min(index, Math.ceil(index / 4) * 4);
              const currentSlice = CategoryData.slice(endIndex - 4, endIndex);
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  {currentSlice.map((item, subIndex) => (
                    <Image
                      key={subIndex}
                      source={{uri: item.image}}
                      style={{width: 100, height: 150}}
                    />
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
          {CategoryData.map(data => {
            let index = data.id;
            if (index % 4 === 0) {
              const endIndex = Math.min(index, Math.ceil(index / 4) * 4);
              const currentSlice = CategoryData.slice(endIndex - 4, endIndex);
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  {currentSlice.map((item, subIndex) => (
                    <Image
                      key={subIndex}
                      source={{uri: item.image}}
                      style={{width: 100, height: 150}}
                    />
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
            marginBottom: 18,
          }}>
          <View style={style.Category}>
            <Text style={style.CategoryText}>Freshly Picked For You!</Text>
            <Text>get your health on line :)</Text>
          </View>
          <TouchableOpacity>
            <Text
              style={{
                color: '#22C55E',
                fontSize: scaleFontSize(16),
                marginRight: horizontalScale(18),
                marginTop: 35,
              }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <ProductCard onPress={() => {}} />
        <View style={{marginHorizontal: horizontalScale(18)}}>
          <Text style={[style.CategoryText]}>Explore New Categories</Text>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={style.ExploreCatgories}>
              <Image style={{height:80,width:75}}
                source={require('../../assets/images/Newcategories/ExploreCategories1.jpg')}></Image>
              <Text style={style.ExploreCatgoriesText}>Baby Care</Text>
            </View>
            <View style={style.ExploreCatgories}>
              <Image style={{height:80,width:75}}
                source={require('../../assets/images/Newcategories/ExploreCategories2.jpg')}></Image>
              <Text style={style.ExploreCatgoriesText}>Gift Store</Text>
            </View>
            <View style={style.ExploreCatgories}>
              <Image style={{height:80,width:75}}
                source={require('../../assets/images/Newcategories/ExploreCategories3.jpg')}></Image>
              <Text style={style.ExploreCatgoriesText}>
                Party Essentials
              </Text>
            </View>
            <View style={style.ExploreCatgories}>
              <Image style={{height:80,width:75}}
                source={require('../../assets/images/Newcategories/ExploreCategories4.jpg')}></Image>
              <Text
                style={style.ExploreCatgoriesText}>
                Kitchen needs
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={style.floatingButton}>
        <Image
          source={require('../../assets/images/icons/Categories.png')} // Replace with your image path
          style={style.buttonImage}
        />
      </View>
    </View>
  );
};

export default Home;
