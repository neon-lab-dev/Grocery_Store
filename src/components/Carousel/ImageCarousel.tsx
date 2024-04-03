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
                source={{ uri: imageCarousel.image }}
                style={styles.img}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};



export default ImageCarousel;
