import React, { useState } from 'react';
import style from './style';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import ProductCard from '../../components/productCard/ProductCard';
import ImageCarousel from '../../components/Carousel/ImageCarousel';
import Header from '../../components/Header';
import {Colors} from '../../constants/colors';
import {horizontalScale, scaleFontSize} from '../../assets/scaling';
import Makelist from '../../components/Carousel/Makelist';
import ProductData from '../../assets/data/ProductData';
import SearchInput from '../../components/SearchInput';

const Home: React.FC= () => {
  const [searchInp,SetsearchInp]=useState("")
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
      placeholder="Search “Bread” "/>
      <ScrollView>
        <ImageCarousel />
        <Makelist />
        <View style={{flexDirection: 'row', justifyContent: 'space-between' ,margin:5}}>
          <View>
            <Text style={style.CategoryText}>Freshly Picked For You!</Text>
            <Text>get your health on line :)</Text>
          </View>
          <TouchableOpacity>
            <Text
              style={{
                color: Colors.success[400],
                margin: 5,
                fontSize: scaleFontSize(17),
              }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <ProductCard onPress={() => {}} />
        <View style={{alignSelf: 'center', margin: 5}}>
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
        </View>
        <View  style={{alignSelf: 'center', margin: 5}}>
        <Text style={style.CategoryText}>Grocery & Kitchen</Text>
        {ProductData.map(data => {
          let index = data.id;
          if (index % 4 === 0) {
            const endIndex = Math.min(index, Math.ceil(index / 4) * 4);
            const currentSlice = ProductData.slice(endIndex - 4, endIndex);
            return (
              <View
                key={index}
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
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
        <View  style={{alignSelf: 'center', margin: 5}}>
        <Text style={style.CategoryText}>Snacks & Drinks</Text>
        {ProductData.map(data => {
          let index = data.id;
          if (index % 4 === 0) {
            const endIndex = Math.min(index, Math.ceil(index / 4) * 4);
            const currentSlice = ProductData.slice(endIndex - 4, endIndex);
            return (
              <View
                key={index}
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
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
        <View  style={{alignSelf: 'center', margin: 5}}>
        <Text style={style.CategoryText}>Beauty & Personal Care</Text>
        {ProductData.map(data => {
          let index = data.id;
          if (index % 4 === 0) {
            const endIndex = Math.min(index, Math.ceil(index / 4) * 4);
            const currentSlice = ProductData.slice(endIndex - 4, endIndex);
            return (
              <View
                key={index}
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
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
        <View  style={{alignSelf: 'center', margin: 5}}>
        <Text style={style.CategoryText}>Household Essentials</Text>
        {ProductData.map(data => {
          let index = data.id;
          if (index % 4 === 0) {
            const endIndex = Math.min(index, Math.ceil(index / 4) * 4);
            const currentSlice = ProductData.slice(endIndex - 4, endIndex);
            return (
              <View
                key={index}
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between' ,margin:5}}>
          <View>
            <Text style={style.CategoryText}>Freshly Picked For You!</Text>
            <Text>get your health on line :)</Text>
          </View>
          <TouchableOpacity>
            <Text
              style={{
                color: Colors.success[400],
                margin: 5,
                fontSize: scaleFontSize(17),
              }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <ProductCard onPress={() => {}} />
        <View>
        <Text style={style.CategoryText}>Explore New Categories</Text>
        <View style={{flexDirection:'row',margin:5}}>
          <View style={style.ExCatg}>
            <Image source={require('../../assets/images/icons/ExploreCategories1.png')}></Image>
           <Text>Baby Care</Text>
           </View>
           <View style={style.ExCatg}>
            <Image source={require('../../assets/images/icons/ExploreCategories2.png')}></Image>
           <Text>Gift Store</Text>
           </View>
           <View style={style.ExCatg}>
            <Image source={require('../../assets/images/icons/ExploreCategories3.png')}></Image>
           <Text>Party Essentials</Text>
           </View>
           <View style={style.ExCatg}>
            <Image source={require('../../assets/images/icons/ExploreCategories4.png')}></Image>
           <Text>Kitchen needs</Text>
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
