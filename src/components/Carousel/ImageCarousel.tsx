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
      imageSource: getImage(item.image, showItem)
    }))
    .filter(item => item.imageSource !== null);

  // Find the item3 and remove it from the list
  const item3Index = filteredData.findIndex(item => item.image === 'item3');
  const item3 = filteredData.splice(item3Index, 1)[0];

  // Insert item3 at the correct position based on showItem
  if (showItem) {
    filteredData.unshift(item3); // Insert at first position
  } else {
    filteredData.splice(2, 0, item3); // Insert at the third position
  }

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

const getImage = (imageName: string, showItem: boolean) => {
  switch (imageName) {
    case 'item1':
      return require('../../assets/images/Carousel/CarouselImage1.png');
    case 'item2':
      return require('../../assets/images/Carousel/CarouselImage3.png'); 
    case 'item3':
      return require('../../assets/images/Carousel/CarouselImage5.png');  
    case 'item4':
      return require('../../assets/images/icons/SendListWhatsapp.png');
    case 'item5':
      return require('../../assets/images/Carousel/CarouselImage4.png');  
    default:
      return null;
  }
};

export default ImageCarousel;
