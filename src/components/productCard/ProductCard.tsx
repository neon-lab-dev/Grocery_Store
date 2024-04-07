import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './style';
import ProductData from '../../assets/data/ProductData';
import {Colors} from '../../constants/colors';

interface ProductCardProps {
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({onPress}) => {
  return (
    <View style={styles.Container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {ProductData.map(data => {
          return (
            <View key={data.id} style={{width:140}}>
              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  backgroundColor: Colors.accent[100],
                  height: 160,
                  width: 130,
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    backgroundColor: Colors.primary[500],
                    height: 42,
                    width: 35,
                    marginLeft: 12,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}></View>
                <Image source={getImage(data.image)} style={styles.Image} />
              </TouchableOpacity>
              <Text style={styles.Title}>{data.Title}</Text>
              <Text style={styles.Quantity}>{data.Quantity}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={styles.Price}>₹{data.Price}</Text>
                  <Text style={styles.DisPrice}>₹{data.DisPrice}</Text>
                  <View style={styles.cutLine} />
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
const getImage = (imageName: string) => {
  switch (imageName) {
    case 'item1':
      return require('../../assets/images/Product-Image/Tomato.png');
    case 'item2':
      return require('../../assets/images/Product-Image/Ginger.png');
    default:
      return null;
  }
};
export default ProductCard;
