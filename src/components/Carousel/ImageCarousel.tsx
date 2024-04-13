import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import imageCarouselData from "../../assets/data/imageCarouselData";
import { styles } from "./style";

const ImageCarousel : React.FC = () => {
  return (
    <View style={styles.carouselItem}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {imageCarouselData.map((imageCarousel) => {
          return (
            <View key={imageCarousel.id}>
              <Image
                source={getImage(imageCarousel.image)}
                style={styles.img}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const getImage = (imageName: string) => {
  switch (imageName) {
    case 'item1':
      return require('../../assets/images/Carousel/ImageCarousel1.png');
    case 'item2':
      return require('../../assets/images/Carousel/ImageCarousel2.png');
    default:
      return null;
  }
};

export default ImageCarousel;
