import React from 'react';
import style from './style';
import {Text, View,Button, TouchableOpacity,Pressable} from 'react-native';
import ProductCard from '../../components/productCard/ProductCard';
import ImageCarousel from '../../components/Carousel/ImageCarousel';
import Header from '../../components/Header';
import { Colors } from '../../constants/colors';
import { scaleFontSize } from '../../assets/scaling';
const Home = ({navigation}) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <View style={style.container}>
      <Text> Home Screen </Text>
      <Pressable onPress={openDrawer}>
        <Text>Open Settings</Text>
      </Pressable>
      <Header />
      <ImageCarousel />
      <View style={{flexDirection:"row",justifyContent:'space-between'}}>
      <View>
      <Text style={style.CategoryText}>Freshly Picked For You!</Text>
      <Text>Freshly Picked For You!</Text>
      </View>
      <TouchableOpacity>
        <Text style={{color:Colors.success[400],margin:5,fontSize:scaleFontSize(17)}}>See all</Text>
      </TouchableOpacity>
      </View>
      <ProductCard
        onPress={() => {}}
      />
    </View>
  );
};

export default Home;
