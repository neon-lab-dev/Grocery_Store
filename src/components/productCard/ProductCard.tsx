import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
  ScrollView,
} from 'react-native';
import {styles} from './style';
import ProductData from '../../assets/data/ProductData';

interface ProductCardProps {
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  onPress,
}) => {
  return (
    <View style={styles.Container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {ProductData.map(data => {
          return (
            <View key={data.id}>
              <Image source={{uri: data.image}} style={styles.Image} />
              <Text style={styles.Title}>{data.Title}</Text>
              <Text>{data.Quantity}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={styles.Price}>₹{data.Price}</Text>
                </View>
                <TouchableOpacity style={styles.Button} onPress={onPress}>
                  <Text style={styles.ButtonText}>ADD</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ProductCard;
