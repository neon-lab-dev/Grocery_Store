import React from 'react';
import {View, Image, ScrollView, Pressable} from 'react-native';
import imageCarouselData from '../../assets/data/imageCarouselData';
import {styles} from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  onImagePress2: () => void;
  onImagePress3: () => void;
}

const ImageCarousel: React.FC<Props> = ({onImagePress2, onImagePress3}) => {
  const handleCarouselFunction = (id: number) => {
    if (id == 2) {
      onImagePress2();
    } else if (id == 3) {
      onImagePress3();
    }
  };

  return (
    <View style={styles.carouselItem}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {imageCarouselData.map(imageCarousel => {
          return (
            <View key={imageCarousel.id}>
              <Pressable
                onPress={() => handleCarouselFunction(imageCarousel.id)}>
                <Image
                  source={getImage(imageCarousel.image)}
                  style={styles.img}
                />
              </Pressable>
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
      return require('../../assets/images/Carousel/CarouselImage1.png');
    case 'item2':
      return require('../../assets/images/Carousel/CarouselImage2.png');
    case 'item3':
      return require('../../assets/images/icons/SendListWhatsapp.png');
    default:
      return null;
  }
};

export default ImageCarousel;
