import React from 'react';
import { View, Image, ScrollView, Pressable } from 'react-native';
import imageCarouselData from '../../assets/data/imageCarouselData';
import { styles } from './style';

interface Props {
  onImagePress2: () => void;
  onImagePress3: () => void;
  showItem: boolean; // New prop
}

const ImageCarousel: React.FC<Props> = ({ onImagePress2, onImagePress3, showItem }) => {
  const handleCarouselFunction = (id: number) => {
    if (id === 2) {
      onImagePress2();
    } else if (id === 3) {
      onImagePress3();
    }
  };

  const filteredData = imageCarouselData
    .map(item => ({
      ...item,
      imageSource: getImage(item.image, showItem) // Pass showItem4 to getImage
    }))
    .filter(item => item.imageSource !== null);

  return (
    <View style={styles.carouselItem}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filteredData.map(item => (
          <View key={item.id}>
            <Pressable onPress={() => handleCarouselFunction(item.id)}>
              <Image source={item.imageSource} style={styles.img} />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const getImage = (imageName: string, showItem: boolean) => { // Update function signature
  switch (imageName) {
    case 'item1':
      return require('../../assets/images/Carousel/CarouselImage1.png');
    case 'item2':
      return require('../../assets/images/Carousel/CarouselImage3.png'); // Corrected image name
    case 'item3':
      return require('../../assets/images/icons/SendListWhatsapp.png');
    case 'item4':
      return require('../../assets/images/Carousel/CarouselImage4.png');  
    case 'item5':
      if (showItem) {
        return require('../../assets/images/Carousel/CarouselImage5.png');
      } else {
        return null;
      }
    default:
      return null;
  }
};

export default ImageCarousel;
