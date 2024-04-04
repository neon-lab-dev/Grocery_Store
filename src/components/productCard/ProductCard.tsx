import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import { styles } from './style';

interface ProductCardProps {
  image: ImageSourcePropType;
  Title: string;
  Price: number;
  onPress: () => void;
  Quantity: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, Title, Price, onPress, Quantity }) => {
  return (
    <View style={styles.Container}>
      <Image source={image} style={styles.Image} />
      <Text style={styles.Title}>{Title}</Text>
      <Text>{Quantity}</Text>
      <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
        <View>
          <Text style={styles.Price}>₹{Price}</Text>
        </View>
        <TouchableOpacity style={styles.Button} onPress={onPress}>
          <Text style={styles.ButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default ProductCard;
